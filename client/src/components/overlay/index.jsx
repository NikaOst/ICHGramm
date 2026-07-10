import SearchBar from '../searchBar';
import NotificationBar from '../notificationBar';
import styles from './overlay.module.css';
import CreatePost from '../createPost';
import Post from '../post';
import MenuPostWindow from '../editPostWindow';

function Overlay({ activeOverlay, setActiveOverlay, selectedPost, setSelectedPost }) {
  const handleClose = () => {
    setActiveOverlay(null);
    setSelectedPost?.(null);
  };
  const closePostMenuOnly = () => {
    setActiveOverlay('post');
  };
  const closePostMenuPost = () => {
    setActiveOverlay(null);
  };
  return (
    <div className={styles.overlayBackdrop} onClick={handleClose}>
      <div className={styles.overlayPanel} onClick={(e) => e.stopPropagation()}>
        {activeOverlay === 'search' && <SearchBar />}
        {activeOverlay === 'notifications' && <NotificationBar />}
      </div>

      {activeOverlay === 'create' && (
        <div className={styles.overlayCreatePanel} onClick={(e) => e.stopPropagation()}>
          <CreatePost setActiveOverlay={setActiveOverlay} />
        </div>
      )}

      {(activeOverlay === 'post' || activeOverlay === 'postMenu') && selectedPost && (
        <div className={styles.overlayPostPanel} onClick={(e) => e.stopPropagation()}>
          <div className={activeOverlay === 'postMenu' ? styles.postDimmed : ''}>
            <Post post={selectedPost} onOpenMenu={() => setActiveOverlay('postMenu')} />
          </div>

          {activeOverlay === 'postMenu' && (
            <div className={styles.overlayPostMenuPanel}>
              <div className={styles.overlayPostMenuBackdrop} onClick={closePostMenuOnly} />
              <div className={styles.overlayPostMenuContent} onClick={(e) => e.stopPropagation()}>
                <MenuPostWindow
                  post={selectedPost}
                  onCancel={closePostMenuOnly}
                  onCloseAllWindows={closePostMenuPost}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Overlay;
