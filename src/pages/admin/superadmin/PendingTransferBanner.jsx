import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../../api/client';
import { useTheme } from '../../../context/ThemeContext';

/**
 * Banner shown to a regular admin who has a pending super-admin transfer waiting
 * for them to accept. Renders nothing if there's no pending transfer.
 */
const PendingTransferBanner = () => {
  const { colors } = useTheme();
  const [pending, setPending] = useState(null);

  useEffect(() => {
    let cancelled = false;
    apiClient
      .get('/v1/superadmin/transfer/pending')
      .then((res) => {
        if (cancelled) return;
        if (res.data?.hasPending) {
          setPending({
            fromName: res.data.fromName,
            fromEmail: res.data.fromEmail,
          });
        }
      })
      .catch(() => {
        // silent — banner is optional
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!pending) return null;

  return (
    <div
      className="rounded-xl p-4 sm:p-5 border-l-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
      style={{ backgroundColor: colors.warningBg, borderLeftColor: '#F2600B' }}
    >
      <div className="flex-1">
        <p className="font-semibold" style={{ color: colors.text }}>
          You have been nominated as super admin
        </p>
        <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
          {pending.fromName} ({pending.fromEmail}) wants to transfer the super admin role to you.
        </p>
      </div>
      <Link
        to="/admin/superadmin/transfer"
        className="px-4 py-2 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-lg font-medium text-sm whitespace-nowrap"
      >
        Accept now
      </Link>
    </div>
  );
};

export default PendingTransferBanner;
