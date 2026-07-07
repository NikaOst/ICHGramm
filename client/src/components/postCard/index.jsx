import likeImg from '../../assets/icons/likeImg.svg';
import commentImg from '../../assets/icons/commentImg.svg';
import styles from './postCard.module.css';
import regularProfilPic from '../../assets/icons/userRegular.svg';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { followUser } from '../../redux/slices/usersSlice';
import filledLike from '../../assets/icons/filledLike.svg';
import { toggleLike } from '../../redux/slices/likesSlice';

function PostCard({ post }) {
  const me = useSelector((state) => state.users.me);
  const likeState = useSelector((state) => state.likes.byPostId[String(post.post._id)]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authorId = post.post.author?._id;

  const goToAuthorProfile = () => {
    if (authorId) {
      navigate(`/profile/${authorId}`);
    }
  };

  const handleFollow = () => {
    if (authorId) {
      dispatch(followUser(authorId));
    }
  };

  const isFollowing = (me?.subscribes || []).some((sub) => {
    const subId = typeof sub === 'string' ? sub : sub?._id;
    return String(subId) === String(authorId);
  });

  const isLiked = likeState?.liked ?? false;
  const likesCount = likeState?.likesCount ?? post.post.likes;

  const handleToggleLike = () => {
    dispatch(toggleLike(String(post.post._id)));
  };

  return (
    <div className={styles.card}>
      <div className={styles.mainPostData}>
        <div className={styles.headerPost}>
          <div className={styles.avatarWrap}>
            {post.post.author?.image ? (
              <img
                src={`${import.meta.env.VITE_BASE_URL}${post.post.author?.image}`}
                alt="profilePic"
                onClick={goToAuthorProfile}
              />
            ) : (
              <img
                className={styles.regularAvatar}
                src={regularProfilPic}
                alt="regularProfilPic"
                onClick={goToAuthorProfile}
              />
            )}
          </div>

          <span className={styles.author} onClick={goToAuthorProfile}>
            {post.post.author?.username}
          </span>
          <span className={styles.createPost}>• wek • </span>
          {me?.username !== post.post.author?.username && (
            <button onClick={handleFollow}>{isFollowing ? 'unfollow' : 'follow'}</button>
          )}
        </div>
        <img src={`${import.meta.env.VITE_BASE_URL}${post.post.image}`} alt="PostImg" />
        <div className={styles.likeCommentBar}>
          <img src={isLiked ? filledLike : likeImg} alt="likeImg" onClick={handleToggleLike} />
          <img src={commentImg} alt="commentImg" />
        </div>
        <span className={styles.likesSpan}>{likesCount} likes</span>
      </div>
      <div className={styles.mainPostData}>
        <div className={styles.postBody}>
          <span>{post.post.body}... </span>
          <button>more</button>
        </div>
        <span className={styles.commentsSpan}>{post.comments.length} comments</span>
      </div>
    </div>
  );
}
export default PostCard;
