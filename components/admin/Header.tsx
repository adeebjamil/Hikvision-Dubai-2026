"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import styles from "@/app/admin/(dashboard)/dashboard.module.css";
import { LogOut, Search, FolderTree, Tags, ShoppingBag, Loader2 } from "lucide-react";

const pageTitles: Record<string, { title: string; sub: string }> = {
  "/admin": { title: "Dashboard Overview", sub: "Welcome back, Admin" },
  "/admin/category": { title: "Categories", sub: "Manage product categories" },
  "/admin/sub-category": { title: "Sub Categories", sub: "Manage product sub-categories" },
  "/admin/products": { title: "Products", sub: "Manage your product catalogue" },
  "/admin/enquiries": { title: "Product Enquiries", sub: "View and respond to customer enquiries" },
  "/admin/messages": { title: "Contact Messages", sub: "View and respond to contact messages" },
  "/admin/newsletter": { title: "Newsletter", sub: "Manage newsletter subscribers" },
  "/admin/settings": { title: "Settings", sub: "Manage account and site settings" },
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const page = pageTitles[pathname] || { title: "Admin Panel", sub: "Hikvision Dubai" };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        try {
          const res = await fetch(`/api/admin/search?q=${encodeURIComponent(searchQuery)}`);
          const data = await res.json();
          if (data.success) {
            setSearchResults(data.results);
            setShowResults(true);
          }
        } catch (err) {
          console.error("Search failed", err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const getIcon = (type: string) => {
    if (type === "Category") return <FolderTree size={14} />;
    if (type === "Sub Category") return <Tags size={14} />;
    return <ShoppingBag size={14} />;
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.headerTitle}>{page.title}</div>
        <div className={styles.headerBreadcrumb}>Admin / {page.sub}</div>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.headerSearch} ref={searchRef}>
          {isSearching ? <Loader2 size={16} className={`${styles.searchIcon} ${styles.spin}`} /> : <Search size={16} className={styles.searchIcon} />}
          <input 
            type="text" 
            placeholder="Search catalogue, enquiries, etc..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
          />

          {showResults && (
            <div className={styles.searchResults}>
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <div 
                    key={`${result.type}-${result.id}`} 
                    className={styles.searchResultItem}
                    onClick={() => {
                      router.push(result.link);
                      setShowResults(false);
                      setSearchQuery("");
                    }}
                  >
                    <div className={styles.resultIcon}>{getIcon(result.type)}</div>
                    <div className={styles.resultInfo}>
                      <div className={styles.resultName}>{result.name}</div>
                      <div className={styles.resultType}>{result.type}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>No matches found for "{searchQuery}"</div>
              )}
            </div>
          )}
        </div>

        <div className={styles.divider} />

        <div className={styles.adminBadge}>
          <div className={styles.adminAvatar}>AD</div>
          <div>
            <div className={styles.adminName}>Administrator</div>
            <div className={styles.adminRole}>Super Admin</div>
          </div>
        </div>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </header>
  );
}
