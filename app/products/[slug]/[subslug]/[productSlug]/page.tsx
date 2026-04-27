"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Camera, ShieldCheck, Zap, Info, FileText, Share2, CheckCircle2 } from 'lucide-react';
import styles from './product-detail.module.css';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] });

export default function ProductDetailPage() {
  const params = useParams();
  const { slug, subslug, productSlug } = params;
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [shared, setShared] = useState(false);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    if (!productSlug) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products?slug=${productSlug}`);
        const json = await res.json();
        if (json.success) {
          setProduct(json.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product._id,
          ...formData
        })
      });
      
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    if (submitted) {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  // Helper to render spec values (handles nested objects)
  const renderSpecValue = (value: any): React.ReactNode => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === 'object') {
      if (Array.isArray(value)) return value.join(', ');
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {Object.entries(value).map(([k, v]: any, idx) => (
            <div key={idx} style={{ fontSize: '0.85rem' }}>
              <strong style={{ color: '#1a1a1a', textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1')}:</strong> {v.toString()}
            </div>
          ))}
        </div>
      );
    }
    return value.toString();
  };

  if (loading) {
    return (
      <div className={`${styles.main} ${outfit.className}`}>
        <div style={{ textAlign: 'center', padding: '15rem 0', color: '#666' }}>
          <div className="loading-spinner" />
          <p style={{ marginTop: '1rem', fontWeight: 600 }}>Loading technical specifications...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`${styles.main} ${outfit.className}`}>
        <div style={{ textAlign: 'center', padding: '10rem 0' }}>
          <h2>Product Not Found</h2>
          <Link href="/products" style={{ color: '#800000', fontWeight: 700 }}>Back to Catalog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.main} ${outfit.className}`}>
      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Link href="/" style={{ color: 'inherit' }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" style={{ color: 'inherit' }}>Products</Link>
            <ChevronRight size={14} />
            <Link href={`/products/${slug}`} style={{ color: 'inherit' }}>{product.category?.name}</Link>
            <ChevronRight size={14} />
            <Link href={`/products/${slug}/${subslug}`} style={{ color: 'inherit' }}>{product.subCategory?.name}</Link>
            <ChevronRight size={14} />
            <span>{product.name}</span>
          </div>
          <h1 className={styles.heroTitle}>{product.name}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', marginBottom: '2rem', fontWeight: 600 }}>
            {product.subTitle}
          </p>
          <div className={styles.heroMeta}>
            <span className={styles.modelText}>Model: {product.slug.toUpperCase()}</span>
            <div className={styles.verifiedBadge}>
              <CheckCircle2 size={16} className={styles.checkIcon} />
              VERIFIED AUTHENTIC
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Detail Section ── */}
      <section className={styles.productSection}>
        <div className={styles.productLayout}>
          {/* Left Column: Image & Technical Features */}
          <div className={styles.leftColumn}>
            <div className={styles.imageGallery}>
              <div className={styles.mainImage}>
                {product.images && product.images[0] ? (
                  <img src={product.images[0]} alt={product.name} />
                ) : (
                  <Camera size={120} color="#eee" />
                )}
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
                <button 
                  onClick={handleShare}
                  style={{ 
                    background: shared ? '#22c55e' : '#f5f5f5', 
                    color: shared ? '#fff' : '#1a1a1a',
                    border: 'none', 
                    padding: '0.8rem 1.2rem', 
                    borderRadius: '12px', 
                    fontSize: '0.85rem', 
                    fontWeight: 700, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {shared ? <CheckCircle2 size={16} /> : <Share2 size={16} />}
                  {shared ? 'Link Copied!' : 'Share Product'}
                </button>
              </div>
            </div>

            {/* Technical Features moved here */}
            <div style={{ padding: '0 1rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <ShieldCheck size={20} color="#800000" /> Technical Features
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {product.features?.map((f: string, idx: number) => (
                  <li key={idx} style={{ 
                    padding: '0.8rem 1rem', 
                    background: '#fafafa', 
                    borderRadius: '8px', 
                    marginBottom: '0.6rem',
                    fontSize: '0.9rem',
                    color: '#444',
                    borderLeft: '4px solid #800000',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem'
                  }}>
                    <div style={{ width: '6px', height: '6px', background: '#800000', borderRadius: '50%' }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Key Highlights & CTA */}
          <div className={styles.infoArea}>
            <span className={styles.subTitle}>{product.subCategory?.name} Solutions</span>
            <p className={styles.description}>{product.description}</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Zap size={20} color="#800000" /> Key Highlights
            </h3>
            
            <div className={styles.featuresGrid}>
              {product.keyFeatures?.length > 0 ? (
                product.keyFeatures.map((highlight: string, idx: number) => (
                  <div key={idx} className={styles.featureCard}>
                    <h4>Highlight {idx + 1}</h4>
                    <p>{highlight}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className={styles.featureCard}>
                    <h4>High Definition</h4>
                    <p>Crystal clear imaging with advanced noise reduction technologies.</p>
                  </div>
                  <div className={styles.featureCard}>
                    <h4>Smart Analytics</h4>
                    <p>Built-in AI for person and vehicle detection to minimize false alarms.</p>
                  </div>
                </>
              )}
            </div>

            <div className={styles.ctaBox}>
              <div className={styles.ctaText}>
                <h3>Need a custom solution?</h3>
                <p>Our experts can help you design the perfect security system.</p>
              </div>
              <button onClick={toggleModal} className={styles.quoteBtn}>Get a Free Quote</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Specifications Table ── */}
      <section className={styles.specsSection}>
        <h2 className={styles.sectionTitle}>
          <FileText size={28} color="#800000" /> 
          Technical Specifications
        </h2>
        
        <div className={styles.specsTable}>
          {product.specifications ? (
            Object.entries(product.specifications).map(([key, value]: any, idx: number) => (
              <div key={idx} className={styles.specRow}>
                <div className={styles.specLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className={styles.specValue}>
                  {renderSpecValue(value)}
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#666' }}>
              <Info size={40} color="#ddd" style={{ marginBottom: '1rem' }} />
              <p>Detailed technical datasheet is currently being updated for this model.</p>
              <p style={{ fontSize: '0.85rem' }}>Please contact our sales team for immediate assistance.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Enquiry Modal ── */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={toggleModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            {!submitted ? (
              <>
                <div className={styles.modalHeader}>
                  <div className={styles.modalProductImage}>
                    <img src={product.images?.[0]} alt={product.name} />
                  </div>
                  <div className={styles.modalHeaderText}>
                    <h4>Product Enquiry</h4>
                    <h3>{product.name}</h3>
                  </div>
                </div>
                
                <div className={styles.modalContent}>
                  <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>Your Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          placeholder="John Doe" 
                          required 
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Email Address</label>
                        <input 
                          type="email" 
                          name="email" 
                          placeholder="john@example.com" 
                          required 
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Mobile Number</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="+971 XX XXX XXXX" 
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Requirement Details</label>
                      <textarea 
                        name="message" 
                        rows={4} 
                        placeholder="Please describe your requirements..." 
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className={styles.modalSubmitBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending Request...' : 'Send Enquiry'}
                      <Zap size={18} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className={styles.thankYouState}>
                <div style={{ background: '#f0fff4', padding: '1.5rem', borderRadius: '50%', color: '#22c55e' }}>
                  <CheckCircle2 size={60} />
                </div>
                <h2>Thank You!</h2>
                <p>Your enquiry for <strong>{product.name}</strong> has been received. Our security experts will contact you shortly.</p>
                <button className={styles.closeBtn} onClick={toggleModal}>Close Window</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
