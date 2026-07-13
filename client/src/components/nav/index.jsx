import styles from './nav.module.css';
import logo from '../../assets/icons/smallLogo.svg';
import home from '../../assets/icons/homeImg.svg';
import search from '../../assets/icons/searchImg.svg';
import explore from '../../assets/icons/exploreImg.svg';
import messages from '../../assets/icons/messagesImg.svg';
import notifications from '../../assets/icons/notificationsImg.svg';
import create from '../../assets/icons/createImg.svg';
import regularProfilPic from '../../assets/icons/userRegular.svg';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import BetaV from '../betaV';

function Navbar({ activeOverlay, setActiveOverlay }) {
  const me = useSelector((state) => state.users.me);

  const toggleOverlay = (name) => {
    setActiveOverlay((prev) => (prev === name ? null : name));
  };

  return (
    <div className={styles.navWrapper}>
      <div className={styles.navMainBox}>
        <img className={styles.navLogo} src={logo} alt="logo" />
        <div className={styles.navMenu}>
          <div className={styles.navPage}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive &&
                activeOverlay !== 'search' &&
                activeOverlay !== 'notifications' &&
                activeOverlay !== 'create'
                  ? `${styles.navButtonActive} ${styles.navLinkRow}`
                  : `${styles.navButton} ${styles.navLinkRow}`
              }
              onClick={() => setActiveOverlay(null)}>
              {({ isActive }) => (
                <>
                  <img
                    src={home}
                    alt="homePic"
                    className={isActive ? styles.navIconActive : styles.navIcon}
                  />
                  <span className={styles.navLabel}>Home</span>
                </>
              )}
            </NavLink>
          </div>
          <div className={styles.navPage}>
            <img onClick={() => toggleOverlay('search')} src={search} alt="searchPic" />
            <button
              onClick={() => toggleOverlay('search')}
              className={activeOverlay === 'search' ? styles.navButtonActive : styles.navButton}>
              Search
            </button>
          </div>
          <div className={styles.navPage}>
            <NavLink
              to="/explore"
              end
              className={({ isActive }) =>
                isActive &&
                activeOverlay !== 'search' &&
                activeOverlay !== 'notifications' &&
                activeOverlay !== 'create'
                  ? `${styles.navButtonActive} ${styles.navLinkRow}`
                  : `${styles.navButton} ${styles.navLinkRow}`
              }
              onClick={() => setActiveOverlay(null)}>
              {({ isActive }) => (
                <>
                  <img
                    src={explore}
                    alt="explorePic"
                    className={isActive ? styles.navIconActive : styles.navIcon}
                  />
                  <span className={styles.navLabel}>Explore</span>
                </>
              )}
            </NavLink>
          </div>
          <div className={`${styles.navPage} ${styles.beta}`}>
            <NavLink
              // to="/messages"
              // end
              className={({ isActive }) => isActive && `${styles.navButton} ${styles.navLinkRow}`}
              onClick={() => setActiveOverlay(null)}>
              {({ isActive }) => (
                <>
                  <img
                    src={messages}
                    alt="messagePic"
                    className={isActive ? styles.navIconActive : styles.navIcon}
                  />
                  <span className={styles.navLabel}>Messages</span>
                </>
              )}
            </NavLink>
            <div className={styles.betaLabel}>
              <BetaV />
            </div>
          </div>
          <div className={`${styles.navPage} ${styles.beta}`}>
            <img src={notifications} alt="notificPic" />
            <button
              // onClick={() => toggleOverlay('notifications')}
              className={
                activeOverlay === 'notifications' ? styles.navButtonActive : styles.navButton
              }>
              Notifications
            </button>
            <div className={styles.betaLabel}>
              <BetaV />
            </div>
          </div>
          <div className={styles.navPage}>
            <img onClick={() => toggleOverlay('create')} src={create} alt="createPic" />
            <button
              onClick={() => toggleOverlay('create')}
              className={activeOverlay === 'create' ? styles.navButtonActive : styles.navButton}>
              Create
            </button>
          </div>
        </div>
        <div className={styles.navPage}>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              isActive &&
              activeOverlay !== 'search' &&
              activeOverlay !== 'notifications' &&
              activeOverlay !== 'create'
                ? `${styles.navButtonActive} ${styles.navLinkRow}`
                : `${styles.navButton} ${styles.navLinkRow}`
            }
            onClick={() => setActiveOverlay(null)}>
            {() => (
              <>
                <div className={styles.avatarWrap}>
                  {me?.image ? (
                    <img src={`${import.meta.env.VITE_BASE_URL}${me.image}`} alt="profilePic" />
                  ) : (
                    <img
                      className={styles.regularAvatar}
                      src={regularProfilPic}
                      alt="regularProfilPic"
                    />
                  )}
                </div>
                <span className={styles.navLabel}>Profile</span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
