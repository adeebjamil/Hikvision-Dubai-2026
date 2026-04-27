"use client";

import { useState, useEffect } from "react";
import styles from "../dashboard.module.css";
import { Plus, Edit2, Trash2, Star, Image as ImageIcon, ShoppingBag, Search, Filter, X } from "lucide-react";

interface Category { _id: string; name: string; }
interface SubCategory { _id: string; name: string; }
interface Product { _id: string; name: string; slug: string; subTitle?: string; images: string[]; category: { name: string }; subCategory: { name: string }; features?: string[]; keyFeatures?: string[]; isFeatured: boolean; createdAt: string; }

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", subTitle: "", description: "", category: "", subCategory: "", isFeatured: false, features: "", keyFeatures: "", images: [] as File[], existingImages: [] as string[] });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubCategory, setFilterSubCategory] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    if (search) setSearchTerm(search);
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [pRes, cRes, scRes] = await Promise.all([fetch("/api/admin/products"), fetch("/api/admin/category"), fetch("/api/admin/sub-category")]);
    const pData = await pRes.json(); const cData = await cRes.json(); const scData = await scRes.json();
    if (pData.success) setProducts(pData.data);
    if (cData.success) setCategories(cData.data);
    if (scData.success) setSubCategories(scData.data);
    setLoading(false);
  };

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name); data.append("slug", formData.slug);
    data.append("description", formData.description); data.append("category", formData.category);
    data.append("subCategory", formData.subCategory); data.append("subTitle", formData.subTitle);
    data.append("features", formData.features);
    data.append("keyFeatures", formData.keyFeatures);
    data.append("isFeatured", String(formData.isFeatured));
    if (editingId) data.append("id", editingId);
    formData.images.forEach(img => data.append("images", img));
    
    const method = editingId ? "PUT" : "POST";
    const res = await fetch("/api/admin/products", { method, body: data });
    const result = await res.json();
    if (result.success) { 
      setIsModalOpen(false); 
      setEditingId(null);
      setFormData({ name: "", slug: "", subTitle: "", description: "", category: "", subCategory: "", isFeatured: false, features: "", keyFeatures: "", images: [], existingImages: [] });
      fetchAll(); 
    }
  };

  const handleEdit = (p: Product) => {
    setEditingId(p._id);
    setFormData({ 
      name: p.name, 
      slug: p.slug, 
      description: (p as any).description || "", 
      category: (p as any).category?._id || (p as any).category || "", 
      subCategory: (p as any).subCategory?._id || (p as any).subCategory || "", 
      subTitle: p.subTitle || "",
      features: p.features?.join("\n") || "",
      keyFeatures: p.keyFeatures?.join("\n") || "",
      isFeatured: p.isFeatured, 
      images: [],
      existingImages: p.images || []
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: "", slug: "", subTitle: "", description: "", category: "", subCategory: "", isFeatured: false, features: "", keyFeatures: "", images: [], existingImages: [] });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch("/api/admin/products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchAll();
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Products</h1>
          <p className={styles.pageSubtitle}>Manage your complete product catalogue</p>
        </div>
        <button className={styles.btnPrimary} onClick={handleAddNew}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <span className={styles.tableTitle}>All Products <span className={styles.tableCount}>({products.length})</span></span>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <div className={styles.filterSearch}>
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && <button className={styles.clearSearch} onClick={() => setSearchTerm("")}><X size={14} /></button>}
            </div>
          </div>

          <div className={styles.filterActions}>
            <div className={styles.filterSelect}>
              <Filter size={14} />
              <select value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setFilterSubCategory(""); }}>
                <option value="">All Categories</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>

            <div className={styles.filterSelect}>
              <Filter size={14} />
              <select value={filterSubCategory} onChange={(e) => setFilterSubCategory(e.target.value)} disabled={!filterCategory}>
                <option value="">All Sub Categories</option>
                {subCategories
                  .filter(sc => (sc as any).category?._id === filterCategory || (sc as any).category === filterCategory)
                  .map(sc => <option key={sc._id} value={sc._id}>{sc.name}</option>)}
              </select>
            </div>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Featured</th>
              <th>Date Added</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7}><div className={styles.emptyState}><p>Loading...</p></div></td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={7}>
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}><ShoppingBag size={26} /></div>
                  <div className={styles.emptyText}>No products found</div>
                  <div className={styles.emptySubtext}>Add your first product to the catalogue</div>
                </div>
              </td></tr>
            ) : products
                .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .filter(p => !filterCategory || (p.category as any)?._id === filterCategory || (p.category as any) === filterCategory)
                .filter(p => !filterSubCategory || (p.subCategory as any)?._id === filterSubCategory || (p.subCategory as any) === filterSubCategory)
                .map(p => (
              <tr key={p._id}>
                <td>
                  {p.images?.[0] ? <img src={p.images[0]} alt={p.name} className={styles.thumbnail} />
                    : <div className={styles.thumbnailPlaceholder}><ImageIcon size={18} /></div>}
                </td>
                <td style={{ fontWeight: 600, color: "#111827", maxWidth: 220 }}>{p.name}</td>
                <td><span className={`${styles.badge} ${styles.badgePrimary}`}>{p.category?.name}</span></td>
                <td><span className={`${styles.badge} ${styles.badgeSecondary}`}>{p.subCategory?.name}</span></td>
                <td>{p.isFeatured ? <Star size={17} fill="#f59e0b" color="#f59e0b" /> : <Star size={17} color="#e5e7eb" />}</td>
                <td style={{ color: "#9ca3af", fontSize: "0.83rem" }}>{new Date(p.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                <td style={{ textAlign: "right" }}>
                  <span style={{ display: "inline-flex", gap: "8px" }}>
                    <button className={styles.btnEdit} onClick={() => handleEdit(p)}><Edit2 size={14} /></button>
                    <button className={styles.btnDanger} onClick={() => handleDelete(p._id)}><Trash2 size={14} /></button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal} style={{ maxWidth: 580 }}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>{editingId ? "Edit Product" : "Add New Product"}</span>
              <button className={styles.modalClose} onClick={() => { setIsModalOpen(false); setEditingId(null); }}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Product Name</label>
                    <input className={styles.formInput} placeholder="e.g. Hikvision DS-2CD..." value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>URL Slug</label>
                    <input className={styles.formInput} value={formData.slug}
                      onChange={e => setFormData({ ...formData, slug: e.target.value })} required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Sub Title (Short Tagline)</label>
                  <input className={styles.formInput} placeholder="e.g. 2 MP Fixed Bullet Network Camera" value={formData.subTitle}
                    onChange={e => setFormData({ ...formData, subTitle: e.target.value })} />
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Category</label>
                    <select className={styles.formInput} value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })} required>
                      <option value="">Select...</option>
                      {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Sub Category</label>
                    <select className={styles.formInput} value={formData.subCategory}
                      onChange={e => setFormData({ ...formData, subCategory: e.target.value })} required>
                      <option value="">Select...</option>
                      {subCategories
                        .filter(sc => (sc as any).category?._id === formData.category || (sc as any).category === formData.category)
                        .map(sc => <option key={sc._id} value={sc._id}>{sc.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Description</label>
                  <textarea className={styles.formInput} rows={3} placeholder="Describe the product..." value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })} required style={{ resize: "vertical" }} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Technical Features (One per line)</label>
                  <textarea className={styles.formInput} rows={4} placeholder="High quality imaging...&#10;IP67-rated water and dust resistance..." value={formData.features}
                    onChange={e => setFormData({ ...formData, features: e.target.value })} style={{ resize: "vertical" }} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Key Highlights (One per line)</label>
                  <textarea className={styles.formInput} rows={3} placeholder="2 MP HD...&#10;Smart Hybrid Light..." value={formData.keyFeatures}
                    onChange={e => setFormData({ ...formData, keyFeatures: e.target.value })} style={{ resize: "vertical" }} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Product Images</label>
                  {formData.existingImages.length > 0 && formData.images.length === 0 && (
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Current Images:</p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {formData.existingImages.map((img, i) => (
                          <img key={i} src={img} alt={`Current ${i}`} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }} />
                        ))}
                      </div>
                    </div>
                  )}
                  <input type="file" accept="image/*" multiple className={styles.formInput}
                    onChange={e => setFormData({ ...formData, images: Array.from(e.target.files || []) })} />
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "12px", backgroundColor: "#fef9f9", borderRadius: "10px", border: "1px solid #fecaca" }}>
                  <input type="checkbox" checked={formData.isFeatured}
                    onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })} />
                  <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#374151" }}>Mark as Featured Product</span>
                  <Star size={15} fill={formData.isFeatured ? "#f59e0b" : "none"} color="#f59e0b" />
                </label>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.btnSecondary} onClick={() => { setIsModalOpen(false); setEditingId(null); }}>Cancel</button>
                <button type="submit" className={styles.btnPrimary}>{editingId ? "Update Product" : "Save Product"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
