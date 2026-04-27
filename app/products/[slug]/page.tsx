"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Camera, ShieldCheck, Box, ChevronRight } from 'lucide-react';
import styles from './subcategory.module.css';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] });

export default function SubCategoryPage() {
  const params = useParams();
  const slug = params.slug;
  
  const [category, setCategory] = useState<any>(null);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        // 1. Fetch category details to get the name/hero info
        const catRes = await fetch('/api/categories');
        const catJson = await catRes.json();
        if (catJson.success) {
          const foundCat = catJson.data.find((c: any) => c.slug === slug);
          setCategory(foundCat);
        }

        // 2. Fetch sub-categories for this slug
        const subRes = await fetch(`/api/sub-categories?cat=${slug}`);
        const subJson = await subRes.json();
        if (subJson.success) {
          setSubCategories(subJson.data);
          setFilteredSubCategories(subJson.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    const filtered = subCategories.filter(sub => 
      sub.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSubCategories(filtered);
  }, [search, subCategories]);

  if (loading) {
    return (
      <div className={`${styles.main} ${outfit.className}`}>
        <div style={{ textAlign: 'center', padding: '15rem 0', color: '#666' }}>
          <div className="loading-spinner" />
          <p style={{ marginTop: '1rem', fontWeight: 600 }}>Loading professional solutions...</p>
        </div>
      </div>
    );
  }

  if (!category && !loading) {
    return (
      <div className={`${styles.main} ${outfit.className}`}>
        <div style={{ textAlign: 'center', padding: '10rem 0' }}>
          <h2>Category Not Found</h2>
          <Link href="/products" style={{ color: '#800000', fontWeight: 700 }}>Return to all products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.main} ${outfit.className}`}>
      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Link href="/" style={{ color: 'inherit' }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" style={{ color: 'inherit' }}>Products</Link>
            <ChevronRight size={14} />
            <span>{category?.name}</span>
          </div>
          <h1 className={styles.heroTitle}>{category?.name}</h1>
          <p className={styles.heroSubtitle}>
            Specialized {category?.name} hardware designed for mission-critical surveillance and security.
          </p>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className={styles.filterBar}>
        <div className={styles.filterInfo}>
          <Box size={20} color="#800000" />
          <span>{category?.name} Series</span>
          <span className={styles.filterBadge}>{filteredSubCategories.length} Items</span>
        </div>
        <div className={styles.searchBox}>
          <Camera size={18} color="#999" />
          <input 
            type="text" 
            placeholder={`Search in ${category?.name}...`} 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* ── Sub-Category Grid ── */}
      <section className={styles.section}>
        <div className={styles.grid}>
          {filteredSubCategories.length > 0 ? (
            filteredSubCategories.map((sub) => (
              <div key={sub._id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  {sub.image ? (
                    <img src={sub.image} alt={sub.name} />
                  ) : (
                    <Camera size={64} color="#ddd" />
                  )}
                </div>
                <h3 className={styles.subName}>{sub.name}</h3>
                <p className={styles.subDesc}>
                  Professional grade {sub.name} solutions with advanced analytics and high-definition imaging.
                </p>
                <Link href={`/products/${slug}/${sub.slug}`} className={styles.viewProducts}>
                  View Product Series <ArrowRight size={16} />
                </Link>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem 0', color: '#666' }}>
              <Box size={48} color="#ddd" style={{ marginBottom: '1rem' }} />
              <h3>No Series found matching "{search}"</h3>
              <p>Try searching for a different keyword or security solution.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
