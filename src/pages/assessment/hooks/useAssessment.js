import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAssessmentContext } from '../context/AssessmentContext';

const BASE = (import.meta.env.VITE_BASE_URL || 'https://krafo-api.onrender.com/api') + '/v1/assessment';

export function useAssessment() {
  const { token, clearAuth } = useAssessmentContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function authHeaders() {
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  function handleAuthError(err) {
    if (err.response?.status === 401) {
      clearAuth();
      navigate('/assessment-toolkit/start');
    }
  }

  async function saveProgress(step, data, submissionId) {
    setLoading(true); setError(null);
    try {
      const res = await axios.post(
        `${BASE}/save-progress`,
        { step, responses: data, ...(submissionId ? { submissionId } : {}) },
        authHeaders()
      );
      return res.data;
    } catch (err) {
      handleAuthError(err);
      const msg = err.response?.data?.error || 'Failed to save progress';
      setError(msg);
      // Do not throw — caller retains form data
      return null;
    } finally { setLoading(false); }
  }

  async function submitAssessment(responses, submissionId) {
    setLoading(true); setError(null);
    try {
      const res = await axios.post(
        `${BASE}/submit`,
        { responses, ...(submissionId ? { submissionId } : {}) },
        authHeaders()
      );
      return res.data;
    } catch (err) {
      handleAuthError(err);
      const msg = err.response?.data?.error || 'Submission failed. Please try again.';
      setError(msg); throw new Error(msg);
    } finally { setLoading(false); }
  }

  async function getReport(id) {
    setLoading(true); setError(null);
    try {
      const res = await axios.get(`${BASE}/${id}`, authHeaders());
      return res.data.submission;
    } catch (err) {
      handleAuthError(err);
      const msg = err.response?.data?.error || 'Failed to load report';
      setError(msg); throw new Error(msg);
    } finally { setLoading(false); }
  }

  async function getMyAssessments() {
    setLoading(true); setError(null);
    try {
      const res = await axios.get(`${BASE}/my-assessments`, authHeaders());
      return res.data;
    } catch (err) {
      handleAuthError(err);
      const msg = err.response?.data?.error || 'Failed to load assessments';
      setError(msg); throw new Error(msg);
    } finally { setLoading(false); }
  }

  function getReportDownloadUrl(id) {
    return `${BASE}/${id}/report`;
  }

  return { saveProgress, submitAssessment, getReport, getMyAssessments, getReportDownloadUrl, loading, error };
}
