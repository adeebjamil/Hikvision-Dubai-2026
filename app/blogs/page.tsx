"use client";

import React, { useState, useMemo } from 'react';
import { Outfit } from 'next/font/google';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search,
  Tag,
  TrendingUp,
  Newspaper,
  Shield,
  FileText,
  Cpu,
  Home,
  Settings,
  Monitor,
  Inbox
} from 'lucide-react';
import Link from 'next/link';
import styles from './blogs.module.css';

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800'] });

// Mapping categories to icons for a premium look without images
const categoryIcons: Record<string, React.ReactNode> = {
  'Security Tips': <Shield size={80} strokeWidth={1} />,
  'Legal & Safety': <FileText size={80} strokeWidth={1} />,
  'Technology': <Cpu size={80} strokeWidth={1} />,
  'Smart Home': <Home size={80} strokeWidth={1} />,
  'Maintenance': <Settings size={80} strokeWidth={1} />,
  'Remote Access': <Monitor size={80} strokeWidth={1} />
};

const cardIcons: Record<string, React.ReactNode> = {
  'Security Tips': <Shield size={24} />,
  'Legal & Safety': <FileText size={24} />,
  'Technology': <Cpu size={24} />,
  'Smart Home': <Home size={24} />,
  'Maintenance': <Settings size={24} />,
  'Remote Access': <Monitor size={24} />
};

const blogPosts = [
  {
    slug: 'top-10-cctv-installation-tips-dubai',
    title: 'Top 10 CCTV Installation Tips for Dubai Businesses',
    excerpt: 'Ensuring your commercial property is secure requires more than just cameras. Learn the best practices for Hikvision setup in the UAE.',
    category: 'Security Tips',
    date: 'Oct 24, 2026',
    readTime: '8 min read',
    featured: true
  },
  {
    slug: 'understanding-sira-regulations-dubai',
    title: 'Understanding SIRA Regulations for Security Systems',
    excerpt: 'A comprehensive guide to staying compliant with Dubai\'s latest security laws and camera installation requirements.',
    category: 'Legal & Safety',
    date: 'Oct 20, 2026',
    readTime: '12 min read',
    featured: false
  },
  {
    slug: 'ai-in-surveillance-future-of-facial-recognition',
    title: 'AI in Surveillance: The Future of Facial Recognition',
    excerpt: 'Explore how Hikvision\'s latest AI-driven cameras are revolutionizing perimeter protection and incident response.',
    category: 'Technology',
    date: 'Oct 15, 2026',
    readTime: '6 min read',
    featured: false
  },
  {
    slug: 'why-smart-home-integration-must-2026',
    title: 'Why Smart Home Integration is a Must in 2026',
    excerpt: 'Connecting your security cameras to your smart home ecosystem offers unparalleled convenience and automated safety.',
    category: 'Smart Home',
    date: 'Oct 10, 2026',
    readTime: '5 min read',
    featured: false
  },
  {
    slug: 'maintaining-security-system-uae-heat',
    title: 'Maintaining Your Security System in Extreme UAE Heat',
    excerpt: 'How to ensure your outdoor cameras and NVRs survive the summer temperatures with proper maintenance.',
    category: 'Maintenance',
    date: 'Oct 5, 2026',
    readTime: '7 min read',
    featured: false
  },
  {
    slug: 'benefits-remote-monitoring-homeowners',
    title: 'The Benefits of Remote Monitoring for Homeowners',
    excerpt: 'Keep an eye on your home from anywhere in the world. We look at the top apps for Hikvision remote access.',
    category: 'Remote Access',
    date: 'Oct 1, 2026',
    readTime: '4 min read',
    featured: false
  }
];

const allCategories = ['All', 'Technology', 'Security Tips', 'Legal & Safety', 'Smart Home', 'Maintenance'];

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const featuredPost = blogPosts.find(post => post.featured);
  const recentPosts = filteredPosts.filter(post => !post.featured || searchQuery !== '' || activeCategory !== 'All');

  return (
    <>
      {/* Blog Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroBadge}>
            <TrendingUp size={16} />
            <span>Latest Insights</span>
          </div>
          <h1 className={`${styles.heroTitle} ${outfit.className}`}>
            Security <span className={styles.redText}>Insights</span> & News
          </h1>
          <p className={styles.heroSubtitle}>
            Stay ahead with the latest trends in Hikvision surveillance technology, 
            SIRA compliance, and property security in Dubai.
          </p>
          
          <div className={styles.searchBar}>
            <Search size={20} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search for articles, technologies, or tips..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Featured Post - Only show when no search/filter is active */}
      {featuredPost && searchQuery === '' && activeCategory === 'All' && (
        <section className={styles.featuredSection}>
          <div className={styles.container}>
            <Link href={`/blogs/${featuredPost.slug}`} className={styles.featuredCard}>
              <div className={styles.featuredIconBox}>
                {categoryIcons[featuredPost.category]}
              </div>
              <div className={styles.featuredContent}>
                <div className={styles.postMeta}>
                  <span className={styles.metaItem}><Calendar size={14} /> {featuredPost.date}</span>
                  <span className={styles.metaItem}><Clock size={14} /> {featuredPost.readTime}</span>
                </div>
                <h2 className={`${styles.featuredTitle} ${outfit.className}`}>{featuredPost.title}</h2>
                <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
                <div className={styles.readMore}>
                  Read Full Article <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={outfit.className}>
              {searchQuery || activeCategory !== 'All' ? 'Search Results' : 'Recent Articles'}
            </h2>
            <div className={styles.filterTags}>
              {allCategories.map(cat => (
                <span 
                  key={cat}
                  className={activeCategory === cat ? styles.activeTag : ''}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
          
          {recentPosts.length > 0 ? (
            <div className={styles.blogGrid}>
              {recentPosts.map((post) => (
                <Link href={`/blogs/${post.slug}`} key={post.slug} className={styles.blogCard}>
                  <div className={styles.cardIconBox}>
                    {cardIcons[post.category]}
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.postMeta}>
                      <span className={styles.metaItem}>{post.date}</span>
                      <span className={styles.dot}>•</span>
                      <span className={styles.metaItem}>{post.readTime}</span>
                    </div>
                    <h3 className={`${styles.cardTitle} ${outfit.className}`}>{post.title}</h3>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    <div className={styles.cardFooter}>
                      <span>Learn More</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <Inbox size={48} />
              <h3>No articles found</h3>
              <p>Try adjusting your search or filter to find what you're looking for.</p>
              <button onClick={() => {setSearchQuery(''); setActiveCategory('All');}}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className={styles.newsletter}>
        <div className={styles.container}>
          <div className={styles.newsletterCard}>
            <div className={styles.newsIcon}>
              <Newspaper size={40} />
            </div>
            <h2 className={outfit.className}>Subscribe to Security Monthly</h2>
            <p>Get the latest Hikvision firmware updates and security tips delivered to your inbox.</p>
            <form className={styles.newsForm} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit">Join Newsletter</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

