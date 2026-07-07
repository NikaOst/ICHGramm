import TargetButton from '../components/blueMainButton';
import styles from '../styles/editProfile.module.css';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useMemo, useEffect } from 'react';
import { updateMe } from '../redux/slices/usersSlice.js';
import linkPic from '../assets/icons/link.svg';
import regularProfilPic from '../assets/icons/userRegular.svg';

function EditPostPage() {
  const dispatch = useDispatch();

  const me = useSelector((state) => state.users.me);

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const { register, handleSubmit, watch } = useForm({ mode: 'onChange' });

  const fileInputRef = useRef(null);

  const handleUploadNewPhoto = () => {
    fileInputRef.current?.click();
  };

  const onAvatarChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedAvatar(file);
  };

  const aboutValue = watch('about', me?.about || '');

  const formSubmit = async (data) => {
    await dispatch(
      updateMe({
        data,
        selectedAvatar,
      }),
    );
  };

  const selectedAvatarUrl = useMemo(() => {
    return selectedAvatar ? URL.createObjectURL(selectedAvatar) : '';
  }, [selectedAvatar]);

  useEffect(() => {
    return () => {
      if (selectedAvatarUrl) URL.revokeObjectURL(selectedAvatarUrl);
    };
  }, [selectedAvatarUrl]);

  return (
    <div className={styles.mainEditPage}>
      <span className={styles.titleEditPage}>Edit profile</span>
      <div className={styles.previewContainer}>
        <div className={styles.photoUserData}>
          {me?.image ? (
            <div className={styles.avatarWrap}>
              <img
                src={selectedAvatarUrl || `${import.meta.env.VITE_BASE_URL}${me?.image}`}
                alt="avatar"
              />
            </div>
          ) : (
            <img className={styles.regularAvatar} src={regularProfilPic} alt="regularProfilPic" />
          )}
          <div>
            <span>{me?.username}</span>
            <span>{me?.about}</span>
          </div>
        </div>
        <div>
          <TargetButton
            type="button"
            text="New photo"
            bgColor="#0095F6"
            color="#FFFFFF"
            onClick={handleUploadNewPhoto}
            padding="0.46rem 1rem"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onAvatarChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
        <div>
          <span className={styles.inputTitle}>Username</span>
          <input
            className={styles.formInput}
            {...register('username')}
            type="text"
            defaultValue={me?.username}
          />
        </div>
        <div>
          <span className={styles.inputTitle}>Website</span>
          <div className={styles.websiteInputWrap}>
            <img src={linkPic} alt="linkPic" />
            <input
              className={`${styles.formInput} ${styles.websiteInput}`}
              {...register('website')}
              type="text"
              defaultValue={me?.website}
            />
          </div>
        </div>
        <div className={styles.aboutField}>
          <span className={styles.inputTitle}>About</span>
          <div className={styles.aboutInputWrap}>
            <textarea
              className={styles.aboutInput}
              {...register('about', { maxLength: 150 })}
              defaultValue={me?.about}
              maxLength={150}
              rows={5}
            />
            <span className={styles.counterInside}>{(aboutValue || '').length}/150</span>
          </div>
        </div>

        <TargetButton
          type="submit"
          text="Save"
          bgColor="#0095F6"
          color="#FFFFFF"
          padding="0.46rem 5.81rem"
        />
      </form>
    </div>
  );
}
export default EditPostPage;
