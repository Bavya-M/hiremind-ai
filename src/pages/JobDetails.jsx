import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Tag, Button, Table, Progress, Avatar, Divider, Space, message } from 'antd';
import { ArrowLeftOutlined, EnvironmentOutlined, DollarOutlined, UserOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useApp } from '../context/AppContext';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, candidates, updateJobStatus } = useApp();

  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Job Not Found</h2>
        <Button onClick={() => navigate('/jobs')}>Back to Jobs</Button>
      </div>
    );
  }

  const jobCandidates = candidates.filter(c => c.appliedJobId === job.id);

  const candidateColumns = [
    {
      title: 'Candidate Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 600, color: '#0f172a' }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{record.email}</div>
          </div>
        </div>
      )
    },
    {
      title: 'AI Match Score',
      dataIndex: 'matchScore',
      key: 'matchScore',
      render: (score) => (
        <div style={{ width: '130px' }}>
          <Progress percent={score} strokeColor={score > 90 ? '#10b981' : '#6366f1'} size="small" />
        </div>
      )
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color="blue">{status}</Tag>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/candidates/${record.id}`)}>
            View Details
          </Button>
          <Button
            type="primary"
            ghost
            icon={<ThunderboltOutlined />}
            size="small"
            onClick={() => navigate(`/ai-analysis?candidateId=${record.id}&jobId=${job.id}`)}
          >
            AI Evaluation
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px 32px' }} className="animate-fade-in">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/jobs')}
        style={{ marginBottom: '20px', borderRadius: '8px' }}
      >
        Back to Jobs
      </Button>

      {/* Job Detail Header Card */}
      <Card style={{ borderRadius: '16px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Tag color="purple" style={{ marginBottom: '8px' }}>{job.department}</Tag>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '4px 0 8px 0' }}>
              {job.title}
            </h1>
            <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#64748b' }}>
              <span><EnvironmentOutlined /> {job.location}</span>
              <span><DollarOutlined /> {job.salary}</span>
              <span>Posted: {job.postedDate}</span>
            </div>
          </div>
          <Space>
            <Tag color={job.status === 'Active' ? 'success' : 'default'} style={{ fontSize: '14px', padding: '6px 14px' }}>
              {job.status}
            </Tag>
            <Button
              onClick={() => {
                updateJobStatus(job.id, job.status === 'Active' ? 'Closed' : 'Active');
                message.info(`Job status updated to ${job.status === 'Active' ? 'Closed' : 'Active'}`);
              }}
            >
              Toggle Status
            </Button>
          </Space>
        </div>

        <Divider />

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>Description</h3>
          <p style={{ color: '#475569', lineHeight: 1.6 }}>{job.description}</p>
        </div>

        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>Required Technical Skills</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {job.skillsRequired.map((skill, idx) => (
              <Tag key={idx} color="blue" style={{ fontSize: '13px', padding: '4px 10px', borderRadius: '6px' }}>
                {skill}
              </Tag>
            ))}
          </div>
        </div>
      </Card>

      {/* Applicants List */}
      <Card
        title={<span style={{ fontSize: '18px', fontWeight: 700 }}>Applicants for this Role ({jobCandidates.length})</span>}
        style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}
      >
        <Table
          dataSource={jobCandidates}
          columns={candidateColumns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default JobDetails;
