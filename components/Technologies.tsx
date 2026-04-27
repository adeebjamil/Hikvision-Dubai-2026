import React from 'react';
import styles from './Technologies.module.css';

const technologies = [
  {
    title: "DarkFighter Technology",
    description: "DarkFighter technology enables clear, full-color imaging in low light.",
    logoHtml: (
      <div className={styles.logoBadge}>
        <span className={styles.dfDark}>DarkFighter</span>
        <span className={styles.dfX}>X</span>
        <span className={styles.dfStar}>✦</span>
      </div>
    )
  },
  {
    title: "TandemVu Technology",
    description: "TandemVu combines fixed and PTZ lenses for efficient dual surveillance.",
    logoHtml: (
      <div className={styles.logoBadge}>
        <span className={styles.tvText}>TandemVu</span>
        <span className={styles.tvStar}>✦</span>
      </div>
    )
  },
  {
    title: "ColorVu Technology",
    description: "ColorVu Technology enables full-color surveillance for enhanced security.",
    logoHtml: (
      <div className={styles.cvWrapper}>
        <div className={styles.cvTop}>
          <div className={styles.cvIcon}>
            <div className={styles.cvSlice1}></div>
            <div className={styles.cvSlice2}></div>
            <div className={styles.cvSlice3}></div>
            <div className={styles.cvSlice4}></div>
          </div>
          <span className={styles.cvColor}>olor</span>
          <span className={styles.cvVu}>Vu</span>
        </div>
        <div className={styles.cvSub}>Technology</div>
      </div>
    )
  },
  {
    title: "Acusense technology",
    description: "AcuSense Technology uses AI to detect humans and vehicles accurately.",
    logoHtml: (
      <div className={styles.logoBadgeSmall}>
        <span className={styles.asAcu}>AcuSense</span>
        <span className={styles.asTech}>Technology</span>
        <span className={styles.asStar}>✦</span>
      </div>
    )
  }
];

const Technologies = () => {
  return (
    <section className={styles.section} aria-label="Hikvision Technologies">
      <div className={styles.container}>
        <div className={styles.grid}>
          {technologies.map((tech, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.logoWrapper}>
                {tech.logoHtml}
              </div>
              <h3 className={styles.cardTitle}>{tech.title}</h3>
              <div className={styles.cardDescWrapper}>
                <div className={styles.cardDescInner}>
                  <p className={styles.cardDesc}>{tech.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
