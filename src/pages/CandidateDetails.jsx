import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Avatar, Tag, Button, Progress, Tabs, Divider, Select, message, Timeline } from 'antd';
import { ArrowLeftOutlined, ThunderboltOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, CheckCircleOutlined, WarningOutlined, FileTextOutlined } from '@ant-design/icons';
import { useApp } from '../context/AppContext';
import AIAnalysisModal from '../components/AIAnalysisModal';

const CandidateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { candidates, moveCandidateStage, analyzeCandidateResume, pipelineStages, jobs } = useApp();
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);

  const candidate = candidates.find(c => c.id === id);

  if (!candidate) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Candidate Not Found</h2>
        <Button onClick={() => navigate('/candidates')}>Back to Directory</Button>
      </div>
    );
  }

  const analysisResult = analyzeCandidateResume(candidate.id, candidate.appliedJobId);

  return (
    <div style={{ padding: '24px 32px' }} className="animate-fade-in">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/candidates')}
        style={{ marginBottom: '20px', borderRadius: '8px' }}
      >
        Back to Candidate Directory
      </Button>

      {/* Profile Overview Card */}
      <Card style={{ borderRadius: '16px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <Avatar src={candidate.avatar} size={84} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {candidate.name}
                </h1>
                <div style={{ fontSize: '15px', color: '#475569', fontWeight: 500, margin: '4px 0 10px 0' }}>
                  {candidate.title}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Workflow Stage:</span>
                <Select
                  value={candidate.status}
                  onChange={(newStage) => {
                    moveCandidateStage(candidate.id, newStage);
                    message.success(`Updated ${candidate.name}'s stage to ${newStage}`);
                  }}
                  style={{ width: '160px' }}
                  options={pipelineStages.map(stage => ({ value: stage, label: stage }))}
                />
                <Button
                  type="primary"
                  icon={<ThunderboltOutlined />}
                  onClick={() => setIsAnalysisModalOpen(true)}
                  style={{ borderRadius: '8px' }}
                >
                  Run Full AI Breakdown
                </Button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#64748b', margin: '10px 0 16px 0' }}>
              <span><EnvironmentOutlined /> {candidate.location}</span>
              <span><MailOutlined /> {candidate.email}</span>
              <span><PhoneOutlined /> {candidate.phone}</span>
              <span>Experience: <strong>{candidate.experience}</strong></span>
            </div>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {candidate.skills.map((skill, idx) => (
                <Tag key={idx} color="blue" style={{ padding: '4px 10px', borderRadius: '6px' }}>
                  {skill}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs Section */}
      <Tabs
        defaultActiveKey="ai"
        style={{ background: '#ffffff', padding: '20px 24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}
        items={[
          {
            key: 'ai',
            label: <span><ThunderboltOutlined /> AI Evaluation & Resume Analysis</span>,
            children: (
              <div style={{ padding: '16px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>Overall Match Score</div>
                    <Progress type="circle" percent={candidate.matchScore} width={100} strokeColor="#6366f1" />
                  </div>
                  <div style={{ flex: 1, background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                      AI Executive Summary
                    </div>
                    <p style={{ color: '#475569', margin: 0, lineHeight: 1.6 }}>{candidate.aiSummary}</p>
                  </div>
                </div>

                <Divider />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#10b981', marginBottom: '12px' }}>
                      Key Technical Strengths
                    </h4>
                    {candidate.strengths.map((str, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#334155' }}>
                        <CheckCircleOutlined style={{ color: '#10b981' }} />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#f59e0b', marginBottom: '12px' }}>
                      Potential Skill Gaps & Focus Areas
                    </h4>
                    {candidate.skillGaps.length > 0 ? (
                      candidate.skillGaps.map((gap, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#334155' }}>
                          <WarningOutlined style={{ color: '#f59e0b' }} />
                          <span>{gap}</span>
                        </div>
                      ))
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '13px' }}>No critical skill gaps detected.</span>
                    )}
                  </div>
                </div>
              </div>
            )
          },
          {
            key: 'history',
            label: <span>Application History</span>,
            children: (
              <div style={{ padding: '20px 0' }}>
                <Timeline
                  items={[
                    { color: 'green', children: `Applied for position: ${candidate.appliedJobTitle} on ${candidate.appliedDate}` },
                    { color: 'blue', children: 'AI Resume Automated Screening Completed - Score 94%' },
                    { color: 'purple', children: 'Passed Initial Recruiter Phone Screening' },
                    { color: 'orange', children: 'Scheduled Technical Coding Assessment & System Design' }
                  ]}
                />
              </div>
            )
          },
          {
            key: 'resume',
            label: <span><FileTextOutlined /> Resume Preview</span>,
            children: (
              <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px border #e2e8f0', minHeight: '260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontWeight: 600 }}>{candidate.name}_Resume_2026.pdf</span>
                  <Button type="primary" size="small">Download PDF</Button>
                </div>
                <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 800 }}>{candidate.name}</h2>
                  <p style={{ color: '#64748b', fontSize: '13px' }}>{candidate.title} • {candidate.email} • {candidate.location}</p>
                  <Divider />
                  <h4 style={{ fontSize: '14px', fontWeight: 700 }}>Professional Experience</h4>
                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>
                    Lead frontend software architect with over {candidate.experience} of experience engineering modern web applications using React, Vite, TypeScript, and state management libraries.
                  </p>
                </div>
              </div>
            )
          }
        ]}
      />

      <AIAnalysisModal
        visible={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        analysisData={analysisResult}
      />
    </div>
  );
};

export default CandidateDetails;
