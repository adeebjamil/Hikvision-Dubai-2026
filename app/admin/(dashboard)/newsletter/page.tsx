"use client";

import { useState, useEffect } from "react";
import styles from "../dashboard.module.css";
import { Trash2, Users, Mail, Search, Filter, X, CheckCircle, Eye } from "lucide-react";

interface Subscriber { _id: string; email: string; isActive: boolean; isRead: boolean; createdAt: string; }

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => { fetchSubscribers(); }, []);

  const fetchSubscribers = async () => {
    const res = await fetch("/api/admin/newsletter");
    const data = await res.json();
    if (data.success) setSubscribers(data.data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this subscriber?")) return;
    await fetch("/api/admin/newsletter", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchSubscribers();
  };

  const handleUpdate = async (id: string, updates: Partial<Subscriber>) => {
    await fetch("/api/admin/newsletter", { 
      method: "PATCH", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ id, ...updates }) 
    });
    fetchSubscribers();
  };

  const active = subscribers.filter(s => s.isActive).length;

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Newsletter Subscribers</h1>
          <p className={styles.pageSubtitle}>Manage your email subscriber list</p>
        </div>
      </div>

      <div className={styles.statGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)", maxWidth: 480, marginBottom: 24 }}>
        {[
          { label: "Total Subscribers", value: subscribers.length, icon: <Users size={20} />, color: "#7C0A02", bg: "#fef2f2" },
          { label: "Active Subscribers", value: active, icon: <Mail size={20} />, color: "#059669", bg: "#ecfdf5" },
        ].map((s, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: s.bg, color: s.color }}>{s.icon}</div>
            <div>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statValue}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <span className={styles.tableTitle}>All Subscribers <span className={styles.tableCount}>({subscribers.length})</span></span>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <div className={styles.filterSearch}>
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search emails..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && <button className={styles.clearSearch} onClick={() => setSearchTerm("")}><X size={14} /></button>}
            </div>
          </div>

          <div className={styles.filterActions}>
            <div className={styles.filterSelect}>
              <Filter size={14} />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Email Address</th>
              <th>Status</th>
              <th>Subscribed On</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5}><div className={styles.emptyState}><p>Loading...</p></div></td></tr>
            ) : subscribers.length === 0 ? (
              <tr><td colSpan={5}>
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}><Mail size={26} /></div>
                  <div className={styles.emptyText}>No subscribers yet</div>
                  <div className={styles.emptySubtext}>Subscribers from the frontend form will appear here</div>
                </div>
              </td></tr>
            ) : subscribers
                .filter(s => s.email.toLowerCase().includes(searchTerm.toLowerCase()))
                .filter(s => statusFilter === "all" || (statusFilter === "active" ? s.isActive : !s.isActive))
                .map((s, i) => (
              <tr key={s._id}>
                <td style={{ color: "#9ca3af", fontWeight: 500, width: 50 }}>{i + 1}</td>
                <td style={{ fontWeight: s.isRead ? 500 : 700, color: s.isRead ? "#4b5563" : "#111827" }}>
                  {s.email}
                  {!s.isRead && <span style={{ marginLeft: "8px", fontSize: "0.65rem", backgroundColor: "#7C0A02", color: "#fff", padding: "2px 6px", borderRadius: "4px", textTransform: "uppercase" }}>New</span>}
                </td>
                <td>
                  <span className={`${styles.badge} ${s.isActive ? styles.badgeSuccess : styles.badgeDanger}`}>
                    {s.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ color: "#9ca3af", fontSize: "0.83rem" }}>{new Date(s.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                    {!s.isRead && (
                      <button 
                        className={styles.btnSuccess} 
                        style={{ padding: "6px", backgroundColor: "#ecfdf5", color: "#059669", border: "none", borderRadius: "6px", cursor: "pointer" }}
                        title="Mark as Read"
                        onClick={() => handleUpdate(s._id, { isRead: true })}
                      >
                        <CheckCircle size={14} />
                      </button>
                    )}
                    <button 
                      className={styles.btnWarning} 
                      style={{ padding: "6px", backgroundColor: s.isActive ? "#fffbeb" : "#fef2f2", color: s.isActive ? "#d97706" : "#7C0A02", border: "none", borderRadius: "6px", cursor: "pointer" }}
                      title={s.isActive ? "Deactivate" : "Activate"}
                      onClick={() => handleUpdate(s._id, { isActive: !s.isActive })}
                    >
                      <Eye size={14} />
                    </button>
                    <button className={styles.btnDanger} onClick={() => handleDelete(s._id)}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
