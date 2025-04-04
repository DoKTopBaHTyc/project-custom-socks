import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import axiosInstance, { setAccessToken } from './api/axiosInstance';
import Layout from './components/Layout';
import CartPage from './components/pages/CartPage';
import FavoritesPage from './components/pages/FavoritesPage';
import GenaPage from './components/pages/GenaPage';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import SignUpPage from './components/pages/SignUpPage';
import DefaultErrorPage from './components/pages/DefaultErrorPage';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const signupHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (data.password !== data.repeatPassword) {
      alert('Пароли не совпадают');
      return;
    }

    const serverData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axiosInstance.post('/auth/signup', serverData);
      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setAccessToken(response.data.accessToken);
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert('Ошибка при регистрации');
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const data = Object.fromEntries(new FormData(e.target));
      const res = await axiosInstance.post('/auth/login', data);
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setAccessToken(res.data.accessToken);
    } catch (error) {
      console.error('Ошибка при входе:', error);
      alert('Ошибка при входе');
    }
  };

  const logoutHandler = async () => {
    await axiosInstance.get('/auth/logout');
    setUser(null);
    localStorage.removeItem('user');
    setAccessToken('');
  };

  useEffect(() => {
    axiosInstance
      .get('/tokens/refresh')
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem('user');
      });
  }, []);

  return (
    <BrowserRouter>
      <Layout logoutHandler={logoutHandler} user={user}>
        <Routes>
          {/* Публичные маршруты */}
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <LoginPage loginHandler={loginHandler} user={user} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <SignUpPage signupHandler={signupHandler} user={user} />
              )
            }
          />
          <Route path="/" element={<MainPage />} />

          {/* Защищенные маршруты */}

          <Route
            path="/gensock"
            element={user ? <GenaPage user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/favorites"
            element={user ? <FavoritesPage user={user} /> : <Navigate to="/login" />}
          />
          <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />

          {/* Редирект с неизвестных маршрутов */}
          <Route path="/errorPage" element={<DefaultErrorPage />} />

          <Route path="*" element={<Navigate to="/errorPage" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
