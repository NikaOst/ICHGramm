import { Link } from 'react-router-dom';
import styles from './formFooter.module.css';

function FormFooter({ text, blueText, to }) {
  return (
    <div className={styles.footerFormBox}>
      <span>{text}</span>{' '}
      <Link className={styles.footerLink} to={to}>
        {blueText}
      </Link>
    </div>
  );
}

export default FormFooter;
