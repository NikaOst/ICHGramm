import styles from './search.module.css';
import clearSearch from '../../assets/icons/clearSearch.svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../redux/slices/usersSlice.js';
import { useNavigate } from 'react-router-dom';
import regularProfilPic from '../../assets/icons/userRegular.svg';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.searchResults);

  const clearInput = () => {
    setSearchValue('');
  };

  const handelSearch = (value) => {
    setSearchValue(value);
    dispatch(searchUsers({ username: value, name: value }));
  };

  const goToAuthorProfile = (userId) => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <div className={styles.mainSearchBox}>
      <span className={styles.barTitle}>Search</span>
      <div className={styles.searchInputWrap}>
        <img src={clearSearch} alt="clearSearchImg" onClick={clearInput} />
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => handelSearch(e.target.value)}
        />
      </div>
      {searchValue && (
        <div className={styles.usersContainer}>
          {/* <span className={styles.recentTitle}>Recent</span> */}
          {users?.map((user, id) => {
            return (
              <div key={id} className={styles.userContainer}>
                {user?.image ? (
                  <div className={styles.avatarWrap}>
                    <img
                      onClick={() => goToAuthorProfile(user._id)}
                      src={`${import.meta.env.VITE_BASE_URL}${user?.image}`}
                      alt="userPic"
                    />
                  </div>
                ) : (
                  <img
                    className={styles.regularAvatar}
                    src={regularProfilPic}
                    alt="regularProfilPic"
                    onClick={() => goToAuthorProfile(user._id)}
                  />
                )}

                <div className={styles.userData} onClick={() => goToAuthorProfile(user._id)}>
                  <span>{user.name}</span>
                  <span>{user.username}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default SearchBar;
