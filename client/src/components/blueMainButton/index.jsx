import styles from './button.module.css';

function TargetButton({ text, type, bgColor, color, onClick, padding }) {
  if (type === 'submit') {
    return (
      <button
        style={{ backgroundColor: bgColor, color, padding }}
        className={styles.submitBtn}
        type="submit">
        {text}
      </button>
    );
  } else
    return (
      <button
        style={{ backgroundColor: bgColor, color, padding }}
        className={styles.textBtn}
        onClick={onClick}
        type="button">
        {text}
      </button>
    );
}
export default TargetButton;
