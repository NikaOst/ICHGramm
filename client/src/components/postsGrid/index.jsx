import PostCard from '../postCard';
import styles from './postsGrid.module.css';

function PostsGrid({ type, posts }) {
  return type === 'mainScreen' ? (
    <div className={styles.postsContainer}>
      <div className={styles.gridBox}>
        {posts?.map((post) => (
          <div key={post._id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div />
  );
}

export default PostsGrid;
