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
            <img src={home} alt="homePic" />
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive &&
                activeOverlay !== 'search' &&
                activeOverlay !== 'notifications' &&
                activeOverlay !== 'create'
                  ? styles.navButtonActive
                  : styles.navButton
              }
              onClick={() => setActiveOverlay(null)}>
              Home
            </NavLink>
          </div>
          <div className={styles.navPage}>
            <img src={search} alt="searchPic" />
            <button
              onClick={() => toggleOverlay('search')}
              className={activeOverlay === 'search' ? styles.navButtonActive : styles.navButton}>
              Search
            </button>
          </div>
          <div className={styles.navPage}>
            <img src={explore} alt="explorePic" />
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                isActive &&
                activeOverlay !== 'search' &&
                activeOverlay !== 'notifications' &&
                activeOverlay !== 'create'
                  ? styles.navButtonActive
                  : styles.navButton
              }
              onClick={() => setActiveOverlay(null)}>
              Explore
            </NavLink>
          </div>
          <div className={styles.navPage}>
            <img src={messages} alt="messagePic" />
            <NavLink
              to="/messages"
              className={({ isActive }) =>
                isActive &&
                activeOverlay !== 'search' &&
                activeOverlay !== 'notifications' &&
                activeOverlay !== 'create'
                  ? styles.navButtonActive
                  : styles.navButton
              }
              onClick={() => setActiveOverlay(null)}>
              Messages
            </NavLink>
          </div>
          <div className={styles.navPage}>
            <img src={notifications} alt="notificPic" />
            <button
              onClick={() => toggleOverlay('notifications')}
              className={
                activeOverlay === 'notifications' ? styles.navButtonActive : styles.navButton
              }>
              Notifications
            </button>
          </div>
          <div className={styles.navPage}>
            <img src={create} alt="createPic" />
            <button
              onClick={() => toggleOverlay('create')}
              className={activeOverlay === 'create' ? styles.navButtonActive : styles.navButton}>
              Create
            </button>
          </div>
        </div>
        <div className={styles.navPage}>
          {me?.image ? (
            <img src={me?.image} alt="profilePic" />
          ) : (
            <img className={styles.regularAvatar} src={regularProfilPic} alt="regularProfilPic" />
          )}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive &&
              activeOverlay !== 'search' &&
              activeOverlay !== 'notifications' &&
              activeOverlay !== 'create'
                ? styles.navButtonActive
                : styles.navButton
            }
            onClick={() => setActiveOverlay(null)}>
            Profile
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
