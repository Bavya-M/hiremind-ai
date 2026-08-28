import React from 'react';
import { Row, Col, Card, Table, Tag, Button, Progress, Avatar } from 'antd';
import {
  SolutionOutlined,
  UsergroupAddOutlined,
  CheckCircleOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const { jobs, candidates, analytics } = useApp();
  const navigate = useNavigate();

  const activeJobsCount = jobs.filter(j => j.status === 'Active').length;
  const totalApplicants = candidates.length;
  const inInterviewCount = candidates.filter(c => c.status === 'Interview' || c.status === 'Assessment').length;
  const hiredCount = candidates.filter(c => c.status === 'Hired').length;

  const candidateColumns = [
    {
      title: 'Candidate',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar src={record.avatar} />
          <div>
            <div style={{ fontWeight: 600, color: '#0f172a' }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{record.title}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Applied Job',
      dataIndex: 'appliedJobTitle',
      key: 'appliedJobTitle',
      render: (text) => <span style={{ fontSize: '13px', color: '#334155' }}>{text}</span>
    },
    {
      title: 'AI Score',
      dataIndex: 'matchScore',
      key: 'matchScore',
      render: (score) => (
        <div style={{ width: '120px' }}>
          <Progress
            percent={score}
            size="small"
            strokeColor={score >= 90 ? '#10b981' : score >= 80 ? '#6366f1' : '#f59e0b'}
          />
        </div>
      )
    },
    {
      title: 'Stage',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colorMap = {
          Applied: 'blue',
          Screening: 'cyan',
          Interview: 'purple',
          Assessment: 'orange',
          Selected: 'green',
          Rejected: 'red',
          Hired: 'gold'
        };
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          onClick={() => navigate(`/candidates/${record.id}`)}
        >
          View Profile
        </Button>
      )
    }
  ];

  return (
    <div style={{ padding: '24px 32px' }} className="animate-fade-in">
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        borderRadius: '20px',
        padding: '28px 36px',
        color: '#ffffff',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.3)'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
            <ThunderboltOutlined /> AI Recruitment Engine Active
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
            Welcome to HireMind AI Dashboard
          </h1>
          <p style={{ fontSize: '15px', color: '#c7d2fe', marginTop: '6px', maxWidth: '600px' }}>
            Streamline candidate evaluation, intelligent resume scoring, and end-to-end recruitment tracking.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            type="primary"
            size="large"
            icon={<RocketOutlined />}
            onClick={() => navigate('/jobs')}
            style={{
              backgroundColor: '#ffffff',
              color: '#4f46e5',
              fontWeight: 700,
              border: 'none',
              borderRadius: '10px'
            }}
          >
            Post New Job
          </Button>
          <Button
            size="large"
            icon={<ThunderboltOutlined />}
            onClick={() => navigate('/ai-analysis')}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              fontWeight: 600,
              borderRadius: '10px'
            }}
          >
            AI Resume Analyzer
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <Row gutter={[20, 20]} style={{ marginBottom: '28px' }}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Active Job Openings"
            value={activeJobsCount}
            icon={<SolutionOutlined />}
            change="+2 this week"
            color="#4f46e5"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Applicants"
            value={totalApplicants}
            icon={<UsergroupAddOutlined />}
            change="+18% vs last month"
            color="#06b6d4"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="In Interview / Assessment"
            value={inInterviewCount}
            icon={<ThunderboltOutlined />}
            change="Active Evaluation"
            color="#a855f7"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Offers Accepted / Hired"
            value={hiredCount}
            icon={<CheckCircleOutlined />}
            change="100% target reached"
            color="#10b981"
          />
        </Col>
      </Row>

      {/* Main Charts & Recent Candidates Row */}
      <Row gutter={[24, 24]}>
        {/* Left Column: Recent Candidates Table */}
        <Col xs={24} xl={15}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '16px', fontWeight: 700 }}>Top AI-Scored Candidates</span>
                <Button type="link" onClick={() => navigate('/candidates')}>
                  View All <ArrowRightOutlined />
                </Button>
              </div>
            }
            style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}
          >
            <Table
              dataSource={candidates}
              columns={candidateColumns}
              rowKey="id"
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>

        {/* Right Column: Recruitment Funnel Chart */}
        <Col xs={24} xl={9}>
          <Card
            title={<span style={{ fontSize: '16px', fontWeight: 700 }}>Recruitment Pipeline Funnel</span>}
            style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}
          >
            <div style={{ height: '320px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.funnel} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="stage" type="category" width={80} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', marginTop: '12px' }}>
              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                Funnel Conversion Rate
              </span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#10b981' }}>
                14.2% (Applied to Hired)
              </span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
