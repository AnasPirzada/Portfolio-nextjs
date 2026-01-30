import { IconUpwork } from '@/components/Icons';
import styles from './UpworkBadge.module.scss';

const UpworkBadge = () => {
  return (
    <a
      href="https://www.upwork.com/freelancers/~0199934b87d980c5f6?mp_source=share"
      target="_blank"
      rel="noreferrer"
      className={styles.badge}
      aria-label="Upwork Freelancer"
    >
      <div className={styles.iconWrapper}>
        <IconUpwork />
      </div>
      <div className={styles.content}>
        <span className={styles.level}>Top Rated</span>
        <span className={styles.seller}>Freelancer</span>
      </div>
      <div className={styles.star}>★</div>
    </a>
  );
};

export default UpworkBadge;
