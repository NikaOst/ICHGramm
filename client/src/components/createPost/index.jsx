import styles from './createPost.module.css';
import uploadPic from '../../assets/images/uploadPic.svg';
import smile from '../../assets/icons/smile.svg';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import regularProfilPic from '../../assets/icons/userRegular.svg';
import { useState, useRef } from 'react';
import { createPost, getAllPosts } from '../../redux/slices/postsSlice';
import { getMe } from '../../redux/slices/usersSlice';

function CreatePost({ setActiveOverlay }) {
  const { register, handleSubmit, watch } = useForm({ mode: 'onChange' });

  const [selectedImage, setSelectedImage] = useState(null);

  const aboutValue = watch('body', '');
  const me = useSelector((state) => state.users.me);
  const dispatch = useDispatch();

  const onFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragLeave = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0] || null;
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
    }
  };

  const formSubmit = async (data) => {
    if (!selectedImage) return;

    await dispatch(createPost({ body: data.body, image: selectedImage })).unwrap();
    await dispatch(getAllPosts()).unwrap();
    await dispatch(getMe()).unwrap();
    setActiveOverlay(null);
  };

  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)} className={styles.createPostContainer}>
      <div className={styles.createPostHeader}>
        <span>Create new post</span>
        <button type="submit">Share</button>
      </div>
      <div className={styles.createPostBody}>
        <div
          className={styles.uploadPic}
          onClick={openFilePicker}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}>
          {selectedImage ? (
            <span>{selectedImage.name}</span>
          ) : (
            <img src={uploadPic} alt="uploadPic" />
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className={styles.hiddenInput}
          />
        </div>
        <div className={styles.createPostTextContainer}>
          <div className={styles.userDataBox}>
            {me?.image ? (
              <div className={styles.avatarWrap}>
                <img src={`${import.meta.env.VITE_BASE_URL}${me?.image}`} alt="avatar" />
              </div>
            ) : (
              <img className={styles.regularAvatar} src={regularProfilPic} alt="regularProfilPic" />
            )}
            <span>{me?.username}</span>
          </div>
          <div className={styles.textareaBox}>
            <img src={smile} alt="emojiPic" />
            <div className={styles.aboutWrap}>
              <textarea
                className={styles.aboutInput}
                {...register('body', {
                  required: 'Body is required',
                  maxLength: 2200,
                })}
                maxLength={2200}
                rows={5}
              />
              <span className={styles.counterInside}>{(aboutValue || '').length}/2 200</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
export default CreatePost;
