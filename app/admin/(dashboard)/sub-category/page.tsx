"use client";

import { useState, useEffect } from "react";
import styles from "../dashboard.module.css";
import { Plus, Edit2, Trash2, Image as ImageIcon, Tags, Search, Filter, X } from "lucide-react";

interface Category { _id: string; name: string; }
interface SubCategory { _id: string; name: string; slug: string; image?: string; category: { name: string }; createdAt: string; }

export default function SubCategoryPage() {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", category: "", image: null as File | null, existingImage: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    if (search) setSearchTerm(search);
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [scRes, cRes] = await Promise.all([fetch("/api/admin/sub-category"), fetch("/api/admin/category")]);
    const scData = await scRes.json(); const cData = await cRes.json();
    if (scData.success) setSubCategories(scData.data);
    if (cData.success) setCategories(cData.data);
    setLoading(false);
  };

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name); data.append("slug", formData.slug); data.append("category", formData.category);
    if (editingId) data.append("id", editingId);
    if (formData.image) data.append("image", formData.image);
    
    const method = editingId ? "PUT" : "POST";
    const res = await fetch("/api/admin/sub-category", { method, body: data });
    const result = await res.json();
    if (result.success) { 
      setIsModalOpen(false); 
      setEditingId(null);
      setFormData({ name: "", slug: "", category: "", image: null, existingImage: "" }); 
      fetchAll(); 
    }
  };

  const handleEdit = (sc: SubCategory) => {
    setEditingId(sc._id);
    setFormData({ 
      name: sc.name, 
      slug: sc.slug, 
      category: (sc as any).category?._id || (sc as any).category || "", 
      image: null,
      existingImage: sc.image || ""
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: "", slug: "", category: "", image: null, existingImage: "" });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this sub-category?")) return;
    await fetch("/api/admin/sub-category", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchAll();
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Sub Categories</h1>
          <p className={styles.pageSubtitle}>Manage product sub-categories grouped by parent</p>
        </div>
        <button className={styles.btnPrimary} onClick={handleAddNew}>
          <Plus size={16} /> Add Sub Category
        </button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <span className={styles.tableTitle}>All Sub Categories <span className={styles.tableCount}>({subCategories.length})</span></span>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <div className={styles.filterSearch}>
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search sub-categories..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && <button className={styles.clearSearch} onClick={() => setSearchTerm("")}><X size={14} /></button>}
            </div>
          </div>

          <div className={styles.filterActions}>
            <div className={styles.filterSelect}>
              <Filter size={14} />
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>URL Slug</th>
              <th>Parent Category</th>
              <th>Date Added</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6}><div className={styles.emptyState}><p>Loading...</p></div></td></tr>
            ) : subCategories.length === 0 ? (
              <tr><td colSpan={6}>
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}><Tags size={26} /></div>
                  <div className={styles.emptyText}>No sub-categories found</div>
                  <div className={styles.emptySubtext}>Add sub-categories under existing parent categories</div>
                </div>
              </td></tr>
            ) : subCategories
                .filter(sc => sc.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .filter(sc => !filterCategory || (sc.category as any)?._id === filterCategory || (sc.category as any) === filterCategory)
                .map(sc => (
              <tr key={sc._id}>
                <td>
                  {sc.image ? <img src={sc.image} alt={sc.name} className={styles.thumbnail} />
                    : <div className={styles.thumbnailPlaceholder}><ImageIcon size={18} /></div>}
                </td>
                <td style={{ fontWeight: 600, color: "#111827" }}>{sc.name}</td>
                <td><span className={`${styles.badge} ${styles.badgeSecondary}`}>{sc.slug}</span></td>
                <td><span className={`${styles.badge} ${styles.badgePrimary}`}>{sc.category?.name}</span></td>
                <td style={{ color: "#9ca3af", fontSize: "0.83rem" }}>{new Date(sc.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                <td style={{ textAlign: "right" }}>
                  <span style={{ display: "inline-flex", gap: "8px" }}>
                    <button className={styles.btnEdit} onClick={() => handleEdit(sc)}><Edit2 size={14} /></button>
                    <button className={styles.btnDanger} onClick={() => handleDelete(sc._id)}><Trash2 size={14} /></button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>{editingId ? "Edit Sub Category" : "Add Sub Category"}</span>
              <button className={styles.modalClose} onClick={() => { setIsModalOpen(false); setEditingId(null); }}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Name</label>
                  <input className={styles.formInput} placeholder="e.g. IP Cameras" value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>URL Slug</label>
                  <input className={styles.formInput} value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Parent Category</label>
                  <select className={styles.formInput} value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })} required>
                    <option value="">Select a category...</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Image (Optional)</label>
                  {formData.existingImage && !formData.image && (
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Current Image:</p>
                      <img src={formData.existingImage} alt="Current" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }} />
                    </div>
                  )}
                  <input type="file" accept="image/*" className={styles.formInput}
                    onChange={e => setFormData({ ...formData, image: e.target.files?.[0] || null })} />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.btnSecondary} onClick={() => { setIsModalOpen(false); setEditingId(null); }}>Cancel</button>
                <button type="submit" className={styles.btnPrimary}>{editingId ? "Update Sub Category" : "Save Sub Category"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
