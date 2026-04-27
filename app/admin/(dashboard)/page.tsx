"use client";

import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { ShoppingBag, FolderTree, MessageSquare, Users, Clock } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';

export default function DashboardOverview() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const json = await res.json();
      if (json.success) setData(json);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { title: "Total Products", value: data?.stats?.totalProducts || "0", icon: <ShoppingBag size={22} />, color: "#7C0A02", bg: "#fef2f2" },
    { title: "Categories", value: data?.stats?.totalCategories || "0", icon: <FolderTree size={22} />, color: "#374151", bg: "#f3f4f6" },
    { title: "Sub Categories", value: data?.stats?.totalSubCategories || "0", icon: <FolderTree size={22} />, color: "#2563eb", bg: "#eff6ff" },
    { title: "Enquiries", value: data?.stats?.totalProductEnquiries || "0", icon: <MessageSquare size={22} />, color: "#059669", bg: "#ecfdf5" },
    { title: "Messages", value: data?.stats?.totalContacts || "0", icon: <MessageSquare size={22} />, color: "#7C0A02", bg: "#fff1f1" },
    { title: "Subscribers", value: data?.stats?.totalSubscribers || "0", icon: <Users size={22} />, color: "#d97706", bg: "#fffbeb" },
  ];

  const activity = data?.recentActivity || [
    { text: "Dashboard loaded", time: "Just now", type: "auth" },
  ];

  const typeColor: Record<string, string> = {
    enquiry: "#7C0A02", product: "#2563eb", newsletter: "#059669", auth: "#d97706"
  };

  if (loading) return <div className={styles.emptyState}>Loading dashboard data...</div>;

  return (
    <div>
      <div className={styles.statGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: stat.bg, color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <div className={styles.statLabel}>{stat.title}</div>
              <div className={styles.statValue}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "20px", marginBottom: "20px" }}>
        {/* Analytics Chart */}
        <div className={styles.tableCard} style={{ padding: "20px" }}>
          <div className={styles.tableHeader} style={{ padding: "0 0 20px 0" }}>
            <span className={styles.tableTitle}>Business Growth & Enquiries</span>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={data?.chartData || []}>
                <defs>
                  <linearGradient id="colorEnq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C0A02" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#7C0A02" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="enquiries" stroke="#7C0A02" strokeWidth={3} fillOpacity={1} fill="url(#colorEnq)" />
                <Area type="monotone" dataKey="products" stroke="#111827" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span className={styles.tableTitle}>Recent Activity</span>
          </div>
          <div style={{ padding: "8px 0" }}>
            {activity.map((a: any, i: number) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "14px 22px", borderBottom: i < activity.length - 1 ? "1px solid #f9fafb" : "none" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: typeColor[a.type] || "#ccc", marginTop: 6, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.875rem", color: "#374151", margin: 0, lineHeight: 1.5 }}>{a.text}</p>
                  <span style={{ fontSize: "0.75rem", color: "#9ca3af", display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                    <Clock size={11} /> {a.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Bar Comparison */}
        <div className={styles.tableCard} style={{ padding: "20px" }}>
           <div className={styles.tableHeader} style={{ padding: "0 0 20px 0" }}>
            <span className={styles.tableTitle}>Monthly Engagement</span>
          </div>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={data?.chartData || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="enquiries" fill="#7C0A02" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats Progress */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span className={styles.tableTitle}>System Performance</span>
          </div>
          <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: "22px" }}>
            {[
              { label: "Product Listing Growth", value: `${data?.stats?.totalProducts || 0}`, percent: Math.min(100, ((data?.stats?.totalProducts || 0) / 50) * 100) },
              { label: "Response Rate", value: "94%", percent: 94 },
              { label: "Subscriber Conversion", value: `${data?.stats?.totalSubscribers || 0}`, percent: 85 },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.85rem", color: "#374151", fontWeight: 600 }}>{s.label}</span>
                  <span style={{ fontSize: "0.85rem", color: "#7C0A02", fontWeight: 700 }}>{s.value}</span>
                </div>
                <div style={{ height: 8, backgroundColor: "#f3f4f6", borderRadius: "99px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${s.percent}%`, background: "linear-gradient(90deg, #7C0A02, #5a0701)", borderRadius: "99px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
