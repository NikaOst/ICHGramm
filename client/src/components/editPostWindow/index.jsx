import styles from './menuPost.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../../redux/slices/postsSlice.js';
import { useLocation } from 'react-router-dom';
import { getMe } from '../../redux/slices/usersSlice';
import { useState } from 'react';

function MenuPostWindow({ post, onCancel, onCloseAllWindows }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCopiedLink, setIsCopiedLink] = useState(false);

  const handelDelete = async () => {
    const postId = post?._id;
    if (!postId) return;

    const result = await dispatch(deletePost({ id: postId }));
    if (deletePost.fulfilled.match(result)) {
      await dispatch(getMe()).unwrap();
      onCloseAllWindows();
      navigate(location, { replace: true });
    }
  };

  const handelGoToPosts = () => {
    onCloseAllWindows();
    navigate(`profile/${post?.author?._id}`, { replace: true });
  };

  const handleCopyLink = async () => {
    const fullUrl = window.location.origin + location.pathname + location.search + location.hash;
    await navigator.clipboard.writeText(fullUrl);
    setIsCopiedLink(true);
  };

  return (
    <div className={styles.mainMenuContainer}>
      <div>
        <span onClick={handelDelete} className={styles.deleteSpan}>
          Delete
        </span>
      </div>
      <div>
        <span className={styles.editSpan}>Edit</span>
      </div>
      <div>
        <span onClick={handelGoToPosts} className={styles.goToPostsSpan}>
          Go to post
        </span>
      </div>
      <div>
        <span
          onClick={handleCopyLink}
          className={isCopiedLink ? styles.copyLinkSpanCopied : styles.copyLinkSpan}>
          {isCopiedLink ? 'Copied!' : 'Copy link'}
        </span>
      </div>
      <div onClick={onCancel}>
        <span className={styles.cancelSpan}>Cancel</span>
      </div>
    </div>
  );
}

export default MenuPostWindow;
