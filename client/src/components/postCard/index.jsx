import likeImg from '../../assets/icons/likeImg.svg';
import commentImg from '../../assets/icons/commentImg.svg';
import styles from './postCard.module.css';
import regularProfilPic from '../../assets/icons/userRegular.svg';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { followUser } from '../../redux/slices/usersSlice';
import filledLike from '../../assets/icons/filledLike.svg';
import { toggleLike } from '../../redux/slices/likesSlice';

function PostCard({ post, onPostClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const me = useSelector((state) => state.users.me);

  const authorId = post?.author?._id;
  const postId = post?._id;
  const meId = me?._id;

  const likeState = useSelector((state) =>
    postId ? state.likes.byPostId[String(postId)] : undefined,
  );

  const commentsFromStore = useSelector((state) =>
    postId ? state.comments.byPostId[String(postId)] : undefined,
  );

  const comments = commentsFromStore ?? post?.comments ?? [];

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

  const handleToggleLike = () => {
    if (!postId) return;
    dispatch(toggleLike(postId));
  };

  const likesFromPost = post?.likes || [];
  const likedByMeFromPost = likesFromPost.some((likeId) => String(likeId) === String(meId));

  const isLiked = likeState?.liked ?? likedByMeFromPost;
  const likesCount = likeState?.likesCount ?? likesFromPost.length;

  return (
    <div className={styles.card}>
      <div className={styles.mainPostData}>
        <div className={styles.headerPost}>
          {post?.author?.image || me?.image ? (
            <div className={styles.avatarWrap}>
              <img
                src={`${import.meta.env.VITE_BASE_URL}${post?.author?.image || me?.image}`}
                alt="profilePic"
                onClick={goToAuthorProfile}
              />
            </div>
          ) : (
            <img
              className={styles.regularAvatar}
              src={regularProfilPic}
              alt="regularProfilPic"
              onClick={goToAuthorProfile}
            />
          )}

          <span className={styles.author} onClick={goToAuthorProfile}>
            {post?.author?.username}
          </span>
          <span className={styles.createPost}>• {post?.date} • </span>
          {me?.username !== post?.author?.username && (
            <button onClick={handleFollow}>{isFollowing ? 'unfollow' : 'follow'}</button>
          )}
        </div>
        <div className={styles.postImgContaier}>
          <img src={`${import.meta.env.VITE_BASE_URL}${post?.image}`} alt="PostImg" />
        </div>
        <div className={styles.likeCommentBar}>
          <img src={isLiked ? filledLike : likeImg} alt="likeImg" onClick={handleToggleLike} />
          <img src={commentImg} alt="commentImg" onClick={() => onPostClick?.(post)} />
        </div>
        <span className={styles.likesSpan}>{likesCount} likes</span>
      </div>
      <div className={styles.mainPostData}>
        <div className={styles.postBody}>
          <span>{post?.body}... </span>
          <button>more</button>
        </div>
        <span className={styles.commentsSpan}>{comments?.length ?? 0} comments</span>
      </div>
    </div>
  );
}
export default PostCard;
