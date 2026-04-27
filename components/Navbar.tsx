'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

import { 
  Camera, 
  Cpu, 
  ShieldCheck, 
  Video, 
  BellRing, 
  DoorOpen,
  ArrowRight
} from 'lucide-react';

const Navbar = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await fetch('/api/sub-categories');
        const json = await res.json();
        if (json.success) {
          setSubCategories(json.data);
        }
      } catch (error) {
        console.error("Error fetching sub-categories:", error);
      }
    };
    fetchSubCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Hover for Products
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setProductsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setProductsOpen(false);
    }, 500);
    setHoverTimeout(timeout);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <>
      {/* ... existing topBar ... */}
      {/* ── Top Utility Bar ── */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.topBarLeft}>
            <a href="tel:+971552929644" className={styles.topBarLink}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden="true">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              +971 55 292 9644
            </a>
            <span className={styles.topBarDivider} aria-hidden="true">|</span>
            <a href="mailto:sales@lovosis.com" className={styles.topBarLink}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              sales@lovosis.com
            </a>
          </div>
          <div className={styles.topBarRight}>
            <span className={styles.topBarBadge}>Authorized Hikvision Partner</span>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Facebook" className={`${styles.socialLink} ${styles.facebook}`}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className={`${styles.socialLink} ${styles.linkedin}`}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" aria-label="WhatsApp" className={`${styles.socialLink} ${styles.whatsapp}`}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
        <div className={styles.container}>

          {/* Left Nav */}
          <nav className={styles.navLeft} aria-label="Primary left navigation">
            <ul className={styles.navLinks} role="list">
              <li><Link href="/" className={styles.navLink}>Home</Link></li>
              <li 
                ref={dropdownRef} 
                className={styles.hasDropdown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`${styles.navLink} ${styles.dropdownTrigger}`}
                  onClick={() => setProductsOpen(v => !v)}
                  aria-expanded={productsOpen}
                  aria-haspopup="true"
                  id="products-menu-btn"
                >
                  Products
                  <svg
                    className={`${styles.chevron} ${productsOpen ? styles.chevronOpen : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.5" width="12" height="12" aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {/* Centered Products Dropdown */}
                {productsOpen && (
                  <div 
                    className={styles.dropdown} 
                    role="menu" 
                    aria-labelledby="products-menu-btn"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={styles.dropdownContent}>
                      <div className={styles.dropdownHeader}>
                        <h4>Security Solutions</h4>
                        <p>Explore our professional range of Hikvision technology</p>
                      </div>
                      <div className={styles.dropdownGrid}>
                        {subCategories.slice(0, 9).map(sub => (
                          <Link
                            key={sub._id}
                            href={`/products/${sub.category?.slug || 'security'}/${sub.slug}`}
                            className={styles.dropdownItem}
                            role="menuitem"
                            onClick={() => setProductsOpen(false)}
                          >
                            <div className={styles.dropdownIcon}>
                              {sub.image ? (
                                <img 
                                  src={sub.image} 
                                  alt={sub.name} 
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} 
                                />
                              ) : (
                                <Camera size={24} />
                              )
                              }
                            </div>
                            <div className={styles.dropdownInfo}>
                              <span className={styles.dropdownLabel}>{sub.name}</span>
                              <span className={styles.dropdownDesc}>View professional solutions</span>
                              <span className={styles.exploreLink}>Explore Series <ArrowRight size={12} /></span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li><Link href="/services" className={styles.navLink}>Services</Link></li>
            </ul>
          </nav>

          {/* Centred Logo */}
          <Link href="/" className={styles.logoLink} aria-label="Hikvision Dubai – Home">
            <img
              src="/logo.png"
              alt="Hikvision Dubai Logo"
              className={styles.logoImage}
              loading="eager"
            />
          </Link>

          {/* Right Nav */}
          <nav className={styles.navRight} aria-label="Primary right navigation">
            <ul className={styles.navLinks} role="list">
              <li><Link href="/blogs" className={styles.navLink}>Blogs</Link></li>
              <li><Link href="/about" className={styles.navLink}>About Us</Link></li>
              <li><Link href="/contact" className={styles.navLink}>Contact</Link></li>
            </ul>
            <a href="tel:+971552929644" className={styles.ctaBtn} aria-label="Call us now">
              <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              Get a Quote
            </a>
          </nav>


          {/* Mobile Hamburger */}
          <button
            className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.bar}/>
            <span className={styles.bar}/>
            <span className={styles.bar}/>
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <div
        id="mobile-menu"
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          <ul className={styles.mobileLinks} role="list">
            {[
              { href: '/', label: 'Home' },
              { href: '/products', label: 'Products' },
              { href: '/services', label: 'Services' },
              { href: '/blogs', label: 'Blogs' },
              { href: '/about', label: 'About Us' },
              { href: '/contact', label: 'Contact' },
            ].map((item, i) => (
              <li key={item.href} style={{ '--delay': `${i * 0.06}s` } as React.CSSProperties}>
                <Link
                  href={item.href}
                  className={styles.mobileLink}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href="tel:+971542471347" className={styles.mobileCta} onClick={() => setMobileOpen(false)}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
            +971 54 247 1347 — Call Now
          </a>
        </nav>
      </div>

      {/* Click-away backdrop */}
      {mobileOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;
