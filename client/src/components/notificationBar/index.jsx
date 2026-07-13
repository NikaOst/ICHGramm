import styles from './notification.module.css';

function NotificationBar() {
  return (
    <div className={styles.mainSearchBox}>
      <span className={styles.barTitle}>Notifications</span>
      <span className={styles.barSubtitle}>New</span>
      <div></div>
    </div>
  );
}
export default NotificationBar;
