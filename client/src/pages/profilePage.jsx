import { useSelector, useDispatch } from 'react-redux';
import link from '../assets/icons/link.svg';
import PostsGrid from '../components/postsGrid';
import styles from '../styles/profile.module.css';
import TargetButton from '../components/blueMainButton';
import { useEffect } from 'react';
import { getUserById } from '../redux/slices/usersSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { getMe, followUser } from '../redux/slices/usersSlice';
import regularProfilPic from '../assets/icons/userRegular.svg';

function ProfilePage({ onPostClick, onOpenMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const me = useSelector((state) => state.users.me);
  const myPosts = useSelector((state) => state.users.myPosts);
  const user = useSelector((state) => state.users.user);
  const userPosts = useSelector((state) => state.users.userPosts);

  const profileUser = id ? user : me;
  const profilePosts = id ? userPosts : myPosts;

  useEffect(() => {
    dispatch(getMe());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleFollow = () => {
    if (id) {
      dispatch(followUser(id)).then(() => dispatch(getUserById(id)));
    }
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const isFollowing = (me?.subscribes || []).some((sub) => {
    const subId = typeof sub === 'string' ? sub : sub?._id;
    return String(subId) === String(id);
  });

  return (
    <div className={styles.profileMainBox}>
      <div className={styles.mainUserDataContainer}>
        {profileUser?.image ? (
          <div className={styles.userDataImageContainer}>
            <img src={`${import.meta.env.VITE_BASE_URL}${profileUser?.image}`} alt="avatar" />
          </div>
        ) : (
          <img className={styles.regularAvatar} src={regularProfilPic} alt="regularProfilPic" />
        )}

        <div className={styles.userDataContainer}>
          <div className={styles.headerProfil}>
            <span>{profileUser?.username}</span>
            {id && id !== me?._id ? (
              <div>
                <TargetButton
                  onClick={handleFollow}
                  type="button"
                  text={isFollowing ? 'Unfollow' : 'Follow'}
                  bgColor="#0095F6"
                  color="#FFFFFF"
                  padding="0.46rem 3rem"
                />
                <TargetButton
                  type="button"
                  text="Message"
                  bgColor="#EFEFEF"
                  color="#000000"
                  padding="0.46rem 4rem"
                />
              </div>
            ) : (
              <div>
                <TargetButton
                  type="button"
                  text="Edit profile"
                  bgColor="#EFEFEF"
                  color="#000000"
                  padding="0.46rem 3rem"
                  onClick={handleEditProfile}
                />
                <TargetButton
                  type="button"
                  text="Logout"
                  bgColor="#EFEFEF"
                  color="#000000"
                  padding="0.46rem 1.5rem"
                  onClick={handleLogout}
                />
              </div>
            )}
          </div>
          <div className={styles.userData}>
            <span>
              <strong>{profilePosts?.length ?? 0}</strong> posts
            </span>
            <span>
              <strong>{profileUser?.subscribers?.length}</strong> followers
            </span>
            <span>
              <strong>{profileUser?.subscribes?.length}</strong> following
            </span>
          </div>
          {profileUser?.about && (
            <div className={styles.aboutBox}>
              <span>{profileUser?.about}... </span>
              <button>more</button>
            </div>
          )}

          {profileUser?.website && (
            <div className={styles.websiteBox}>
              <img src={link} alt="linkImg" />
              <a href="">{profileUser?.website}</a>
            </div>
          )}
        </div>
      </div>
      {profilePosts.length ? (
        <div className={styles.mainExploreBox}>
          <PostsGrid
            type="exploreScreen"
            posts={profilePosts}
            onPostClick={onPostClick}
            onOpenMenu={onOpenMenu}
          />
        </div>
      ) : (
        <div className={styles.noPostsBox}>
          <span>No posts yet</span>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
