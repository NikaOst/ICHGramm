import PostHeader from '../postTop';
import styles from './postHeader.module.css';
import likeImg from '../../assets/icons/likeImg.svg';
import smile from '../../assets/icons/smile.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createComment, setCommentsForPost } from '../../redux/slices/commentsSlice';
import filledLike from '../../assets/icons/filledLike.svg';
import { toggleLike } from '../../redux/slices/likesSlice';
import commentImg from '../../assets/icons/commentImg.svg';
import { useRef } from 'react';
import regularProfilPic from '../../assets/icons/userRegular.svg';

function Post({ post, onOpenMenu }) {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.users.me);
  const commentRef = useRef(null);

  const handleClick = () => {
    commentRef.current?.focus();
  };

  const postId = post?._id;
  const meId = me?._id;

  const commentsFromStore = useSelector((state) =>
    postId ? state.comments.byPostId[String(postId)] : undefined,
  );
  const likeState = useSelector((state) =>
    postId ? state.likes.byPostId[String(postId)] : undefined,
  );

  const comments = commentsFromStore ?? post?.comments ?? [];

  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (!postId) return;

    if (commentsFromStore === undefined) {
      dispatch(setCommentsForPost({ postId, comments: post?.comments ?? [] }));
    }
  }, [dispatch, postId, commentsFromStore, post?.comments]);

  const isSending = useSelector((state) => state.comments.status === 'loading');

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    const body = commentText.trim();
    if (!body || !postId) return;

    const resultAction = await dispatch(createComment({ postId, body }));
    if (createComment.fulfilled.match(resultAction)) {
      setCommentText('');
    }
  };

  const handleToggleLike = () => {
    if (!postId) return;
    dispatch(toggleLike(postId));
  };

  const likesFromPost = post?.likes || [];
  const likedByMeFromPost = likesFromPost.some((likeId) => String(likeId) === String(meId));

  const isLiked = likeState?.liked ?? likedByMeFromPost;
  const likesCount = likeState?.likesCount ?? likesFromPost.length;

  return (
    <div className={styles.mainPostContainer}>
      <div className={styles.leftSideImg}>
        <img src={`${import.meta.env.VITE_BASE_URL}${post?.image}`} alt="postImg" />
      </div>
      <div className={styles.rightSidePost}>
        <PostHeader
          type={me?._id === post?.author?._id ? 'my_acc' : 'not_my_acc'}
          acc_name={post?.author?.username || me?.username}
          acc_img={
            post?.author?.image || me?.image
              ? `${import.meta.env.VITE_BASE_URL}${post?.author?.image || me?.image}`
              : regularProfilPic
          }
          authorId={post?.author?._id}
          me={me}
          onOpenMenu={onOpenMenu}
        />
        <div className={styles.postMainContainer}>
          <div className={styles.dataPost}>
            <div className={styles.postTextContainer}>
              <div className={styles.imageWraper}>
                {post?.author?.image || me?.image ? (
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${post?.author?.image || me?.image}`}
                    alt="postImg"
                  />
                ) : (
                  <img
                    className={styles.regularAvatar}
                    src={regularProfilPic}
                    alt="regularProfilPic"
                  />
                )}
              </div>

              <div className={styles.post}>
                <span className={styles.postBody}>
                  <span className={styles.authorUsername}>
                    {post?.author?.username || me?.username}{' '}
                  </span>
                  {post?.body}
                </span>
                <span className={styles.timeCreate}>{post?.date}</span>
              </div>
            </div>
            <div className={styles.commentsContainer}>
              {comments.length ? (
                comments.map((comment) => (
                  <div key={comment._id}>
                    <div className={styles.wrapCommentImg}>
                      {comment?.author?.image || me?.image ? (
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}${comment?.author?.image || me?.image}`}
                          alt="commentAvatar"
                        />
                      ) : (
                        <img
                          className={styles.regularAvatar}
                          src={regularProfilPic}
                          alt="regularProfilPic"
                        />
                      )}
                    </div>
                    <div className={styles.commentAuthorData}>
                      <span>{comment?.author?.username || 'user'} </span>
                      <span>{comment?.body}</span>
                    </div>
                  </div>
                ))
              ) : (
                <span className={styles.noComments}>No comments yet</span>
              )}
            </div>
          </div>

          <div className={styles.likePost}>
            <div>
              <img src={isLiked ? filledLike : likeImg} alt="likeImg" onClick={handleToggleLike} />
              <img src={commentImg} alt="commentImg" onClick={handleClick} />
            </div>

            <div className={styles.likesText}>
              <span>{likesCount ?? 0} likes</span>
              <span>{post?.date}</span>
            </div>
          </div>
        </div>

        <form className={styles.sendCommentContainer} onSubmit={handleSubmitComment}>
          <img src={smile} alt="emojiPic" />
          <div className={styles.commentWrap}>
            <input
              className={styles.commentInput}
              maxLength={100}
              placeholder="Add comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              ref={commentRef}
            />
          </div>
          <button type="submit" disabled={!commentText.trim() || isSending}>
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
export default Post;
