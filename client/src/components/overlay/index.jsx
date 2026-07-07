import SearchBar from '../searchBar';
import NotificationBar from '../notificationBar';
import styles from './overlay.module.css';
import CreatePost from '../createPost';

function Overlay({ activeOverlay, setActiveOverlay }) {
  return (
    <div className={styles.overlayBackdrop} onClick={() => setActiveOverlay(null)}>
      <div className={styles.overlayPanel} onClick={(e) => e.stopPropagation()}>
        {activeOverlay === 'search' && <SearchBar />}
        {activeOverlay === 'notifications' && <NotificationBar />}
      </div>
      <div className={styles.overlayCreatePanel} onClick={(e) => e.stopPropagation()}>
        {activeOverlay === 'create' && <CreatePost setActiveOverlay={setActiveOverlay} />}
      </div>
    </div>
  );
}
export default Overlay;
