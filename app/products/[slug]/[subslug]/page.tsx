"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Camera, Box, ShieldCheck, Zap, ChevronRight } from 'lucide-react';
import styles from './products-grid.module.css';
import { Outfit } from 'next/font/google';
import { useRouter } from 'next/navigation';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] });

export default function ProductsGridPage() {
  const router = useRouter();
  const params = useParams();
  const { slug, subslug } = params;
  
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [allSubCategories, setAllSubCategories] = useState<any[]>([]);
  const [subCategory, setSubCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch all categories for filter
        const catRes = await fetch('/api/categories');
        const catJson = await catRes.json();
        if (catJson.success) {
          setAllCategories(catJson.data);
        }

        // 2. Fetch all sub-categories for filter
        const subAllRes = await fetch('/api/sub-categories');
        const subAllJson = await subAllRes.json();
        if (subAllJson.success) {
          setAllSubCategories(subAllJson.data);
          const foundSub = subAllJson.data.find((s: any) => s.slug === subslug);
          setSubCategory(foundSub);
        }

        // 3. Fetch products for this sub-category
        if (subslug) {
          const prodRes = await fetch(`/api/products?subcat=${subslug}`);
          const prodJson = await prodRes.json();
          if (prodJson.success) {
            setProducts(prodJson.data);
            setFilteredProducts(prodJson.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subslug]);

  useEffect(() => {
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  if (loading) {
    return (
      <div className={`${styles.main} ${outfit.className}`}>
        <div style={{ textAlign: 'center', padding: '15rem 0', color: '#666' }}>
          <div className="loading-spinner" />
          <p style={{ marginTop: '1rem', fontWeight: 600 }}>Syncing high-performance hardware...</p>
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
            <Link href={`/products/${slug}`} style={{ color: 'inherit' }}>{subCategory?.category?.name || slug}</Link>
            <ChevronRight size={14} />
            <span>{subCategory?.name || subslug}</span>
          </div>
          <h1 className={styles.heroTitle}>{subCategory?.name}</h1>
          <p className={styles.heroSubtitle}>
            Professional-grade surveillance and security hardware. Engineered for precision, reliability, and enterprise-scale performance.
          </p>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className={styles.filterBar}>
        <div className={styles.filterActions}>
          {/* Category Filter */}
          <div className={styles.selectWrapper}>
            <span>Category:</span>
            <select 
              value={slug} 
              onChange={(e) => {
                const newCat = allCategories.find(c => c.slug === e.target.value);
                if (newCat) router.push(`/products/${newCat.slug}`);
              }}
            >
              {allCategories.map(cat => (
                <option key={cat._id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Sub-Category Filter */}
          <div className={styles.selectWrapper}>
            <span>Series:</span>
            <select 
              value={subslug} 
              onChange={(e) => router.push(`/products/${slug}/${e.target.value}`)}
            >
              {allSubCategories
                .filter(s => s.category?.slug === slug)
                .map(sub => (
                  <option key={sub._id} value={sub.slug}>{sub.name}</option>
                ))
              }
            </select>
          </div>
        </div>

        <div className={styles.searchBox}>
          <Camera size={18} color="#999" />
          <input 
            type="text" 
            placeholder={`Search ${subCategory?.name}...`} 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section className={styles.section}>
        <div className={styles.grid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link key={product._id} href={`/products/${slug}/${subslug}/${product.slug}`} className={styles.card}>
                <div className={styles.imageArea}>
                  {product.isFeatured && <span className={styles.featuredBadge}>Top Rated</span>}
                  {product.images && product.images[0] ? (
                    <img src={product.images[0]} alt={product.name} />
                  ) : (
                    <Camera size={80} color="#eee" />
                  )}
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.productSub}>{subCategory?.name}</span>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>
                  
                  <div className={styles.productFooter}>
                    <div className={styles.viewDetails}>
                      View Specifications
                      <div className={styles.iconBox}>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                    <Zap size={18} color="#eee" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '8rem 0', color: '#666' }}>
              <Box size={56} color="#ddd" style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>No Models Found</h2>
              <p>We couldn't find any products matching "{search}" in this series.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
