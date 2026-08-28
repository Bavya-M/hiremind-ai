import React from 'react';
import { Modal, Progress, Tag, Button, Divider, Alert } from 'antd';
import { RobotOutlined, CheckCircleOutlined, WarningOutlined, ThunderboltOutlined } from '@ant-design/icons';

const AIAnalysisModal = ({ visible, onClose, analysisData }) => {
  if (!analysisData) return null;

  const {
    candidateName,
    jobTitle,
    overallScore,
    skillMatchScore,
    experienceScore,
    matchedSkills = [],
    missingSkills = [],
    aiRecommendation,
    insights = []
  } = analysisData;

  const getScoreColor = (score) => {
    if (score >= 85) return '#10b981';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThunderboltOutlined style={{ color: '#6366f1', fontSize: '20px' }} />
          <span style={{ fontSize: '18px', fontWeight: 700 }}>AI Resume & Candidate Analysis</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose} style={{ borderRadius: '8px' }}>
          Done Reviewing
        </Button>
      ]}
      width={680}
    >
      <div style={{ padding: '10px 0' }}>
        {/* Candidate & Target Job Header */}
        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{candidateName}</div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>Evaluated for: <strong>{jobTitle}</strong></div>
        </div>

        {/* Score Ring */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '20px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={overallScore}
              strokeColor={getScoreColor(overallScore)}
              width={110}
              format={(p) => <span style={{ fontSize: '20px', fontWeight: 800 }}>{p}%</span>}
            />
            <div style={{ marginTop: '8px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>
              Overall AI Score
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={skillMatchScore}
              strokeColor="#6366f1"
              width={85}
            />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>Skill Match</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={experienceScore}
              strokeColor="#a855f7"
              width={85}
            />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>Experience Fit</div>
          </div>
        </div>

        {/* AI Recommendation Alert */}
        <Alert
          message="AI Recommendation"
          description={aiRecommendation}
          type={overallScore >= 80 ? 'success' : 'warning'}
          showIcon
          icon={<RobotOutlined />}
          style={{ borderRadius: '10px', marginBottom: '20px' }}
        />

        <Divider />

        {/* Skill Matrix */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>Matched Technical Skills</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {matchedSkills.map((skill, idx) => (
              <Tag key={idx} color="success" icon={<CheckCircleOutlined />}>
                {skill}
              </Tag>
            ))}
          </div>
        </div>

        {missingSkills.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: '#dc2626' }}>Identified Skill Gaps</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {missingSkills.map((skill, idx) => (
                <Tag key={idx} color="error" icon={<WarningOutlined />}>
                  {skill}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {/* Strategic Insights */}
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>AI Key Takeaways</h4>
          <ul style={{ paddingLeft: '20px', color: '#475569', fontSize: '13px', lineHeight: 1.6 }}>
            {insights.map((insight, idx) => (
              <li key={idx}>{insight}</li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default AIAnalysisModal;
