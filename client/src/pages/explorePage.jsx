import PostsGrid from '../components/postsGrid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/slices/postsSlice';
import LoadingBar from '../components/loadingBar';

function ExplorePage({ onPostClick, onOpenMenu }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (status === null) {
      dispatch(getAllPosts());
    }
  }, [status, dispatch]);

  if (status === null || status === 'loading') return <LoadingBar />;

  return (
    <div>
      <PostsGrid
        type="exploreScreen"
        posts={posts}
        onPostClick={onPostClick}
        onOpenMenu={onOpenMenu}
      />
    </div>
  );
}
export default ExplorePage;
