import styles from './footer.module.css';
import { NavLink } from 'react-router-dom';

function Footer({ setActiveOverlay }) {
  const toggleOverlay = (name) => {
    setActiveOverlay((prev) => (prev === name ? null : name));
  };

  return (
    <div className={styles.footerMainBox}>
      <div className={styles.footerMenu}>
        <NavLink
          onClick={() => setActiveOverlay(null)}
          to="/"
          end
          className={styles.footerMenuOption}>
          Home
        </NavLink>
        <button onClick={() => toggleOverlay('search')} className={styles.footerMenuOption}>
          Search
        </button>
        <NavLink
          onClick={() => setActiveOverlay(null)}
          to="/explore"
          end
          className={styles.footerMenuOption}>
          Explore
        </NavLink>
        <NavLink
          onClick={() => setActiveOverlay(null)}
          to="/messages"
          className={styles.footerMenuOption}>
          Messages
        </NavLink>
        <button onClick={() => toggleOverlay('notifications')} className={styles.footerMenuOption}>
          Notificaitons
        </button>
        <button onClick={() => toggleOverlay('create')} className={styles.footerMenuOption}>
          Create
        </button>
      </div>
      <span>© 2026 ICHgram</span>
    </div>
  );
}
export default Footer;
