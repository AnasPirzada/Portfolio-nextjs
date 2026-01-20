import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { RESUME_DATA } from '../../constants';
import PDFViewer from '../PDFViewer/PDFViewer';
import styles from './Resume.module.scss';

const Resume = () => {
  const sectionRef = useRef(null);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.staggered-reveal'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleDownload = format => {
    const url = format === 'pdf' ? RESUME_DATA.pdfUrl : RESUME_DATA.docxUrl;
    const link = document.createElement('a');
    link.href = url;
    link.download = `Anas_Pirzada_Resume.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewOnline = () => {
    setShowPDFViewer(true);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full relative select-none py-10 md:py-20 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="section-container">
        <div className="flex flex-col items-start text-left">
          <p className="uppercase tracking-widest text-gray-light-1 staggered-reveal text-xs sm:text-sm md:text-base">
            RESUME
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl mt-2 font-medium text-gradient w-fit staggered-reveal">
            Download My CV
          </h1>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium md:max-w-2xl w-full mt-2 staggered-reveal">
            Get a detailed overview of my skills, experience, and achievements.
          </h2>
        </div>

        <div className={`${styles.container} mt-16`}>
          <motion.div
            className={styles.previewCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.preview}>
              <div className={styles.previewHeader}>
                <div className={styles.previewDot}></div>
                <div className={styles.previewDot}></div>
                <div className={styles.previewDot}></div>
              </div>
              <div className={styles.previewContent}>
                <div
                  className={styles.previewLine}
                  style={{ width: '60%' }}
                ></div>
                <div
                  className={styles.previewLine}
                  style={{ width: '80%' }}
                ></div>
                <div
                  className={styles.previewLine}
                  style={{ width: '70%' }}
                ></div>
                <div
                  className={styles.previewLine}
                  style={{ width: '90%' }}
                ></div>
                <div
                  className={styles.previewLine}
                  style={{ width: '75%' }}
                ></div>
                <div
                  className={styles.previewLine}
                  style={{ width: '85%' }}
                ></div>
                <div className={styles.previewIcon}>📄</div>
              </div>
            </div>

            <div className={styles.info}>
              <h3 className={styles.title}>Professional Resume</h3>
              <p className={styles.description}>
                A comprehensive overview of my professional journey, skills, and
                accomplishments.
              </p>

              <div className={styles.features}>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Detailed Work Experience</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Technical Skills & Tools</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Education & Certifications</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Projects & Achievements</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              className={`${styles.downloadBtn} ${styles.pdfBtn} link`}
              onClick={() => handleDownload('pdf')}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div className={styles.btnIconWrapper}>
                <svg
                  className={styles.btnIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <div className={styles.iconGlow}></div>
              </div>
              <span className={styles.btnText}>
                <span className={styles.btnLabel}>Download PDF</span>
                <span className={styles.btnSubtext}>Recommended format</span>
              </span>
              <div className={styles.btnShine}></div>
            </motion.button>

            <motion.button
              className={`${styles.downloadBtn} ${styles.docxBtn} link`}
              onClick={() => handleDownload('docx')}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div className={styles.btnIconWrapper}>
                <svg
                  className={styles.btnIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <div className={styles.iconGlow}></div>
              </div>
              <span className={styles.btnText}>
                <span className={styles.btnLabel}>Download DOCX</span>
                <span className={styles.btnSubtext}>Editable format</span>
              </span>
              <div className={styles.btnShine}></div>
            </motion.button>

            <motion.button
              onClick={handleViewOnline}
              className={`${styles.downloadBtn} ${styles.viewBtn} link`}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div className={styles.btnIconWrapper}>
                <svg
                  className={styles.btnIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <div className={styles.iconGlow}></div>
              </div>
              <span className={styles.btnText}>
                <span className={styles.btnLabel}>View Online</span>
                <span className={styles.btnSubtext}>Preview in browser</span>
              </span>
              <div className={styles.btnShine}></div>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showPDFViewer && (
        <PDFViewer
          pdfUrl={RESUME_DATA.pdfUrl}
          onClose={() => setShowPDFViewer(false)}
        />
      )}
    </section>
  );
};

export default Resume;
