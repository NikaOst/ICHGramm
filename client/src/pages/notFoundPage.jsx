import leftPic from '../assets/images/backgroundAuth.png';
import styles from '../styles/404.module.css';

function NotFoundPage() {
  return (
    <div className={styles.main404PageContainer}>
      <div>
        <img src={leftPic} alt="leftPic" />
      </div>
      <div className={styles.page404TextBox}>
        <div>
          <span className={styles.page404Title}>Oops! Page Not Found (404 Error)</span>
        </div>

        <div className={styles.page404Body}>
          <span>We're sorry, but the page you're looking for doesn't seem to exist.</span>
          <span>If you typed the URL manually, please double-check the spelling. </span>
          <span>If you clicked on a link, it may be outdated or broken.</span>
        </div>
      </div>
    </div>
  );
}
export default NotFoundPage;
