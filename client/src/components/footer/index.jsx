import styles from './footer.module.css';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div className={styles.footerMainBox}>
      <div className={styles.footerMenu}>
        <NavLink to="/" end className={styles.footerMenuOption}>
          Home
        </NavLink>
        <button className={styles.footerMenuOption}>Search</button>
        <NavLink to="/explore" end className={styles.footerMenuOption}>
          Explore
        </NavLink>
        <NavLink to="/messages" className={styles.footerMenuOption}>
          Messages
        </NavLink>
        <button className={styles.footerMenuOption}>Notificaitons</button>
        <button className={styles.footerMenuOption}>Create</button>
      </div>
      <span>© 2024 ICHgram</span>
    </div>
  );
}
export default Footer;
