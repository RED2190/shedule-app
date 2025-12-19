import Header from './components/Header';
import Footer from './components/Footer';

import MainPage from './pages/MainPage/'
import ProfilePage from './pages/ProfilePage'
import ErrorPage from './pages/ErrorPage'
import DashboardPage from './pages/DashboardPage';
import ShedulePage from './pages/ShedulePage';
import ThemesPage from './pages/ThemesPage';
import DebugPage from './pages/DebugPage';

import { useDispatch } from 'react-redux';
import { checkAuth, fetchUserProfile } from './redux/slices/authSlice';

import React from "react";

import { Routes, Route } from 'react-router-dom'
import FilesPage from './pages/FilesPage';

function App() {
  const dispatch = useDispatch()  
  React.useEffect(()=>{
    dispatch(checkAuth())
  }, [])

  return (
      <>
        <Header/>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/shedule" element={<ShedulePage/>} />
          <Route path="/themes" element={<ThemesPage/>} />
          <Route path="/test" element={<DebugPage/>} />
          <Route path="/files" element={<FilesPage/>} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
        <Footer/>
      </>
  );
}

export default App;
