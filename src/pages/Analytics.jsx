import React from 'react';
import { Row, Col, Card, Statistic, Progress } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../context/AppContext';
import { ArrowUpOutlined, UsergroupAddOutlined, ClockCircleOutlined, TrophyOutlined } from '@ant-design/icons';

const Analytics = () => {
  const { analytics } = useApp();

  const pieColors = ['#6366f1', '#06b6d4', '#a855f7', '#10b981'];

  return (
    <div style={{ padding: '24px 32px' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
          Recruitment Analytics & Reports
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
          Data visualizations on applicant growth, time-to-hire, funnel conversion, and department performance.
        </p>
      </div>

      {/* Top Stat Cards */}
      <Row gutter={[20, 20]} style={{ marginBottom: '28px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <Statistic
              title={<span style={{ color: '#64748b', fontSize: '13px' }}>Avg Time to Hire</span>}
              value={18}
              suffix="Days"
              valueStyle={{ fontWeight: 800, color: '#0f172a' }}
              prefix={<ClockCircleOutlined style={{ color: '#6366f1', marginRight: '8px' }} />}
            />
            <div style={{ fontSize: '12px', color: '#10b981', marginTop: '8px' }}>
              <ArrowUpOutlined /> 4 days faster than industry benchmark
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <Statistic
              title={<span style={{ color: '#64748b', fontSize: '13px' }}>Candidate Match Accuracy</span>}
              value={92.4}
              suffix="%"
              valueStyle={{ fontWeight: 800, color: '#0f172a' }}
              prefix={<TrophyOutlined style={{ color: '#a855f7', marginRight: '8px' }} />}
            />
            <div style={{ fontSize: '12px', color: '#10b981', marginTop: '8px' }}>
              High AI precision score
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <Statistic
              title={<span style={{ color: '#64748b', fontSize: '13px' }}>Total Applications Received</span>}
              value={568}
              valueStyle={{ fontWeight: 800, color: '#0f172a' }}
              prefix={<UsergroupAddOutlined style={{ color: '#06b6d4', marginRight: '8px' }} />}
            />
            <div style={{ fontSize: '12px', color: '#10b981', marginTop: '8px' }}>
              +24% month over month
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <Statistic
              title={<span style={{ color: '#64748b', fontSize: '13px' }}>Offer Acceptance Rate</span>}
              value={88.5}
              suffix="%"
              valueStyle={{ fontWeight: 800, color: '#0f172a' }}
            />
            <Progress percent={88.5} showInfo={false} strokeColor="#10b981" size="small" style={{ marginTop: '8px' }} />
          </Card>
        </Col>
      </Row>

      {/* Main Charts Row */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        {/* Monthly Applications Growth */}
        <Col xs={24} lg={14}>
          <Card
            title={<span style={{ fontSize: '16px', fontWeight: 700 }}>Monthly Application Growth & AI Matches</span>}
            style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}
          >
            <div style={{ height: '320px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.monthlyApplications} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMatched" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="total" stroke="#6366f1" fillOpacity={1} fill="url(#colorTotal)" name="Total Applicants" />
                  <Area type="monotone" dataKey="matched" stroke="#10b981" fillOpacity={1} fill="url(#colorMatched)" name="AI Matched" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* Department Distribution */}
        <Col xs={24} lg={10}>
          <Card
            title={<span style={{ fontSize: '16px', fontWeight: 700 }}>Applicants by Department</span>}
            style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}
          >
            <div style={{ height: '320px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.departmentStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={5}
                    dataKey="applicants"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {analytics.departmentStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;
