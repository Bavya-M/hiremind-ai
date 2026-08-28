import React from 'react';
import { Input, Badge, Dropdown, Avatar, Tag, Button } from 'antd';
import { SearchOutlined, BellOutlined, UserOutlined, SwapOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, switchRole } = useAuth();
  const { searchQuery, setSearchQuery } = useApp();
  const navigate = useNavigate();

  const roleMenu = {
    items: [
      {
        key: 'recruiter',
        label: 'Recruiter View',
        onClick: () => switchRole('recruiter')
      },
      {
        key: 'admin',
        label: 'Admin View',
        onClick: () => switchRole('admin')
      },
      {
        key: 'candidate',
        label: 'Candidate View',
        onClick: () => switchRole('candidate')
      }
    ]
  };

  return (
    <header style={{
      height: '70px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #e2e8f0',
      padding: '0 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Search Input */}
      <div style={{ flex: 1, maxWidth: '420px' }}>
        <Input
          prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
          placeholder="Search jobs, candidates, skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
          style={{
            borderRadius: '10px',
            borderColor: '#e2e8f0',
            backgroundColor: '#f8fafc',
            padding: '8px 14px'
          }}
        />
      </div>

      {/* Quick Action & User Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button
          type="primary"
          icon={<ThunderboltOutlined />}
          onClick={() => navigate('/ai-analysis')}
          style={{
            borderRadius: '8px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          AI Matcher
        </Button>

        {/* Notifications */}
        <Badge count={3} offset={[-2, 4]} color="#6366f1">
          <Button
            shape="circle"
            icon={<BellOutlined style={{ fontSize: '18px', color: '#475569' }} />}
            style={{ borderColor: '#e2e8f0' }}
          />
        </Badge>

        {/* Role Switcher Tag */}
        <Dropdown menu={roleMenu} trigger={['click']}>
          <Tag
            color={user.role === 'admin' ? 'purple' : user.role === 'recruiter' ? 'blue' : 'green'}
            style={{
              cursor: 'pointer',
              padding: '6px 12px',
              fontSize: '13px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              margin: 0
            }}
          >
            <SwapOutlined /> Role: {user.role.toUpperCase()}
          </Tag>
        </Dropdown>

        {/* Profile Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '6px' }}>
          <Avatar src={user.avatar} icon={<UserOutlined />} size={40} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', lineHeight: 1.2 }}>
              {user.name}
            </span>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              {user.title}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
