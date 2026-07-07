import PostsGrid from '../components/postsGrid';
import styles from '../styles/explore.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/slices/postsSlice';

function ExplorePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (status === null) {
      dispatch(getAllPosts());
    }
  }, [status, dispatch]);

  return (
    <div className={styles.mainExploreBox}>
      <PostsGrid type="exploreScreen" posts={posts} />
    </div>
  );
}
export default ExplorePage;
