import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Jobs from '../pages/Jobs';
import JobDetails from '../pages/JobDetails';
import Candidates from '../pages/Candidates';
import CandidateDetails from '../pages/CandidateDetails';
import ApplicantTracking from '../pages/ApplicantTracking';
import AIResumeAnalysis from '../pages/AIResumeAnalysis';
import Analytics from '../pages/Analytics';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import { useAuth } from '../context/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/candidates" element={<Candidates />} />
      <Route path="/candidates/:id" element={<CandidateDetails />} />
      <Route path="/pipeline" element={<ApplicantTracking />} />
      <Route path="/ai-analysis" element={<AIResumeAnalysis />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
