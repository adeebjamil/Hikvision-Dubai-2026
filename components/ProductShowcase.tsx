"use client";

import React from 'react';
import Link from 'next/link';
import { Outfit } from 'next/font/google';
import styles from './ProductShowcase.module.css';

const outfit = Outfit({ subsets: ['latin'], weight: ['700', '800'] });

import { useState, useEffect } from 'react';

const ProductShowcase = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const json = await res.json();
        if (json.success) {
          // Sort to put featured products first, then take the top 15
          const sorted = [...json.data].sort((a: any, b: any) => {
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            return 0;
          });
          setProducts(sorted.slice(0, 15));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const backgrounds = [styles.bg1, styles.bg2, styles.bg3, styles.bg4, styles.bg5, styles.bg6, styles.bg7, styles.bg8];
  return (
    <section className={styles.section} id="products" aria-label="Product Categories">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`${styles.title} ${outfit.className}`}>
            Explore Top <span className={styles.accent}>Products</span>
          </h2>
          <p className={styles.subtitle}>
            Discover our wide range of Hikvision systems designed for every specific security need, from robust outdoor bullet cameras to discreet indoor domes.
          </p>
        </div>
      </div>

      {/* Infinite Moving Marquee */}
      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {loading ? (
             Array(8).fill(0).map((_, i) => (
              <div key={`shimmer-${i}`} className={`${styles.card} ${styles.shimmer}`}></div>
            ))
          ) : (
            <>
              {/* First set */}
              {products.map((prod, i) => (
                <div key={`first-${prod._id}`} className={`${styles.card} ${backgrounds[i % backgrounds.length]}`}>
                  <div className={styles.imageContainer}>
                    <img src={prod.images?.[0] || '/placeholder.png'} alt={prod.name} className={styles.productImg} />
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.categoryName}>{prod.subCategory?.name || 'Security'}</span>
                    <h3 className={styles.productName}>{prod.name}</h3>
                  </div>
                  <div className={styles.overlay}></div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {products.map((prod, i) => (
                <div key={`second-${prod._id}`} className={`${styles.card} ${backgrounds[i % backgrounds.length]}`}>
                  <div className={styles.imageContainer}>
                    <img src={prod.images?.[0] || '/placeholder.png'} alt={prod.name} className={styles.productImg} />
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.categoryName}>{prod.subCategory?.name || 'Security'}</span>
                    <h3 className={styles.productName}>{prod.name}</h3>
                  </div>
                  <div className={styles.overlay}></div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.viewAllWrapper}>
          <Link href="/products" className={styles.viewAllBtn}>
            View Entire Catalog
            <svg style={{ marginLeft: '10px' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
