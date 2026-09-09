import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Megaphone, Plus } from 'lucide-react';
import { apiClient } from '../../api/client';
import { useTheme } from '../../context/ThemeContext';
import EmptyState from '../../components/EmptyState';
import { SkeletonCards } from '../../components/Skeleton';

/**
 * The announcement bar above the navbar.
 *
 * The thing this screen has to get right is the difference between switched on
 * and actually showing. An announcement with a closed date window is active in
 * the database and invisible on the site — exactly the confusion the popups
 * screen causes today. So the API sends a computed `isLive`, and every row
 * states which of the two it is, and why.
 */

const EMPTY = {
  message: '', linkUrl: '', linkLabel: '', priority: 0, startsAt: '', endsAt: '',
};

// <input type="datetime-local"> wants "YYYY-MM-DDTHH:mm" in local time.
const toLocalInput = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const fmt = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : null;

/** Why an announcement that is switched on still is not showing. */
function statusOf(a) {
  if (!a.isActive) return { label: 'Off', tone: 'muted', note: 'Switched off.' };
  if (a.isLive) return { label: 'Showing', tone: 'success', note: 'Live on the site now.' };
  const now = new Date();
  if (a.startsAt && new Date(a.startsAt) > now) {
    return { label: 'Scheduled', tone: 'warning', note: `Starts ${fmt(a.startsAt)}.` };
  }
  if (a.endsAt && new Date(a.endsAt) < now) {
    return { label: 'Expired', tone: 'warning', note: `Ended ${fmt(a.endsAt)} — switched on, but not showing.` };
  }
  return { label: 'Not showing', tone: 'warning', note: 'Another announcement has higher priority.' };
}

export default function ManageAnnouncements() {
  const { colors } = useTheme();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const tone = {
    success: { bg: colors.successBg, fg: colors.success },
    warning: { bg: colors.warningBg, fg: colors.warning },
    muted: { bg: colors.bgTertiary, fg: colors.textMuted },
  };

  const fetchItems = async () => {
    try {
      const { data } = await apiClient.get('/admin/content/announcements');
      setItems(data.announcements || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not load announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };

  const openEdit = (a) => {
    setEditing(a);
    setForm({
      message: a.message, linkUrl: a.linkUrl || '', linkLabel: a.linkLabel || '',
      priority: a.priority ?? 0,
      startsAt: toLocalInput(a.startsAt), endsAt: toLocalInput(a.endsAt),
    });
    setShowForm(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const body = {
        message: form.message,
        linkUrl: form.linkUrl || undefined,
        linkLabel: form.linkLabel || undefined,
        priority: Number(form.priority) || 0,
        // Empty means no bound, which the model stores as null.
        startsAt: form.startsAt ? new Date(form.startsAt).toISOString() : null,
        endsAt: form.endsAt ? new Date(form.endsAt).toISOString() : null,
      };
      if (editing) {
        await apiClient.patch(`/admin/content/announcements/${editing.id}`, body);
        toast.success('Announcement updated');
      } else {
        await apiClient.post('/admin/content/announcements', body);
        toast.success('Announcement created');
      }
      setShowForm(false);
      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Could not save');
    } finally {
      setSubmitting(false);
    }
  };

  const toggle = async (a) => {
    try {
      const { data } = await apiClient.post(`/admin/content/announcements/${a.id}/toggle`);
      // The API says what the visitor will actually see, which is not always
      // the same as what was just switched.
      toast.success(data.message);
      fetchItems();
    } catch {
      toast.error('Could not change status');
    }
  };

  const remove = async (a) => {
    if (!window.confirm(`Delete this announcement?\n\n"${a.message}"`)) return;
    try {
      await apiClient.delete(`/admin/content/announcements/${a.id}`);
      toast.success('Announcement deleted');
      fetchItems();
    } catch {
      toast.error('Could not delete');
    }
  };

  const field = (label, name, opts = {}) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: colors.textSecondary }}>{label}</label>
      {opts.textarea ? (
        <textarea rows={2} maxLength={200} value={form[name]}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          className="rounded-lg px-3 py-2 text-sm outline-none border"
          style={{ backgroundColor: colors.bgTertiary, borderColor: colors.border, color: colors.text }} />
      ) : (
        <input type={opts.type || 'text'} value={form[name]} placeholder={opts.placeholder}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          className="rounded-lg px-3 py-2 text-sm outline-none border"
          style={{ backgroundColor: colors.bgTertiary, borderColor: colors.border, color: colors.text }} />
      )}
      {opts.help && <p className="text-xs" style={{ color: colors.textMuted }}>{opts.help}</p>}
    </div>
  );

  if (loading) return <SkeletonCards count={2} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Announcement Bar</h2>
          <p className="text-sm mt-1 max-w-xl" style={{ color: colors.textMuted }}>
            The strip above the navigation, on every page. One shows at a time —
            the highest priority whose dates are open.
          </p>
        </div>
        <button type="button" onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
          style={{ backgroundColor: colors.primary }}>
          <Plus size={16} /> New announcement
        </button>
      </div>

      {error && (
        <div className="rounded-xl border p-4" style={{ backgroundColor: colors.errorBg, borderColor: colors.error + '30' }}>
          <p style={{ color: colors.error }}>{error}</p>
        </div>
      )}

      {!items.length && !error ? (
        <EmptyState icon={Megaphone} title="No announcements"
          message="Nothing is showing above the navigation. Create one to put a message there." />
      ) : (
        <div className="space-y-3">
          {items.map((a) => {
            const st = statusOf(a);
            return (
              <motion.div key={a.id} layout
                className="rounded-xl border p-5"
                style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    {/* Shown the way a visitor sees it, not as a form value. */}
                    <div className="mb-3 rounded-lg px-4 py-2.5 text-sm text-white"
                      style={{ backgroundColor: colors.primary }}>
                      {a.message}
                      {a.linkUrl && (
                        <span className="ml-2 font-bold underline underline-offset-2">
                          {a.linkLabel || 'Find out more'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: colors.textMuted }}>
                      {st.note}
                      {a.priority ? ` · Priority ${a.priority}` : ''}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold"
                    style={{ backgroundColor: tone[st.tone].bg, color: tone[st.tone].fg }}>
                    {st.label}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 border-t pt-3" style={{ borderColor: colors.borderLight }}>
                  <button type="button" onClick={() => openEdit(a)}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                    style={{ backgroundColor: colors.bgTertiary, color: colors.text }}>Edit</button>
                  <button type="button" onClick={() => toggle(a)}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                    style={{ backgroundColor: a.isActive ? colors.warningBg : colors.successBg,
                             color: a.isActive ? colors.warning : colors.success }}>
                    {a.isActive ? 'Switch off' : 'Switch on'}
                  </button>
                  <button type="button" onClick={() => remove(a)}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                    style={{ backgroundColor: colors.errorBg, color: colors.error }}>Delete</button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 py-10"
            onClick={() => setShowForm(false)}>
            <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()} onSubmit={submit}
              className="w-full max-w-xl rounded-2xl border p-6 flex flex-col gap-4"
              style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}>
              <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                {editing ? 'Edit announcement' : 'New announcement'}
              </h3>

              {field('Message', 'message', {
                textarea: true,
                help: `${form.message.length}/200 characters. It sits on one line, so keep it short.`,
              })}

              {/* What the visitor will see, updating as it is typed. */}
              {form.message && (
                <div className="rounded-lg px-4 py-2.5 text-sm text-white" style={{ backgroundColor: colors.primary }}>
                  {form.message}
                  {form.linkUrl && (
                    <span className="ml-2 font-bold underline underline-offset-2">
                      {form.linkLabel || 'Find out more'}
                    </span>
                  )}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                {field('Link', 'linkUrl', {
                  placeholder: '/courses/cyber-ceo or https://…',
                  help: 'Optional. A path stays on the site; a full URL opens in a new tab.',
                })}
                {field('Link text', 'linkLabel', { placeholder: 'Find out more' })}
                {field('Starts', 'startsAt', { type: 'datetime-local', help: 'Leave blank to start now.' })}
                {field('Ends', 'endsAt', { type: 'datetime-local', help: 'Leave blank to run until switched off.' })}
              </div>

              {field('Priority', 'priority', {
                type: 'number',
                help: 'Higher wins when two announcements are open at once.',
              })}

              <div className="flex justify-end gap-3 border-t pt-4" style={{ borderColor: colors.borderLight }}>
                <button type="button" onClick={() => setShowForm(false)}
                  className="rounded-lg px-4 py-2 text-sm font-semibold"
                  style={{ backgroundColor: colors.bgTertiary, color: colors.text }}>Cancel</button>
                <button type="submit" disabled={submitting || !form.message.trim()}
                  className="rounded-lg px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  style={{ backgroundColor: colors.primary }}>
                  {submitting ? 'Saving…' : editing ? 'Save changes' : 'Create'}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
