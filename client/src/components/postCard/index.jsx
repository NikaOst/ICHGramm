import likeImg from '../../assets/icons/likeImg.svg';
import commentImg from '../../assets/icons/commentImg.svg';
import styles from './postCard.module.css';
import regularProfilPic from '../../assets/icons/userRegular.svg';

function PostCard({ post }) {
  return (
    <div className={styles.card}>
      {console.log(post.post.title)}
      <div className={styles.mainPostData}>
        <div className={styles.headerPost}>
          {post.post.author?.image ? (
            <img src={post.author?.image} alt="profilePic" />
          ) : (
            <img className={styles.regularAvatar} src={regularProfilPic} alt="regularProfilPic" />
          )}
          <span className={styles.author}>{post.post.author?.username} </span>
          <span className={styles.createPost}>• wek • </span>
          <button>follow</button>
        </div>
        <img src={post.post.image} alt="PostImg" />
        <div className={styles.likeCommentBar}>
          <img src={likeImg} alt="likeImg" />
          <img src={commentImg} alt="commentImg" />
        </div>
        <span className={styles.likesSpan}>{post.post.likes} likes</span>
      </div>
      <div className={styles.mainPostData}>
        <span className={styles.postTitle}>{post.post.title}</span>
        <div className={styles.postBody}>
          <span>{post.post.body}... </span>
          <button>more</button>
        </div>
        <span className={styles.commentsSpan}>All comments ({post.comments.length})</span>
      </div>
    </div>
  );
}
export default PostCard;
