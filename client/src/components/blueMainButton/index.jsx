import styles from './button.module.css';

function TargetButton({ text, type }) {
  if (type === 'submit') {
    return (
      <button className={styles.submitBtn} type="submit">
        {text}
      </button>
    );
  } else
    return (
      <button className={styles.textBtn} type="button">
        {text}
      </button>
    );
}
export default TargetButton;
