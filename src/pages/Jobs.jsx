import React, { useState } from 'react';
import { Row, Col, Card, Tag, Button, Input, Select, Modal, Form, message, Badge } from 'antd';
import { PlusOutlined, SearchOutlined, EnvironmentOutlined, DollarOutlined, UsergroupAddOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const { jobs, addJob, searchQuery } = useApp();
  const navigate = useNavigate();
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleCreateJob = (values) => {
    const newJob = {
      ...values,
      skillsRequired: values.skillsRequired ? values.skillsRequired.split(',').map(s => s.trim()) : ['React', 'Node.js']
    };
    addJob(newJob);
    message.success('Job posting created successfully!');
    setIsModalOpen(false);
    form.resetFields();
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = filterDepartment === 'All' || job.department === filterDepartment;
    const matchesStatus = filterStatus === 'All' || job.status === filterStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div style={{ padding: '24px 32px' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Job Management</h1>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
            Create and track job requisitions, candidate matches, and required technical skillsets.
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setIsModalOpen(true)}
          style={{ borderRadius: '10px', fontWeight: 600 }}
        >
          Create Job Posting
        </Button>
      </div>

      {/* Filter Bar */}
      <div style={{
        background: '#ffffff',
        padding: '16px 20px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Department:</span>
          <Select
            defaultValue="All"
            onChange={setFilterDepartment}
            style={{ width: '160px' }}
            options={[
              { value: 'All', label: 'All Departments' },
              { value: 'Engineering', label: 'Engineering' },
              { value: 'Design', label: 'Design' },
              { value: 'Infrastructure', label: 'Infrastructure' },
              { value: 'AI Research', label: 'AI Research' }
            ]}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Status:</span>
          <Select
            defaultValue="All"
            onChange={setFilterStatus}
            style={{ width: '140px' }}
            options={[
              { value: 'All', label: 'All Status' },
              { value: 'Active', label: 'Active' },
              { value: 'Closed', label: 'Closed' }
            ]}
          />
        </div>
      </div>

      {/* Job Cards Grid */}
      <Row gutter={[20, 20]}>
        {filteredJobs.map(job => (
          <Col xs={24} md={12} lg={12} key={job.id}>
            <Card
              className="glass-card"
              style={{ borderRadius: '16px' }}
              bodyStyle={{ padding: '24px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <Tag color={job.department === 'Engineering' ? 'blue' : job.department === 'Design' ? 'purple' : 'cyan'}>
                    {job.department}
                  </Tag>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '8px 0 4px 0' }}>
                    {job.title}
                  </h2>
                </div>
                <Tag color={job.status === 'Active' ? 'success' : 'default'} style={{ fontSize: '12px', padding: '4px 10px' }}>
                  {job.status}
                </Tag>
              </div>

              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                <span><EnvironmentOutlined /> {job.location}</span>
                <span><DollarOutlined /> {job.salary}</span>
              </div>

              <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px', lineHeight: 1.5 }}>
                {job.description}
              </p>

              {/* Required Skills tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {job.skillsRequired.map((skill, idx) => (
                  <Tag key={idx} color="processing" style={{ borderRadius: '6px', fontSize: '12px' }}>
                    {skill}
                  </Tag>
                ))}
              </div>

              {/* Card Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '16px',
                borderTop: '1px solid #f1f5f9'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>
                    <UsergroupAddOutlined /> <strong>{job.applicantsCount}</strong> Applicants
                  </span>
                  <Tag color="purple" icon={<ThunderboltOutlined />}>
                    {job.matchedCandidatesCount} AI Matches
                  </Tag>
                </div>
                <Button
                  type="primary"
                  ghost
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  style={{ borderRadius: '8px' }}
                >
                  Manage Applicants
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Create Job Modal */}
      <Modal
        title={<span style={{ fontSize: '18px', fontWeight: 700 }}>Create New Requisition / Job Posting</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateJob} style={{ marginTop: '16px' }}>
          <Form.Item name="title" label="Job Title" rules={[{ required: true, message: 'Please enter job title' }]}>
            <Input placeholder="e.g. Senior Frontend Architect" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="department" label="Department" rules={[{ required: true }]}>
                <Select placeholder="Select department">
                  <Select.Option value="Engineering">Engineering</Select.Option>
                  <Select.Option value="Design">Design</Select.Option>
                  <Select.Option value="Infrastructure">Infrastructure</Select.Option>
                  <Select.Option value="AI Research">AI Research</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="location" label="Location" rules={[{ required: true }]}>
                <Input placeholder="e.g. San Francisco, CA / Remote" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="salary" label="Salary Range" rules={[{ required: true }]}>
                <Input placeholder="e.g. $130,000 - $170,000" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="experience" label="Experience Level" rules={[{ required: true }]}>
                <Input placeholder="e.g. 4-6 years" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="skillsRequired" label="Required Skills (Comma separated)" rules={[{ required: true }]}>
            <Input placeholder="React, Node.js, TypeScript, Ant Design, Vite" />
          </Form.Item>

          <Form.Item name="description" label="Job Description" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="Describe responsibilities and requirements..." />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Create Job</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Jobs;
