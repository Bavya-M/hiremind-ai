import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes/AppRoutes';
import './styles/index.css';

const AppContent = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Navbar />
        <main style={{ flex: 1, backgroundColor: '#f8fafc' }}>
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6366f1',
          borderRadius: 8,
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        }
      }}
    >
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
