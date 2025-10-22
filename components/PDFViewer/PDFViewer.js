import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PDFViewer.module.scss';

const PDFViewer = ({ pdfUrl, onClose }) => {
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const viewerRef = useRef(null);

  useEffect(() => {
    // Prevent body scroll when viewer is open
    document.body.style.overflow = 'hidden';
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      document.body.style.overflow = 'unset';
      clearTimeout(timer);
    };
  }, []);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Anas_Pirzada_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.viewer}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.title}>
              <span className={styles.icon}>📄</span>
              <h3>Resume Preview</h3>
            </div>
            <div className={styles.controls}>
              <button
                onClick={handleZoomOut}
                className={styles.controlBtn}
                title='Zoom Out'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7' />
                </svg>
              </button>
              <span className={styles.zoomIndicator}>{Math.round(scale * 100)}%</span>
              <button
                onClick={handleZoomIn}
                className={styles.controlBtn}
                title='Zoom In'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7' />
                </svg>
              </button>
              <button
                onClick={handleOpenInNewTab}
                className={styles.downloadBtn}
                title='Open in New Tab'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                </svg>
                Open
              </button>
              <button
                onClick={handleDownload}
                className={styles.downloadBtn}
                title='Download PDF'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' />
                </svg>
                Download
              </button>
              <button
                onClick={onClose}
                className={styles.closeBtn}
                title='Close'
              >
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
          </div>

          {/* PDF Content */}
          <div className={styles.content} ref={viewerRef}>
            {isLoading && (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p className={styles.loadingText}>Loading PDF...</p>
              </div>
            )}
            <div
              className={styles.pdfContainer}
              style={{ 
                transform: `scale(${scale})`,
                opacity: isLoading ? 0 : 1 
              }}
            >
              <object
                data={pdfUrl}
                type='application/pdf'
                className={styles.iframe}
                onLoad={() => setIsLoading(false)}
              >
                <div className={styles.pdfError}>
                  <div className={styles.errorIcon}>📄</div>
                  <h4 className={styles.errorTitle}>PDF Preview</h4>
                  <p className={styles.errorMessage}>
                    Your browser doesn't support embedded PDF viewing.
                    <br />
                    Please use the buttons above to open or download the file.
                  </p>
                  <div className={styles.errorActions}>
                    <button onClick={handleOpenInNewTab} className={styles.errorBtn}>
                      Open in New Tab
                    </button>
                    <button onClick={handleDownload} className={styles.errorBtn}>
                      Download PDF
                    </button>
                  </div>
                </div>
              </object>
            </div>
          </div>

          {/* Helper text */}
          <div className={styles.fallback}>
            <p className={styles.fallbackText}>
              Having trouble viewing? 
              <button onClick={handleDownload} className={styles.fallbackLink}>
                Download PDF
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PDFViewer;

