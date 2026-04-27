"use client";

import { useState, useEffect } from "react";
import styles from "../dashboard.module.css";
import { Trash2, Mail, Phone, Package, HelpCircle, Search, Filter, X, CheckCircle2 } from "lucide-react";

interface Enquiry { 
  _id: string; 
  name: string; 
  email: string; 
  phone?: string; 
  message: string; 
  status: 'unread' | 'read' | 'resolved'; 
  productId?: { name: string }; 
  createdAt: string; 
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); 

  useEffect(() => { fetchEnquiries(); }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/product-enquiries");
    const data = await res.json();
    if (data.success) setEnquiries(data.data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: 'read' | 'resolved') => {
    try {
      const res = await fetch("/api/admin/product-enquiries", { 
        method: "PATCH", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ id, status }) 
      });
      
      const data = await res.json();
      if (data.success) {
        // Refresh the list
        fetchEnquiries();
        
        // Update the selected item view immediately
        if (selected?._id === id) {
          setSelected(prev => prev ? { ...prev, status } : null);
        }
      } else {
        alert("Failed to update status: " + data.message);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Network error while updating status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    await fetch("/api/admin/product-enquiries", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setSelected(null); fetchEnquiries();
  };

  const unreadCount = enquiries.filter(e => e.status === 'unread').length;

  const filteredEnquiries = enquiries
    .filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.email.toLowerCase().includes(searchTerm.toLowerCase()) || e.message.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(e => statusFilter === "all" || e.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'unread': return '#7C0A02';
      case 'read': return '#10b981'; // Changed to green
      case 'resolved': return '#22c55e';
      default: return '#6b7280';
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Product Enquiries</h1>
          <p className={styles.pageSubtitle}>{unreadCount > 0 ? `${unreadCount} unread enquir${unreadCount > 1 ? "ies" : "y"}` : "All enquiries reviewed"}</p>
        </div>
      </div>

      <div className={styles.inboxLayout}>
        <div className={styles.inboxList}>
          <div style={{ borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
            <div style={{ padding: "16px 18px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Inbox ({enquiries.length})
              </span>
              <div className={styles.filterSelect} style={{ scale: "0.85", transformOrigin: "right" }}>
                <Filter size={14} />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">All Enquiries</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
            <div style={{ padding: "10px 14px" }}>
              <div className={styles.filterSearch}>
                <Search size={14} />
                <input 
                  type="text" 
                  placeholder="Filter by name, email..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: "0.83rem", padding: "8px 30px 8px 34px" }}
                />
                {searchTerm && <button className={styles.clearSearch} onClick={() => setSearchTerm("")}><X size={12} /></button>}
              </div>
            </div>
          </div>
          {loading ? <div className={styles.emptyState}><p>Loading...</p></div>
            : filteredEnquiries.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}><HelpCircle size={26} /></div>
                <div className={styles.emptyText}>No enquiries found</div>
              </div>
            ) : filteredEnquiries.map(e => (
            <div key={e._id}
              className={`${styles.inboxItem} ${selected?._id === e._id ? styles.inboxItemActive : ""}`}
              style={{ backgroundColor: e.status === 'unread' && selected?._id !== e._id ? "#fffbfb" : undefined }}
              onClick={() => { 
                setSelected(e); 
                if (e.status === 'unread') updateStatus(e._id, 'read'); 
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {e.status === 'unread' && <div className={styles.unreadDot} />}
                  <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "#111827" }}>{e.name}</span>
                  {e.status === 'resolved' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#22c55e' }}>
                      <CheckCircle2 size={14} />
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' }}>Resolved</span>
                    </div>
                  )}
                </div>
                <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{new Date(e.createdAt).toLocaleDateString("en-GB")}</span>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center" }}>
                {e.productId && <div style={{ fontSize: "0.75rem", color: "#7C0A02", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><Package size={11} />{e.productId.name}</div>}
                {e.status !== 'resolved' && (
                  <div style={{ fontSize: "0.65rem", padding: "2px 6px", borderRadius: "4px", background: getStatusColor(e.status), color: "#fff", textTransform: "uppercase", fontWeight: 800 }}>{e.status}</div>
                )}
              </div>
              <p style={{ margin: "6px 0 0", fontSize: "0.8rem", color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.message}</p>
            </div>
          ))}
        </div>

        {selected ? (
          <div className={styles.inboxDetail}>
            <div style={{ padding: "18px 22px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontWeight: 700, color: "#111827", fontSize: "0.95rem" }}>Enquiry Details</span>
                <div style={{ fontSize: "0.7rem", padding: "4px 10px", borderRadius: "100px", background: getStatusColor(selected.status), color: "#fff", textTransform: "uppercase", fontWeight: 800 }}>{selected.status}</div>
              </div>
              <button onClick={() => setSelected(null)} className={styles.modalClose}>×</button>
            </div>
            <div style={{ padding: "22px" }}>
              <div style={{ background: "#fafafa", borderRadius: 12, padding: "16px", marginBottom: 16 }}>
                <div style={{ fontWeight: 700, color: "#111827", marginBottom: 10, fontSize: "1rem" }}>{selected.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#374151", fontSize: "0.875rem", marginBottom: 6 }}><Mail size={14} color="#7C0A02" />{selected.email}</div>
                {selected.phone && <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#374151", fontSize: "0.875rem" }}><Phone size={14} color="#7C0A02" />{selected.phone}</div>}
              </div>
              {selected.productId && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8, color: "#7C0A02", fontWeight: 600, fontSize: "0.875rem" }}>
                  <Package size={15} /> {selected.productId.name}
                </div>
              )}
              <div style={{ background: "#fafafa", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Message</div>
                <p style={{ color: "#374151", lineHeight: 1.7, fontSize: "0.9rem", margin: 0 }}>{selected.message}</p>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href={`mailto:${selected.email}`} className={styles.btnPrimary} style={{ flex: 1, textDecoration: "none", justifyContent: "center" }}>
                  <Mail size={15} /> Reply via Email
                </a>
                {selected.status !== 'resolved' && (
                  <button className={styles.btnSecondary} onClick={() => updateStatus(selected._id, 'resolved')} style={{ background: "#22c55e", color: "#fff", border: "none" }}>
                    Mark Resolved
                  </button>
                )}
                <button className={styles.btnDanger} onClick={() => handleDelete(selected._id)} style={{ padding: "10px 16px" }}><Trash2 size={15} /></button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.inboxDetail}>
            <div className={styles.emptyState} style={{ paddingTop: 80 }}>
              <div className={styles.emptyIcon}><HelpCircle size={26} /></div>
              <div className={styles.emptyText}>Select an enquiry</div>
              <div className={styles.emptySubtext}>Click on an item from the list to view details</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
