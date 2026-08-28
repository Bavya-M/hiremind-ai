import React, { useState } from 'react';
import { Row, Col, Card, Avatar, Tag, Button, Select, Badge, Dropdown, Menu } from 'antd';
import { UserOutlined, ThunderboltOutlined, EllipsisOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const ApplicantTracking = () => {
  const { candidates, pipelineStages, moveCandidateStage, jobs } = useApp();
  const navigate = useNavigate();
  const [selectedJobFilter, setSelectedJobFilter] = useState('All');

  const filteredCandidates = candidates.filter(cand => {
    return selectedJobFilter === 'All' || cand.appliedJobId === selectedJobFilter;
  });

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Applied': return '#3b82f6';
      case 'Screening': return '#06b6d4';
      case 'Interview': return '#a855f7';
      case 'Assessment': return '#f59e0b';
      case 'Selected': return '#10b981';
      case 'Rejected': return '#ef4444';
      case 'Hired': return '#eab308';
      default: return '#64748b';
    }
  };

  return (
    <div style={{ padding: '24px 32px' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Applicant Tracking Pipeline
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
            Manage candidate progression across recruitment workflow stages in real-time.
          </p>
        </div>

        {/* Job Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Job Position:</span>
          <Select
            defaultValue="All"
            onChange={setSelectedJobFilter}
            style={{ width: '260px' }}
            options={[
              { value: 'All', label: 'All Active Job Openings' },
              ...jobs.map(j => ({ value: j.id, label: j.title }))
            ]}
          />
        </div>
      </div>

      {/* Kanban Board Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        overflowX: 'auto',
        paddingBottom: '16px'
      }}>
        {pipelineStages.map(stage => {
          const stageCandidates = filteredCandidates.filter(c => c.status === stage);
          const stageColor = getStageColor(stage);

          return (
            <div
              key={stage}
              style={{
                background: '#f8fafc',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '16px',
                minWidth: '240px'
              }}
            >
              {/* Stage Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
                paddingBottom: '10px',
                borderBottom: `2px solid ${stageColor}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{stage}</span>
                  <Badge count={stageCandidates.length} style={{ backgroundColor: stageColor }} />
                </div>
              </div>

              {/* Cards List in Stage */}
              <div className="kanban-column-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {stageCandidates.map(candidate => (
                  <Card
                    key={candidate.id}
                    className="glass-card"
                    style={{ borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer' }}
                    bodyStyle={{ padding: '14px' }}
                    onClick={() => navigate(`/candidates/${candidate.id}`)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Avatar src={candidate.avatar} size={32} />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{candidate.name}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{candidate.title}</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: '11px', color: '#475569', marginBottom: '8px' }}>
                      Applied: {candidate.appliedJobTitle}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #f1f5f9' }}>
                      <Tag color={candidate.matchScore >= 90 ? 'success' : 'purple'} icon={<ThunderboltOutlined />}>
                        {candidate.matchScore}% Match
                      </Tag>

                      {/* Quick Move Stage dropdown */}
                      <Select
                        size="small"
                        value={candidate.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(newStage) => moveCandidateStage(candidate.id, newStage)}
                        style={{ width: '100px', fontSize: '11px' }}
                        options={pipelineStages.map(s => ({ value: s, label: s }))}
                      />
                    </div>
                  </Card>
                ))}

                {stageCandidates.length === 0 && (
                  <div style={{
                    padding: '24px 12px',
                    textAlign: 'center',
                    color: '#94a3b8',
                    fontSize: '12px',
                    border: '1px dashed #cbd5e1',
                    borderRadius: '10px'
                  }}>
                    No candidates in {stage}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicantTracking;
