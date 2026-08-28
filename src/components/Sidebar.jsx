import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  DashboardOutlined,
  SolutionOutlined,
  UsergroupAddOutlined,
  ApartmentOutlined,
  RobotOutlined,
  BarChartOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: <DashboardOutlined /> },
    { label: 'Job Listings', path: '/jobs', icon: <SolutionOutlined /> },
    { label: 'Candidates', path: '/candidates', icon: <UsergroupAddOutlined /> },
    { label: 'Applicant Pipeline', path: '/pipeline', icon: <ApartmentOutlined /> },
    { label: 'AI Resume Analysis', path: '/ai-analysis', icon: <RobotOutlined /> },
    { label: 'Analytics & Insights', path: '/analytics', icon: <BarChartOutlined /> },
    { label: 'Profile & Settings', path: '/profile', icon: <SettingOutlined /> }
  ];

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      background: '#0f172a',
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 110,
      borderRight: '1px solid #1e293b'
    }}>
      {/* Brand Logo */}
      <div style={{
        padding: '24px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid #1e293b'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '20px',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
        }}>
          H
        </div>
        <div>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 800,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.1
          }}>
            HireMind <span style={{ color: '#818cf8' }}>AI</span>
          </h2>
          <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Recruitment OS
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: '20px 12px', overflowY: 'auto' }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          color: '#64748b',
          padding: '0 12px 10px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Main Navigation
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => isActive ? 'active-nav-link' : ''}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  background: isActive ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)' : 'transparent',
                  borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.2s ease'
                })}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Role Card at bottom */}
      <div style={{
        padding: '16px',
        margin: '12px',
        borderRadius: '12px',
        background: '#1e293b',
        border: '1px solid #334155'
      }}>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Active Session</div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc' }}>{user.name}</div>
        <div style={{ fontSize: '11px', color: '#818cf8' }}>Role: {user.role.toUpperCase()}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
