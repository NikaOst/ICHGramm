import styles from './search.module.css';

function SearchBar() {
  return (
    <div className={styles.mainSearchBox}>
      <span className={styles.barTitle}>Search</span>
      <input className={styles.searchInput} type="text" placeholder="Search" />
      <div>
        {/* массив найденных пользователей */}
        {/* <img src="" alt="" />
        <span></span> */}
      </div>
    </div>
  );
}
export default SearchBar;
