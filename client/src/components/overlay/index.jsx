import SearchBar from '../searchBar';
import NotificationBar from '../notificationBar';
import styles from './overlay.module.css';

function Overlay({ activeOverlay, setActiveOverlay }) {
  return (
    <div className={styles.overlayBackdrop} onClick={() => setActiveOverlay(null)}>
      <div className={styles.overlayPanel} onClick={(e) => e.stopPropagation()}>
        {activeOverlay === 'search' && <SearchBar />}
        {activeOverlay === 'notifications' && <NotificationBar />}
        {activeOverlay === 'create' && <div>Create</div>}
      </div>
    </div>
  );
}
export default Overlay;
