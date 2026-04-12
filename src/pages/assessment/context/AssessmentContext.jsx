import { createContext, useContext, useState, useEffect } from 'react';

const AssessmentContext = createContext(null);

const STORAGE_KEY = 'assessment_auth';

export function AssessmentProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [responses, setResponses] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [submissionId, setSubmissionId] = useState(null);
  const [pendingOtpEmail, setPendingOtpEmail] = useState(null);

  // Restore auth from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { user: u, token: t } = JSON.parse(stored);
        setUser(u);
        setToken(t);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function storeAuth(userData, tokenValue) {
    setUser(userData);
    setToken(tokenValue);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: userData, token: tokenValue }));
  }

  function clearAuth() {
    setUser(null);
    setToken(null);
    setResponses({});
    setCurrentStep(0);
    setSubmissionId(null);
    setPendingOtpEmail(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  function updateResponses(category, data) {
    setResponses(prev => ({ ...prev, [category]: { ...prev[category], ...data } }));
  }

  function resetAssessment() {
    setResponses({});
    setCurrentStep(0);
    setSubmissionId(null);
  }

  return (
    <AssessmentContext.Provider value={{
      user, token, responses, currentStep, submissionId, pendingOtpEmail,
      setCurrentStep, setSubmissionId, setPendingOtpEmail, updateResponses, resetAssessment,
      storeAuth, clearAuth,
    }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessmentContext() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error('useAssessmentContext must be used within AssessmentProvider');
  return ctx;
}
