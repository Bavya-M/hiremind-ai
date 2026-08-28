import React from 'react';
import { Card, Avatar, Descriptions, Tag, Button, Switch, Divider, message } from 'antd';
import { UserOutlined, MailOutlined, SafetyCertificateOutlined, SwapOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, switchRole, logout } = useAuth();

  return (
    <div style={{ padding: '24px 32px' }} className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
          User Profile & System Configuration
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
          Manage your account information, role privileges, and recruitment automation preferences.
        </p>
      </div>

      <Card style={{ borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
          <Avatar src={user.avatar} size={80} icon={<UserOutlined />} />
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>{user.name}</h2>
            <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>{user.title}</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <Tag color="purple" icon={<SafetyCertificateOutlined />}>
                Active Role: {user.role.toUpperCase()}
              </Tag>
              <Tag color="blue">{user.company}</Tag>
            </div>
          </div>
        </div>

        <Divider />

        <Descriptions title="Account Details" bordered column={{ xs: 1, sm: 2 }}>
          <Descriptions.Item label="Full Name">{user.name}</Descriptions.Item>
          <Descriptions.Item label="Email Address">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Organization">{user.company}</Descriptions.Item>
          <Descriptions.Item label="Platform Role">{user.role.toUpperCase()}</Descriptions.Item>
          <Descriptions.Item label="AI Feature Access">Full Access (Resume Parser & Matcher)</Descriptions.Item>
          <Descriptions.Item label="Account Status"><Tag color="success">Active</Tag></Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title={<span style={{ fontSize: '16px', fontWeight: 700 }}>Switch Role Simulation</span>} style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>
          Test the HireMind AI platform experience across different user permissions:
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            type={user.role === 'recruiter' ? 'primary' : 'default'}
            icon={<SwapOutlined />}
            onClick={() => {
              switchRole('recruiter');
              message.success('Switched to Recruiter Role');
            }}
          >
            Recruiter Persona
          </Button>
          <Button
            type={user.role === 'admin' ? 'primary' : 'default'}
            icon={<SwapOutlined />}
            onClick={() => {
              switchRole('admin');
              message.success('Switched to Admin Role');
            }}
          >
            Admin Persona
          </Button>
          <Button
            type={user.role === 'candidate' ? 'primary' : 'default'}
            icon={<SwapOutlined />}
            onClick={() => {
              switchRole('candidate');
              message.success('Switched to Candidate Persona');
            }}
          >
            Candidate Persona
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
