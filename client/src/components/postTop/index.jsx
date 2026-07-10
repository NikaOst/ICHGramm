import styles from './postHeader.module.css';
import { useDispatch } from 'react-redux';
import { followUser } from '../../redux/slices/usersSlice';

function PostHeader({ type, acc_name, acc_img, authorId, me, onOpenMenu }) {
  const dispatch = useDispatch();

  const handleFollow = () => {
    if (authorId) {
      dispatch(followUser(authorId));
    }
  };

  const isFollowing = (me?.subscribes || []).some((sub) => {
    const subId = typeof sub === 'string' ? sub : sub?._id;
    return String(subId) === String(authorId);
  });

  return (
    <div className={styles.mainHeaderPost}>
      <div className={styles.mainHeaderPostText}>
        <div className={styles.imageWraper}>
          <img src={acc_img} alt="accImg" />
        </div>

        <span>{acc_name}</span>
        {type !== 'my_acc' && (
          <div className={styles.subscribeBox}>
            <span>•</span>
            <button onClick={handleFollow}>{isFollowing ? 'unfollow' : 'follow'}</button>
          </div>
        )}
      </div>

      <div className={styles.menuPost} onClick={onOpenMenu}>
        {type === 'my_acc' && <span>•••</span>}
      </div>
    </div>
  );
}
export default PostHeader;
