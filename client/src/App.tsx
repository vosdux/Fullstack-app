import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import MainLayout from './components/Layout';

const App: React.FC = () => {
  const { accessToken, refreshToken, expiredIn, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!accessToken;
  const routes = useRoutes(isAuthenticated, userId);

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, expiredIn, login, logout, userId }}>
      <Router>
        <MainLayout isAuthenticated={isAuthenticated}>
          {routes}
        </MainLayout>

      </Router>
    </AuthContext.Provider>
  );
}

export default App;
