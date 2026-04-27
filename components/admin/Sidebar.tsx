"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/admin/(dashboard)/dashboard.module.css";
import Image from "next/image";
import {
  LayoutDashboard, ShoppingBag, Tags, FolderTree,
  MessageSquare, Mail, HelpCircle, Settings
} from "lucide-react";

type NavLink = { name: string; path: string; icon: React.ReactNode; exact?: boolean };

const navGroups: { label: string; links: NavLink[] }[] = [
  {
    label: "Main",
    links: [
      { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} />, exact: true },
    ]
  },
  {
    label: "Catalogue",
    links: [
      { name: "Categories", path: "/admin/category", icon: <FolderTree size={18} /> },
      { name: "Sub Categories", path: "/admin/sub-category", icon: <Tags size={18} /> },
      { name: "Products", path: "/admin/products", icon: <ShoppingBag size={18} /> },
    ]
  },
  {
    label: "Customer",
    links: [
      { name: "Enquiries", path: "/admin/enquiries", icon: <HelpCircle size={18} /> },
      { name: "Messages", path: "/admin/messages", icon: <MessageSquare size={18} /> },
      { name: "Newsletter", path: "/admin/newsletter", icon: <Mail size={18} /> },
    ]
  },
  {
    label: "System",
    links: [
      { name: "Settings", path: "/admin/settings", icon: <Settings size={18} /> },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return pathname === path;
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <Link href="/admin" className={styles.logoLink}>
          <Image
            src="/logo.png"
            alt="Hikvision Logo"
            width={220}
            height={70}
            style={{ objectFit: "contain", objectPosition: "center" }}
            priority
          />
        </Link>
      </div>

      <nav className={styles.nav}>
        {navGroups.map((group) => (
          <div key={group.label} className={styles.navSection}>
            <div className={styles.navSectionLabel}>{group.label}</div>
            {group.links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`${styles.navLink} ${isActive(link.path, link.exact) ? styles.navLinkActive : ""}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
          v1.0.0 · Hikvision Dubai © 2024
        </div>
      </div>
    </aside>
  );
}
