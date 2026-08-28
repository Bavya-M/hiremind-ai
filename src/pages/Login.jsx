import React, { useState } from 'react';
import { Card, Form, Input, Button, Radio, message } from 'antd';
import { UserOutlined, LockOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('recruiter');

  const onFinish = (values) => {
    login(values.email || 'bavyamohanreddy28@gmail.com', role);
    message.success(`Logged in successfully as ${role.toUpperCase()}`);
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '440px',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid #312e81',
          background: '#ffffff'
        }}
        bodyStyle={{ padding: '36px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '28px',
            margin: '0 auto 16px auto'
          }}>
            H
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            HireMind <span style={{ color: '#6366f1' }}>AI</span>
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
            Intelligent Recruitment & Candidate Management Platform
          </p>
        </div>

        <Form layout="vertical" onFinish={onFinish} initialValues={{ email: 'bavyamohanreddy28@gmail.com' }}>
          <Form.Item label="Select Persona / Role">
            <Radio.Group value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%' }}>
              <Radio.Button value="recruiter" style={{ width: '33.3%', textAlign: 'center' }}>Recruiter</Radio.Button>
              <Radio.Button value="admin" style={{ width: '33.3%', textAlign: 'center' }}>Admin</Radio.Button>
              <Radio.Button value="candidate" style={{ width: '33.3%', textAlign: 'center' }}>Candidate</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="email" label="Email Address" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input prefix={<UserOutlined style={{ color: '#94a3b8' }} />} placeholder="name@company.com" size="large" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter password' }]}>
            <Input.Password prefix={<LockOutlined style={{ color: '#94a3b8' }} />} placeholder="••••••••" size="large" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            icon={<ThunderboltOutlined />}
            style={{ borderRadius: '10px', height: '48px', fontSize: '15px', fontWeight: 700, marginTop: '10px' }}
          >
            Sign In to Platform
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
