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
    <div className={styles.gridPicBox}>
      {posts?.map((post) => (
        <div className={styles.postPic} key={post._id}>
          <img
            src={`${import.meta.env.VITE_BASE_URL}${post?.post?.image || post?.image}`}
            alt="postImg"
          />
        </div>
      ))}
    </div>
  );
}

export default PostsGrid;
