import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CalendarHeart,
  Download,
  Mail,
  Phone,
  RefreshCw,
  Trash2,
  Users,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { apiClient } from '../../api/client';
import { useTheme } from '../../context/ThemeContext';
import ConfirmModal from '../../components/ConfirmModal';
import EmptyState from '../../components/EmptyState';
import { SkeletonTable } from '../../components/Skeleton';

/**
 * Signups from the "Events We're Planning" section of the public Events page.
 *
 * These are demand signals, not registrations — the point is to see which
 * planned events people actually want before committing a venue and a date.
 * The export builds the file in the browser from data already fetched, which
 * keeps the download inside the authenticated session (a plain <a href> to an
 * API route would not carry the Bearer token).
 */
export default function ManageEventInterest() {
  const { colors } = useTheme();
  const [signups, setSignups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventFilter, setEventFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const rowId = (row) => row?._id || row?.id;

  const fetchSignups = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get('/admin/content/event-interest');
      const data = Array.isArray(res.data) ? res.data : res.data?.signups || [];
      setSignups(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to load signups');
      setSignups([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSignups();
  }, [fetchSignups]);

  // One entry per planned event that has at least one signup, with its count.
  const eventGroups = useMemo(() => {
    const groups = new Map();
    signups.forEach((s) => {
      const existing = groups.get(s.plannedEventId);
      if (existing) {
        existing.count += 1;
      } else {
        groups.set(s.plannedEventId, {
          id: s.plannedEventId,
          title: s.plannedEventTitle,
          count: 1,
        });
      }
    });
    return [...groups.values()].sort((a, b) => b.count - a.count);
  }, [signups]);

  const visibleSignups = useMemo(
    () =>
      eventFilter === 'all'
        ? signups
        : signups.filter((s) => s.plannedEventId === eventFilter),
    [signups, eventFilter]
  );

  const uniquePeople = useMemo(
    () => new Set(signups.map((s) => (s.email || '').toLowerCase())).size,
    [signups]
  );

  const formatDate = (value) => {
    if (!value) return '—';
    return new Date(value).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  /**
   * Build a spreadsheet from whatever is currently on screen.
   *
   * Written as CSV rather than true .xlsx so the app needs no extra library —
   * Excel opens it natively on double-click. The leading U+FEFF byte-order
   * mark is what stops Excel mangling non-ASCII characters in names.
   */
  const handleExport = () => {
    if (visibleSignups.length === 0) {
      toast.info('Nothing to export yet.');
      return;
    }

    const headers = ['Name', 'Email', 'Phone', 'Planned event', 'Event ID', 'Registered on'];

    // Quote every field and double any embedded quotes. The leading apostrophe
    // guard stops Excel interpreting a value like "+233..." as a formula.
    const escape = (value) => {
      const text = value === null || value === undefined ? '' : String(value);
      const guarded = /^[=+\-@]/.test(text) ? `'${text}` : text;
      return `"${guarded.replace(/"/g, '""')}"`;
    };

    const rows = visibleSignups.map((s) =>
      [
        s.name,
        s.email,
        s.phone,
        s.plannedEventTitle,
        s.plannedEventId,
        s.createdAt ? new Date(s.createdAt).toISOString() : '',
      ]
        .map(escape)
        .join(',')
    );

    // Built from its code point rather than typed literally — a raw BOM in
    // source is invisible and trips the irregular-whitespace lint rule.
    const BOM = String.fromCharCode(0xfeff);
    const csv = [headers.map(escape).join(','), ...rows].join('\r\n');
    const blob = new Blob([BOM, csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `krafo-event-interest-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Exported ${visibleSignups.length} signup(s)`);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiClient.delete(`/admin/content/event-interest/${rowId(deleteTarget)}`);
      toast.success('Signup removed');
      setDeleteTarget(null);
      fetchSignups();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Could not remove that signup.');
    } finally {
      setDeleting(false);
    }
  };

  const cardStyle = { backgroundColor: colors.bgCard, borderColor: colors.border };

  const stats = [
    { label: 'Total signups', value: signups.length, Icon: Users },
    { label: 'Unique people', value: uniquePeople, Icon: Mail },
    { label: 'Events with interest', value: eventGroups.length, Icon: CalendarHeart },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>
            Event Interest
          </h1>
          <p className="mt-1 text-sm" style={{ color: colors.textMuted }}>
            People who registered interest in events you haven&apos;t scheduled yet.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={fetchSignups}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition disabled:opacity-60"
            style={{ borderColor: colors.border, color: colors.text }}
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            type="button"
            onClick={handleExport}
            disabled={loading || visibleSignups.length === 0}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#F2600B] to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:shadow-orange-500/30 disabled:opacity-50"
          >
            <Download size={15} />
            Download for Excel
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border p-4" style={cardStyle}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-[#F2600B]">
                <stat.Icon size={18} />
              </span>
              <div>
                <p className="text-2xl font-bold" style={{ color: colors.text }}>
                  {loading ? '—' : stat.value}
                </p>
                <p className="text-xs" style={{ color: colors.textMuted }}>
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Per-event filter chips */}
      {!loading && eventGroups.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setEventFilter('all')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              eventFilter === 'all' ? 'bg-[#F2600B] text-white' : 'border'
            }`}
            style={eventFilter === 'all' ? undefined : { borderColor: colors.border, color: colors.textMuted }}
          >
            All ({signups.length})
          </button>
          {eventGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => setEventFilter(group.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                eventFilter === group.id ? 'bg-[#F2600B] text-white' : 'border'
              }`}
              style={
                eventFilter === group.id
                  ? undefined
                  : { borderColor: colors.border, color: colors.textMuted }
              }
            >
              {group.title} ({group.count})
            </button>
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div
          className="flex items-start gap-3 rounded-xl border p-4"
          style={{ ...cardStyle, borderColor: 'rgba(239, 68, 68, 0.4)' }}
        >
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-400" />
          <div>
            <p className="text-sm font-medium" style={{ color: colors.text }}>
              Couldn&apos;t load signups
            </p>
            <p className="mt-1 text-sm" style={{ color: colors.textMuted }}>
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border" style={cardStyle}>
        {loading ? (
          <SkeletonTable rows={6} columns={5} />
        ) : visibleSignups.length === 0 ? (
          <EmptyState
            icon={CalendarHeart}
            title="No interest registered yet"
            message="When someone clicks “I'm interested” on a planned event, they'll appear here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                  {['Name', 'Contact', 'Planned event', 'Registered', ''].map((heading) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: colors.textMuted }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleSignups.map((signup) => (
                  <tr
                    key={rowId(signup)}
                    style={{ borderBottom: `1px solid ${colors.border}` }}
                  >
                    <td className="px-5 py-4 font-medium" style={{ color: colors.text }}>
                      {signup.name}
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={`mailto:${signup.email}`}
                        className="flex items-center gap-2 hover:underline"
                        style={{ color: colors.text }}
                      >
                        <Mail size={13} className="shrink-0 text-[#F2600B]" />
                        {signup.email}
                      </a>
                      {signup.phone && (
                        <a
                          href={`tel:${signup.phone}`}
                          className="mt-1 flex items-center gap-2 hover:underline"
                          style={{ color: colors.textMuted }}
                        >
                          <Phone size={13} className="shrink-0 text-[#F2600B]" />
                          {signup.phone}
                        </a>
                      )}
                    </td>
                    <td className="px-5 py-4" style={{ color: colors.textMuted }}>
                      {signup.plannedEventTitle}
                    </td>
                    <td
                      className="whitespace-nowrap px-5 py-4"
                      style={{ color: colors.textMuted }}
                    >
                      {formatDate(signup.createdAt)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(signup)}
                        aria-label={`Remove ${signup.name}`}
                        className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Remove this signup?"
        message={
          deleteTarget
            ? `${deleteTarget.name} (${deleteTarget.email}) will be removed from the interest list for “${deleteTarget.plannedEventTitle}”. This can't be undone.`
            : ''
        }
        confirmText="Remove"
        tone="danger"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => !deleting && setDeleteTarget(null)}
      />
    </div>
  );
}
