import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/nav';
import Footer from './components/footer';
import NotFoundPage from './pages/notFoundPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/singupPage';
import HomePage from './pages/homePage';
import EditPostPage from './pages/editProfilePage';
import ExplorePage from './pages/explorePage';
import ProfilePage from './pages/profilePage';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getMe } from './redux/slices/usersSlice';
import MessagePage from './pages/messagePage';
import Overlay from './components/overlay';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const me = useSelector((state) => state.users.me);
  const [activeOverlay, setActiveOverlay] = useState(null);

  useEffect(() => {
    if (token && !me) {
      dispatch(getMe());
    }
  }, [token, me, dispatch]);

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
      <Navbar activeOverlay={activeOverlay} setActiveOverlay={setActiveOverlay} />
      <div className="mainPageNav">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="/edit-profile" element={<EditPostPage />} />
          <Route path="/messages" element={<MessagePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer setActiveOverlay={setActiveOverlay} />
      {activeOverlay && (
        <Overlay activeOverlay={activeOverlay} setActiveOverlay={setActiveOverlay} />
      )}
    </div>
  );
}

export default App;
