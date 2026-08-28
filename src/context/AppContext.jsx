import React, { createContext, useContext, useState } from 'react';
import { MOCK_JOBS, MOCK_CANDIDATES, MOCK_ANALYTICS, PIPELINE_STAGES } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [candidates, setCandidates] = useState(MOCK_CANDIDATES);
  const [analytics] = useState(MOCK_ANALYTICS);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Add Job
  const addJob = (newJob) => {
    const jobWithId = {
      ...newJob,
      id: `job-${Date.now()}`,
      applicantsCount: 0,
      matchedCandidatesCount: 0,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    setJobs([jobWithId, ...jobs]);
  };

  // Update Job Status
  const updateJobStatus = (id, newStatus) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: newStatus } : j));
  };

  // Delete Job
  const deleteJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  // Move candidate pipeline stage
  const moveCandidateStage = (candidateId, newStage) => {
    setCandidates(candidates.map(c => {
      if (c.id === candidateId) {
        return { ...c, status: newStage };
      }
      return c;
    }));
  };

  // AI Resume Analysis simulation engine
  const analyzeCandidateResume = (candidateId, targetJobId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    const targetJob = jobs.find(j => j.id === targetJobId) || jobs[0];

    if (!candidate || !targetJob) return null;

    const matchedSkills = candidate.skills.filter(s => targetJob.skillsRequired.includes(s));
    const missingSkills = targetJob.skillsRequired.filter(s => !candidate.skills.includes(s));

    const skillScore = Math.round((matchedSkills.length / Math.max(targetJob.skillsRequired.length, 1)) * 100);
    const expScore = candidate.experience.includes('6') || candidate.experience.includes('7') || candidate.experience.includes('8') ? 95 : 85;
    const totalScore = Math.round((skillScore * 0.6) + (expScore * 0.4));

    return {
      candidateName: candidate.name,
      jobTitle: targetJob.title,
      overallScore: totalScore,
      skillMatchScore: skillScore,
      experienceScore: expScore,
      matchedSkills,
      missingSkills,
      aiRecommendation: totalScore > 85 ? 'Strongly Recommended for Immediate Technical Interview' : totalScore > 70 ? 'Proceed to Preliminary Screening Call' : 'Review for Alternate Role Match',
      insights: [
        `Candidate possesses ${matchedSkills.length} of ${targetJob.skillsRequired.length} core technical requirements.`,
        `Demonstrated strong expertise in ${matchedSkills.slice(0, 3).join(', ')}.`,
        missingSkills.length > 0 ? `Potential skill gap identified in: ${missingSkills.join(', ')}.` : 'No critical skill gaps found for this position.'
      ]
    };
  };

  return (
    <AppContext.Provider value={{
      jobs,
      candidates,
      analytics,
      pipelineStages: PIPELINE_STAGES,
      selectedJob,
      setSelectedJob,
      selectedCandidate,
      setSelectedCandidate,
      searchQuery,
      setSearchQuery,
      addJob,
      updateJobStatus,
      deleteJob,
      moveCandidateStage,
      analyzeCandidateResume
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
