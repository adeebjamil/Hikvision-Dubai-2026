"use client";

import { useState, useEffect } from "react";
import styles from "../dashboard.module.css";
import { Server, Activity, Database, HardDrive } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("system");
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    setLoadingStatus(true);
    try {
      const res = await fetch("/api/admin/system-status");
      const data = await res.json();
      if (data.success) setSystemStatus(data.status);
    } catch (err) {
      console.error("Failed to fetch status", err);
    } finally {
      setLoadingStatus(false);
    }
  };

  const tabs = [
    { key: "system", label: "System Status", icon: <Server size={15} /> },
  ];

  const formatSize = (bytes: number) => {
    if (!bytes) return "0 KB";
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>System Status</h1>
          <p className={styles.pageSubtitle}>Monitor infrastructure health and database storage</p>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #f3f4f6" }}>
          <div className={styles.tabBar}>
            {tabs.map(t => (
              <button key={t.key} className={`${styles.tab} ${activeTab === t.key ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(t.key)}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>{t.icon}{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: "32px", maxWidth: 560 }}>
          <div>
            <h3 style={{ fontWeight: 700, color: "#111827", marginBottom: 24, fontSize: "1.05rem" }}>System Health & Storage</h3>
            
            <div style={{ display: "grid", gap: "16px", marginBottom: "32px" }}>
              <div style={{ padding: "20px", background: "#f9fafb", borderRadius: "12px", border: "1px solid #f1f3f7", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Activity size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: "2px" }}>System Status</div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: systemStatus?.system === "Online" ? "#059669" : "#7C0A02" }}>
                    {loadingStatus ? "Checking..." : systemStatus?.system || "Unknown"}
                  </div>
                </div>
              </div>

              <div style={{ padding: "20px", background: "#f9fafb", borderRadius: "12px", border: "1px solid #f1f3f7", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Database size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: "2px" }}>Database Connection</div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: systemStatus?.database === "Connected" ? "#059669" : "#7C0A02" }}>
                    {loadingStatus ? "Connecting..." : systemStatus?.database || "Offline"}
                  </div>
                </div>
              </div>

              <div style={{ padding: "20px", background: "#f9fafb", borderRadius: "12px", border: "1px solid #f1f3f7", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#fef2f2", color: "#7C0A02", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <HardDrive size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: "2px" }}>Database Storage</div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#111827" }}>
                    {loadingStatus ? "Calculating..." : formatSize(systemStatus?.storage)}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: "16px", background: "#fef9f9", border: "1px solid #fecaca", borderRadius: "10px", color: "#6B0000", fontSize: "0.82rem" }}>
              <strong>Note:</strong> Storage reflects the total size of data and indexes currently stored in your MongoDB Atlas cluster.
            </div>
            
            <button 
              onClick={fetchStatus} 
              disabled={loadingStatus}
              className={styles.btnSecondary} 
              style={{ marginTop: "24px", width: "100%", justifyContent: "center" }}
            >
              {loadingStatus ? "Refreshing..." : "Refresh Status"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
