import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/nav';
import Footer from './components/footer';
import NotFoundPage from './pages/notFoundPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/singupPage';
import HomePage from './pages/homePage';
import CreatePostPage from './pages/createPostPage';
import EditPostPage from './pages/editProfilePage';
import ExplorePage from './pages/explorePage';
import PostPage from './pages/postPage';
import ProfilePage from './pages/profilePage';
import SearchPage from './pages/searchPage';
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="mainAppPage">
      <div className="mainPageNav">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/edit-profile" element={<EditPostPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search-profile" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
