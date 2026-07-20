import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { apiClient } from '../../../api/client';
import { useTheme } from '../../../context/ThemeContext';
import ConfirmModal from '../../../components/ConfirmModal';

const StepDot = ({ active, done, label }) => {
  const { colors } = useTheme();
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold mb-2"
        style={{
          backgroundColor: done || active ? '#F2600B' : colors.bgTertiary,
          color: done || active ? '#fff' : colors.textMuted,
        }}
      >
        {done ? '\u2713' : ''}
      </div>
      <span className="text-xs" style={{ color: colors.textMuted }}>{label}</span>
    </div>
  );
};

const TransferSuperAdmin = () => {
  const { colors } = useTheme();
  // Initiator state machine: idle | initiated | initiator_confirmed
  const [stage, setStage] = useState('idle');
  const [target, setTarget] = useState(null);
  const [toEmail, setToEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cancelOpen, setCancelOpen] = useState(false);

  // Recipient state — populated when current user is being nominated
  const [recipientPending, setRecipientPending] = useState(null);
  const [recipientOtp, setRecipientOtp] = useState('');
  const [acceptSubmitting, setAcceptSubmitting] = useState(false);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const [myStatusRes, pendingRes] = await Promise.all([
        apiClient.get('/v1/superadmin/transfer/my-status').catch(() => ({ data: { pending: null } })),
        apiClient.get('/v1/superadmin/transfer/pending').catch(() => ({ data: { hasPending: false } })),
      ]);

      // Resume initiator flow if applicable
      const my = myStatusRes.data?.pending;
      if (my && my.stage) {
        setStage(my.stage);
        setTarget(my.target || null);
      } else {
        setStage('idle');
        setTarget(null);
      }

      // Show recipient banner if applicable
      if (pendingRes.data?.hasPending) {
        setRecipientPending({
          fromEmail: pendingRes.data.fromEmail,
          fromName: pendingRes.data.fromName,
        });
      } else {
        setRecipientPending(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to load transfer status');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleInitiate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await apiClient.post('/v1/superadmin/transfer/initiate', { toEmail });
      setStage('initiated');
      setTarget(res.data?.target || { email: res.data?.toEmail });
      setToEmail('');
      toast.success('Verification code sent to your email');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to start transfer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmInitiator = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiClient.post('/v1/superadmin/transfer/confirm-initiator', { otp });
      setStage('initiator_confirmed');
      setOtp('');
      toast.success('Recipient has been notified to accept');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Invalid code');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => setCancelOpen(true);

  const confirmCancel = async () => {
    setSubmitting(true);
    try {
      await apiClient.post('/v1/superadmin/transfer/cancel');
      setStage('idle');
      setTarget(null);
      setOtp('');
      toast.success('Transfer cancelled');
      setCancelOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to cancel');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    setAcceptSubmitting(true);
    try {
      await apiClient.post('/v1/superadmin/transfer/accept', { otp: recipientOtp });
      toast.success('Transfer complete. Reloading\u2026');
      // Force a reload so the JWT/role-aware UI refreshes.
      setTimeout(() => window.location.reload(), 800);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Invalid code');
    } finally {
      setAcceptSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#F2600B]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Recipient nomination card */}
      {recipientPending && (
        <div
          className="rounded-2xl p-6 border-l-4"
          style={{ backgroundColor: colors.warningBg, borderLeftColor: '#F2600B' }}
        >
          <h3 className="font-semibold text-lg" style={{ color: colors.text }}>
            You have been nominated as super admin
          </h3>
          <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
            <strong>{recipientPending.fromName}</strong> ({recipientPending.fromEmail}) wants to transfer
            the super admin role to you. Enter the code from your email to accept.
          </p>
          <form onSubmit={handleAccept} className="flex flex-wrap gap-3 mt-4 items-center">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              required
              value={recipientOtp}
              onChange={(e) => setRecipientOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="px-3 py-2 text-center tracking-[0.4em] font-semibold rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              style={{
                backgroundColor: colors.bgCard,
                color: colors.text,
                border: `1px solid ${colors.border}`,
              }}
            />
            <button
              type="submit"
              disabled={acceptSubmitting || recipientOtp.length !== 6}
              className="px-4 py-2 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-lg font-medium disabled:opacity-60"
            >
              {acceptSubmitting ? 'Accepting\u2026' : 'Accept Transfer'}
            </button>
          </form>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Transfer Super Admin</h2>
        <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
          Two-step verification protects this irreversible role swap.
        </p>
      </div>

      <div
        className="rounded-2xl p-6 border"
        style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
      >
        <div className="flex justify-between mb-8">
          <StepDot active={stage === 'idle'} done={stage !== 'idle'} label="1. Initiate" />
          <div className="flex-1 h-px mx-2 mt-4" style={{ backgroundColor: colors.border }} />
          <StepDot
            active={stage === 'initiated'}
            done={stage === 'initiator_confirmed'}
            label="2. Confirm"
          />
          <div className="flex-1 h-px mx-2 mt-4" style={{ backgroundColor: colors.border }} />
          <StepDot
            active={stage === 'initiator_confirmed'}
            done={false}
            label="3. Recipient accepts"
          />
        </div>

        {stage === 'idle' && (
          <form onSubmit={handleInitiate} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textSecondary }}
              >
                Recipient admin email
              </label>
              <input
                type="email"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                style={{
                  backgroundColor: colors.bgTertiary,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              />
              <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
                Recipient must already exist as an admin.
              </p>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-4 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl font-medium disabled:opacity-60"
            >
              {submitting ? 'Sending\u2026' : 'Initiate Transfer'}
            </button>
          </form>
        )}

        {stage === 'initiated' && (
          <form onSubmit={handleConfirmInitiator} className="space-y-4">
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              We sent a 6-digit code to your email. Enter it to authorise the transfer
              {target?.email ? (
                <>
                  {' '}to <strong>{target.firstName ? `${target.firstName} ${target.lastName || ''}` : target.email}</strong>{' '}
                  ({target.email}).
                </>
              ) : '.'}
            </p>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              required
              placeholder="000000"
              className="w-full px-3 py-3 text-center tracking-[0.5em] text-lg font-semibold rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              style={{
                backgroundColor: colors.bgTertiary,
                color: colors.text,
                border: `1px solid ${colors.border}`,
              }}
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting || otp.length !== 6}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl font-medium disabled:opacity-60"
              >
                {submitting ? 'Verifying\u2026' : 'Confirm'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={submitting}
                className="px-4 py-2.5 rounded-xl font-medium"
                style={{ backgroundColor: colors.errorBg, color: colors.error }}
              >
                Cancel transfer
              </button>
            </div>
          </form>
        )}

        {stage === 'initiator_confirmed' && (
          <div className="space-y-4">
            <div
              className="p-4 rounded-lg border-l-4"
              style={{ backgroundColor: colors.infoBg, borderLeftColor: colors.info }}
            >
              <p className="font-medium" style={{ color: colors.text }}>
                Transfer initiated. Waiting for{' '}
                {target?.firstName
                  ? `${target.firstName} ${target.lastName || ''}`.trim()
                  : target?.email}{' '}
                to accept.
              </p>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                We sent a verification code to <strong>{target?.email}</strong>. Once they enter it in
                their admin console, the role transfer will complete and you will be downgraded to
                admin.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className="w-full px-4 py-2.5 rounded-xl font-medium"
              style={{ backgroundColor: colors.errorBg, color: colors.error }}
            >
              Cancel Transfer
            </button>
          </div>
        )}
      </div>

      <ConfirmModal
        open={cancelOpen}
        title="Cancel transfer?"
        message="The in-progress super admin transfer will be aborted. You can start a new one at any time."
        confirmText="Yes, cancel transfer"
        cancelText="Keep going"
        tone="danger"
        loading={submitting}
        onConfirm={confirmCancel}
        onCancel={() => setCancelOpen(false)}
      />
    </div>
  );
};

export default TransferSuperAdmin;
