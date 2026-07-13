import image from '../../assets/icons/noPostsImg.svg';
import styles from './noPosts.module.css';

function NoPostsBar() {
  return (
    <div className={styles.NoPostsBar}>
      <img src={image} alt="NoPostsImage" />
      <span>You've seen all the updates</span>
      <span>You have viewed all new publications</span>
    </div>
  );
}
export default NoPostsBar;
