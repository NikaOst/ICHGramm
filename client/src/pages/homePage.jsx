import PostsGrid from '../components/postsGrid';
import styles from '../styles/home.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/slices/postsSlice';
import NoPostsBar from '../components/noAnyPostsBar';
import LoadingBar from '../components/loadingBar';

function HomePage({ onPostClick, onOpenMenu }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  // const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (status === null) {
      dispatch(getAllPosts());
    }
  }, [status, dispatch]);

  if (status === null || status === 'loading') return <LoadingBar />;
  // if (status === 'failed') return <div>Failed to load posts: {String(error || '')}</div>;

  return (
    <div className={styles.mainHomeBox}>
      <PostsGrid
        type="mainScreen"
        posts={posts}
        onPostClick={onPostClick}
        onOpenMenu={onOpenMenu}
      />
      <div className={styles.postsContainer}>
        <NoPostsBar />
      </div>
    </div>
  );
}
export default HomePage;
