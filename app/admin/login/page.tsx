"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import Image from "next/image";
import { Lock, Mail, AlertCircle, BarChart3, ShoppingBag, Shield } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/admin");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch {
      setError("Connection error. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* Left Panel */}
      <div className={styles.leftPanel}>
        <div className={styles.brandLogo}>
          <Image src="/logo.png" alt="Hikvision Logo" width={280} height={80} style={{ objectFit: "contain" }} />
        </div>
        <p className={styles.brandSubtitle}>
          Complete admin control panel to manage your products, categories, enquiries and more.
        </p>
        <div className={styles.featureList}>
          {[
            { icon: <ShoppingBag size={16} />, text: "Manage products & categories" },
            { icon: <BarChart3 size={16} />, text: "Track enquiries & messages" },
            { icon: <Shield size={16} />, text: "Secure session-based auth" },
          ].map((f, i) => (
            <div key={i} className={styles.featureItem}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className={styles.rightPanel}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h2 className={styles.loginTitle}>Welcome back 👋</h2>
            <p className={styles.loginSubtitle}>Sign in to your admin account to continue.</p>
          </div>

          {error && (
            <div className={styles.error}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.inputWrapper}>
                <Mail size={17} className={styles.inputIcon} />
                <input
                  type="email"
                  className={styles.input}
                  placeholder="admin@hikvision.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <Lock size={17} className={styles.inputIcon} />
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </form>

          <p className={styles.hint}>
            © 2026 Hikvision Camera Dubai. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
