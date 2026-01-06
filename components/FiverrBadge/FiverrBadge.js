import { IconFiverr } from '@/components/Icons';
import styles from './FiverrBadge.module.scss';

const FiverrBadge = () => {
  return (
    <a
      href="https://www.fiverr.com/anas_peerzada/"
      target="_blank"
      rel="noreferrer"
      className={styles.badge}
      aria-label="Fiverr Level 1 Seller"
    >
      <div className={styles.iconWrapper}>
        <IconFiverr />
      </div>
      <div className={styles.content}>
        <span className={styles.level}>Level 1</span>
        <span className={styles.seller}>Seller</span>
      </div>
      <div className={styles.star}>★</div>
    </a>
  );
};

export default FiverrBadge;
