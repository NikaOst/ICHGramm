import styles from './notification.module.css';

function NotificationBar() {
  return (
    <div className={styles.mainSearchBox}>
      <span className={styles.barTitle}>Notifications</span>
      <span className={styles.barSubtitle}>New</span>
      <div>
        {/* массив новых уведомлений */}
        {/* <img src="" alt="" /> */}
        {/* <div>
          <span></span>
          <span></span>
        </div> */}
        {/* <img src="" alt="" /> */}
      </div>
    </div>
  );
}
export default NotificationBar;
