import React, { useState } from 'react';
import { Row, Col, Card, Avatar, Tag, Button, Progress, Input, Select } from 'antd';
import { UserOutlined, ThunderboltOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Candidates = () => {
  const { candidates, searchQuery } = useApp();
  const navigate = useNavigate();
  const [filterStage, setFilterStage] = useState('All');

  const filteredCandidates = candidates.filter(cand => {
    const matchesSearch = cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cand.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cand.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStage = filterStage === 'All' || cand.status === filterStage;
    return matchesSearch && matchesStage;
  });

  return (
    <div style={{ padding: '24px 32px' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Candidate Directory</h1>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
            Explore candidate profiles, AI compatibility scores, technical skills, and resume evaluations.
          </p>
        </div>
        <Button
          type="primary"
          icon={<ThunderboltOutlined />}
          size="large"
          onClick={() => navigate('/ai-analysis')}
          style={{ borderRadius: '10px', fontWeight: 600 }}
        >
          Run AI Matcher
        </Button>
      </div>

      {/* Filter */}
      <div style={{
        background: '#ffffff',
        padding: '16px 20px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Filter by Stage:</span>
        <Select
          defaultValue="All"
          onChange={setFilterStage}
          style={{ width: '180px' }}
          options={[
            { value: 'All', label: 'All Stages' },
            { value: 'Applied', label: 'Applied' },
            { value: 'Screening', label: 'Screening' },
            { value: 'Interview', label: 'Interview' },
            { value: 'Assessment', label: 'Assessment' },
            { value: 'Selected', label: 'Selected' },
            { value: 'Hired', label: 'Hired' }
          ]}
        />
      </div>

      {/* Candidate Cards Grid */}
      <Row gutter={[20, 20]}>
        {filteredCandidates.map(candidate => (
          <Col xs={24} sm={12} lg={8} key={candidate.id}>
            <Card
              className="glass-card"
              style={{ borderRadius: '16px' }}
              bodyStyle={{ padding: '20px' }}
            >
              <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
                <Avatar src={candidate.avatar} size={54} icon={<UserOutlined />} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {candidate.name}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 6px 0' }}>
                    {candidate.title}
                  </div>
                  <Tag color="blue" style={{ borderRadius: '6px' }}>
                    Stage: {candidate.status}
                  </Tag>
                </div>
              </div>

              {/* Contact info */}
              <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
                <span><EnvironmentOutlined /> {candidate.location} • {candidate.experience} exp</span>
                <span><MailOutlined /> {candidate.email}</span>
              </div>

              {/* AI Score */}
              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: '#475569' }}>AI Match Score</span>
                  <span style={{ fontWeight: 700, color: candidate.matchScore >= 90 ? '#10b981' : '#6366f1' }}>
                    {candidate.matchScore}%
                  </span>
                </div>
                <Progress percent={candidate.matchScore} size="small" strokeColor={candidate.matchScore >= 90 ? '#10b981' : '#6366f1'} showInfo={false} />
              </div>

              {/* Skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px', height: '56px', overflow: 'hidden' }}>
                {candidate.skills.map((skill, idx) => (
                  <Tag key={idx} color="default" style={{ fontSize: '11px', borderRadius: '4px', margin: 0 }}>
                    {skill}
                  </Tag>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  type="primary"
                  ghost
                  style={{ flex: 1, borderRadius: '8px' }}
                  onClick={() => navigate(`/candidates/${candidate.id}`)}
                >
                  View Profile
                </Button>
                <Button
                  icon={<ThunderboltOutlined />}
                  style={{ borderRadius: '8px', color: '#6366f1', borderColor: '#c7d2fe' }}
                  onClick={() => navigate(`/ai-analysis?candidateId=${candidate.id}`)}
                >
                  Analyze
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Candidates;
