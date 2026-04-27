"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Box, Camera, ShieldCheck, Monitor, Cpu, BellRing, DoorOpen } from 'lucide-react';
import styles from './products.module.css';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] });

export default function ProductsPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/categories');
        const json = await res.json();
        if (json.success) {
          setCategories(json.data);
          setFilteredCategories(json.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = categories.filter(cat => 
      cat.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [search, categories]);

  return (
    <div className={`${styles.main} ${outfit.className}`}>
      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Authorized Hikvision Partner</span>
          <h1 className={styles.heroTitle}>Premium Security Solutions</h1>
          <p className={styles.heroSubtitle}>Explore the complete range of Hikvision technology for every environment and requirement.</p>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className={styles.filterBar}>
        <div className={styles.filterInfo}>
          <Box size={20} color="#800000" />
          <span>All Categories</span>
          <span className={styles.filterBadge}>{filteredCategories.length} Items</span>
        </div>
        <div className={styles.searchBox}>
          <Camera size={18} color="#999" />
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* ── Products/Categories Grid ── */}
      <section className={styles.section}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '10rem 0', color: '#666' }}>
            <div className="loading-spinner" />
            <p style={{ marginTop: '1rem', fontWeight: 600 }}>Curating professional solutions...</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <Link 
                  key={cat._id} 
                  href={`/products/${cat.slug}`} 
                  className={styles.card}
                >
                  <div className={styles.cardImage}>
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Camera size={80} color="#eee" />
                      </div>
                    )}
                    <div className={styles.cardOverlay}>
                      <span className={styles.categoryTag}>
                        <ShieldCheck size={14} />
                        Enterprise Grade
                      </span>
                      <h3 className={styles.cardName}>{cat.name}</h3>
                      <p className={styles.cardDesc}>High-performance surveillance hardware optimized for professional security environments.</p>
                      <div className={styles.viewBtn}>
                        View ProductSeries <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem 0', color: '#666' }}>
                <Box size={48} color="#ddd" style={{ marginBottom: '1rem' }} />
                <h3>No categories found matching "{search}"</h3>
                <p>Try searching for a different keyword or security solution.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
