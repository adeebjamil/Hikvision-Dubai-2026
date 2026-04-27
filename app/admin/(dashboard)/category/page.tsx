"use client";

import { useState, useEffect } from "react";
import styles from "../dashboard.module.css";
import { Plus, Edit2, Trash2, Image as ImageIcon, FolderTree, Search, X } from "lucide-react";

interface Category { _id: string; name: string; slug: string; image?: string; createdAt: string; }

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", image: null as File | null, existingImage: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    if (search) setSearchTerm(search);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/category");
    const data = await res.json();
    if (data.success) setCategories(data.data);
    setLoading(false);
  };

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    if (editingId) data.append("id", editingId);
    if (formData.image) data.append("image", formData.image);
    
    const method = editingId ? "PUT" : "POST";
    const res = await fetch("/api/admin/category", { method, body: data });
    const result = await res.json();
    if (result.success) { 
      setIsModalOpen(false); 
      setEditingId(null);
      setFormData({ name: "", slug: "", image: null, existingImage: "" }); 
      fetchCategories(); 
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat._id);
    setFormData({ name: cat.name, slug: cat.slug, image: null, existingImage: cat.image || "" });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: "", slug: "", image: null, existingImage: "" });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await fetch("/api/admin/category", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchCategories();
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Categories</h1>
          <p className={styles.pageSubtitle}>Manage top-level product categories</p>
        </div>
        <button className={styles.btnPrimary} onClick={handleAddNew}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <span className={styles.tableTitle}>
            All Categories <span className={styles.tableCount}>({categories.length})</span>
          </span>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.filterSearch} style={{ maxWidth: 400 }}>
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <button className={styles.clearSearch} onClick={() => setSearchTerm("")}><X size={14} /></button>}
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Category Name</th>
              <th>URL Slug</th>
              <th>Date Added</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5}><div className={styles.emptyState}><p>Loading...</p></div></td></tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}><FolderTree size={26} /></div>
                    <div className={styles.emptyText}>No categories found</div>
                    <div className={styles.emptySubtext}>Add your first category to get started</div>
                  </div>
                </td>
              </tr>
            ) : categories
                .filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(cat => (
              <tr key={cat._id}>
                <td>
                  {cat.image
                    ? <img src={cat.image} alt={cat.name} className={styles.thumbnail} />
                    : <div className={styles.thumbnailPlaceholder}><ImageIcon size={18} /></div>}
                </td>
                <td style={{ fontWeight: 600, color: "#111827" }}>{cat.name}</td>
                <td><span className={`${styles.badge} ${styles.badgeSecondary}`}>{cat.slug}</span></td>
                <td style={{ color: "#9ca3af", fontSize: "0.83rem" }}>{new Date(cat.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                <td style={{ textAlign: "right" }}>
                  <span style={{ display: "inline-flex", gap: "8px" }}>
                    <button className={styles.btnEdit} onClick={() => handleEdit(cat)}><Edit2 size={14} /></button>
                    <button className={styles.btnDanger} onClick={() => handleDelete(cat._id)}><Trash2 size={14} /></button>
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
              <span className={styles.modalTitle}>{editingId ? "Edit Category" : "Add New Category"}</span>
              <button className={styles.modalClose} onClick={() => { setIsModalOpen(false); setEditingId(null); }}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Category Name</label>
                  <input className={styles.formInput} placeholder="e.g. CCTV Cameras" value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>URL Slug</label>
                  <input className={styles.formInput} placeholder="e.g. cctv-cameras" value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })} required />
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
                <button type="submit" className={styles.btnPrimary}>{editingId ? "Update Category" : "Save Category"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
