import PostsGrid from '../components/postsGrid';
import styles from '../styles/home.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/slices/postsSlice';
import NoPostsBar from '../components/noAnyPostsBar';

function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (status === null) {
      dispatch(getAllPosts());
    }
  }, [status, dispatch]);

  return (
    <div className={styles.mainHomeBox}>
      <PostsGrid type="mainScreen" posts={posts} />
      <div className={styles.postsContainer}>
        <NoPostsBar />
      </div>
    </div>
  );
}
export default HomePage;
