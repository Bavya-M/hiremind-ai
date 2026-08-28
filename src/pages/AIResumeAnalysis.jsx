import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Select, Button, Progress, Tag, Alert, Divider, Row, Col, Spin, Badge } from 'antd';
import { RobotOutlined, ThunderboltOutlined, CheckCircleOutlined, WarningOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useApp } from '../context/AppContext';

const AIResumeAnalysis = () => {
  const [searchParams] = useSearchParams();
  const { candidates, jobs, analyzeCandidateResume } = useApp();

  const paramCandId = searchParams.get('candidateId');
  const paramJobId = searchParams.get('jobId');

  const [selectedCandidateId, setSelectedCandidateId] = useState(paramCandId || candidates[0]?.id);
  const [selectedJobId, setSelectedJobId] = useState(paramJobId || jobs[0]?.id);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    if (selectedCandidateId && selectedJobId) {
      runAnalysis();
    }
  }, [selectedCandidateId, selectedJobId]);

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeCandidateResume(selectedCandidateId, selectedJobId);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 600);
  };

  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId);
  const selectedJob = jobs.find(j => j.id === selectedJobId);

  return (
    <div style={{ padding: '24px 32px' }} className="animate-fade-in">
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        borderRadius: '20px',
        padding: '28px 36px',
        color: '#ffffff',
        marginBottom: '28px',
        border: '1px solid #312e81'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
          <ThunderboltOutlined /> AI Candidate Scoring & Skill Gap Engine
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
          AI Resume Analysis & Job Matching
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px', maxWidth: '650px' }}>
          Select candidate profiles and active job requisitions to run automated semantic resume evaluation, skill matrix extraction, and fit scoring.
        </p>
      </div>

      {/* Control Selector Card */}
      <Card style={{ borderRadius: '16px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
        <Row gutter={[20, 20]} align="middle">
          <Col xs={24} md={10}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
              Select Candidate Profile:
            </span>
            <Select
              value={selectedCandidateId}
              onChange={setSelectedCandidateId}
              style={{ width: '100%' }}
              size="large"
              options={candidates.map(c => ({
                value: c.id,
                label: `${c.name} (${c.title})`
              }))}
            />
          </Col>

          <Col xs={24} md={10}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
              Select Target Job Requisition:
            </span>
            <Select
              value={selectedJobId}
              onChange={setSelectedJobId}
              style={{ width: '100%' }}
              size="large"
              options={jobs.map(j => ({
                value: j.id,
                label: `${j.title} [${j.department}]`
              }))}
            />
          </Col>

          <Col xs={24} md={4} style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
            <Button
              type="primary"
              icon={<RobotOutlined />}
              size="large"
              onClick={runAnalysis}
              loading={isAnalyzing}
              style={{ width: '100%', borderRadius: '10px', fontWeight: 600, marginTop: '20px' }}
            >
              Re-Analyze
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Analysis Output Section */}
      {isAnalyzing ? (
        <Card style={{ borderRadius: '16px', textAlign: 'center', padding: '60px 0' }}>
          <Spin size="large" tip="AI Engine analyzing resume syntax, experience vector, and technical keywords..." />
        </Card>
      ) : analysisResult ? (
        <Row gutter={[24, 24]}>
          {/* Left Column: Overall AI Score Breakdown */}
          <Col xs={24} lg={10}>
            <Card style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Calculated Compatibility Score
                </span>

                <div style={{ margin: '24px 0' }}>
                  <Progress
                    type="circle"
                    percent={analysisResult.overallScore}
                    strokeColor={{
                      '0%': '#6366f1',
                      '100%': '#a855f7'
                    }}
                    width={150}
                    format={(p) => (
                      <div>
                        <div style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a' }}>{p}%</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Match Fit</div>
                      </div>
                    )}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around', background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#6366f1' }}>{analysisResult.skillMatchScore}%</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Technical Skill Match</div>
                  </div>
                  <Divider type="vertical" style={{ height: '40px' }} />
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#a855f7' }}>{analysisResult.experienceScore}%</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Experience Level</div>
                  </div>
                </div>

                <Alert
                  message="AI Decision Support"
                  description={analysisResult.aiRecommendation}
                  type={analysisResult.overallScore >= 80 ? 'success' : 'warning'}
                  showIcon
                  icon={<RobotOutlined />}
                  style={{ textAlign: 'left', borderRadius: '10px' }}
                />
              </div>
            </Card>
          </Col>

          {/* Right Column: Skill Matrix & Insights */}
          <Col xs={24} lg={14}>
            <Card style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
                Technical Skill Extraction & Comparison
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#10b981', marginBottom: '8px' }}>
                  Matched Required Skills ({analysisResult.matchedSkills.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {analysisResult.matchedSkills.map((skill, idx) => (
                    <Tag key={idx} color="success" icon={<CheckCircleOutlined />} style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '8px' }}>
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>

              {analysisResult.missingSkills.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#ef4444', marginBottom: '8px' }}>
                    Missing / Unmatched Required Skills ({analysisResult.missingSkills.length})
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {analysisResult.missingSkills.map((skill, idx) => (
                      <Tag key={idx} color="error" icon={<WarningOutlined />} style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '8px' }}>
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}

              <Divider />

              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                AI Key Analytical Insights
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#475569', fontSize: '14px', lineHeight: 1.7 }}>
                {analysisResult.insights.map((insight, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{insight}</li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default AIResumeAnalysis;
