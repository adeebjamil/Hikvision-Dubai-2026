"use client";

import { useState, useEffect } from "react";
import styles from "../dashboard.module.css";
import { Trash2, Mail, Phone, MessageSquare, Search, Filter, X, CheckCircle, RotateCcw, Monitor } from "lucide-react";

interface Message { _id: string; name: string; email: string; phone?: string; service?: string; message: string; isRead: boolean; isResolved: boolean; createdAt: string; }

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, unread

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    const res = await fetch("/api/admin/contact");
    const data = await res.json();
    if (data.success) setMessages(data.data);
    setLoading(false);
  };

  const updateStatus = async (id: string, updates: Partial<Message>) => {
    await fetch("/api/admin/contact", { 
      method: "PATCH", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ id, ...updates }) 
    });
    fetchMessages();
    if (selected?._id === id) {
      setSelected(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const markRead = (id: string) => updateStatus(id, { isRead: true });
  const toggleResolved = (id: string, current: boolean) => updateStatus(id, { isResolved: !current });
  const markUnread = (id: string) => updateStatus(id, { isRead: false });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch("/api/admin/contact", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setSelected(null); fetchMessages();
  };

  const unread = messages.filter(m => !m.isRead).length;

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Contact Messages</h1>
          <p className={styles.pageSubtitle}>{unread > 0 ? `${unread} unread message${unread > 1 ? "s" : ""}` : "All messages reviewed"}</p>
        </div>
      </div>

      <div className={styles.inboxLayout}>
        <div className={styles.inboxList}>
          <div style={{ borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
            <div style={{ padding: "16px 18px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Inbox ({messages.length})
              </span>
              <div className={styles.filterSelect} style={{ scale: "0.85", transformOrigin: "right" }}>
                <Filter size={14} />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">All Messages</option>
                  <option value="unread">Unread</option>
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
            : messages.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}><MessageSquare size={26} /></div>
                <div className={styles.emptyText}>No messages yet</div>
              </div>
            ) : messages
                .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.email.toLowerCase().includes(searchTerm.toLowerCase()) || m.message.toLowerCase().includes(searchTerm.toLowerCase()))
                .filter(m => {
                  if (statusFilter === "all") return true;
                  if (statusFilter === "unread") return !m.isRead;
                  if (statusFilter === "resolved") return m.isResolved;
                  return true;
                })
                .map(m => (
            <div key={m._id}
              className={`${styles.inboxItem} ${selected?._id === m._id ? styles.inboxItemActive : ""}`}
              onClick={() => { setSelected(m); if (!m.isRead) markRead(m._id); }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {!m.isRead && <div className={styles.unreadDot} />}
                  <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "#111827", display: "flex", alignItems: "center", gap: "6px" }}>
                    {m.name}
                    {m.isResolved && <CheckCircle size={12} color="#059669" />}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                  <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{new Date(m.createdAt).toLocaleDateString("en-GB")}</span>
                  {m.isResolved && <span style={{ fontSize: "0.55rem", color: "#059669", fontWeight: 800, backgroundColor: "#ecfdf5", padding: "1px 4px", borderRadius: "4px", textTransform: "uppercase" }}>Resolved</span>}
                </div>
              </div>
              <p style={{ margin: "6px 0 0", fontSize: "0.8rem", color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.message}</p>
            </div>
          ))}
        </div>

        {selected ? (
          <div className={styles.inboxDetail}>
            <div style={{ padding: "18px 22px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, color: "#111827", fontSize: "0.95rem" }}>Message Details</span>
              <button onClick={() => setSelected(null)} className={styles.modalClose}>×</button>
            </div>
            <div style={{ padding: "22px" }}>
              <div style={{ background: "#fafafa", borderRadius: 12, padding: "16px", marginBottom: 16 }}>
                <div style={{ fontWeight: 700, color: "#111827", marginBottom: 10, fontSize: "1rem", display: "flex", justifyContent: "space-between" }}>
                  {selected.name}
                  {selected.isResolved && <span style={{ fontSize: "0.65rem", color: "#059669", backgroundColor: "#ecfdf5", padding: "4px 8px", borderRadius: "6px", textTransform: "uppercase" }}>Resolved</span>}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#374151", fontSize: "0.875rem" }}><Mail size={14} color="#7C0A02" />{selected.email}</div>
                  {selected.phone && <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#374151", fontSize: "0.875rem" }}><Phone size={14} color="#7C0A02" />{selected.phone}</div>}
                  {selected.service && <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#374151", fontSize: "0.875rem" }}><Monitor size={14} color="#7C0A02" />{selected.service}</div>}
                </div>
              </div>
              <div style={{ background: "#fafafa", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Message</div>
                <p style={{ color: "#374151", lineHeight: 1.7, fontSize: "0.9rem", margin: 0 }}>{selected.message}</p>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href={`mailto:${selected.email}`} className={styles.btnPrimary} style={{ flex: "2 1 200px", textDecoration: "none", justifyContent: "center" }}>
                  <Mail size={15} /> Reply via Email
                </a>
                <button 
                  className={styles.btnSuccess} 
                  style={{ 
                    flex: "1 1 120px", 
                    backgroundColor: selected.isResolved ? "#f3f4f6" : "#ecfdf5", 
                    color: selected.isResolved ? "#6b7280" : "#059669",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    cursor: "pointer"
                  }} 
                  onClick={() => toggleResolved(selected._id, selected.isResolved)}
                >
                  {selected.isResolved ? <RotateCcw size={15} /> : <CheckCircle size={15} />}
                  {selected.isResolved ? "Reopen" : "Resolve"}
                </button>
                <button 
                  style={{ 
                    padding: "10px", 
                    backgroundColor: "#fef2f2", 
                    color: "#7C0A02", 
                    border: "none", 
                    borderRadius: "8px", 
                    cursor: "pointer" 
                  }} 
                  title="Mark as Unread"
                  onClick={() => markUnread(selected._id)}
                >
                  <Mail size={15} />
                </button>
                <button className={styles.btnDanger} onClick={() => handleDelete(selected._id)} style={{ padding: "10px 16px" }}><Trash2 size={15} /></button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.inboxDetail}>
            <div className={styles.emptyState} style={{ paddingTop: 80 }}>
              <div className={styles.emptyIcon}><MessageSquare size={26} /></div>
              <div className={styles.emptyText}>Select a message</div>
              <div className={styles.emptySubtext}>Click on an item to view the full message</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
