import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { History, Plus, Trash2, Images } from 'lucide-react';
import { apiClient } from '../../api/client';
import { useTheme } from '../../context/ThemeContext';
import EmptyState from '../../components/EmptyState';
import { SkeletonCards } from '../../components/Skeleton';

/**
 * Past events — the record of work already done.
 *
 * What makes this screen different from the other content screens is the
 * gallery: every past event carries several photographs rather than one. New
 * uploads are ADDED to the gallery; removing a photo is a separate, explicit
 * action. Anything else risks someone losing a whole gallery by attaching one
 * more picture.
 */

const EMPTY = {
  slug: '', title: '', year: String(new Date().getFullYear()),
  date: '', location: '', tag: '', stat: '', blurb: '',
};

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function ManagePastEvents() {
  const { colors } = useTheme();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [files, setFiles] = useState([]);
  const [removeIds, setRemoveIds] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchEvents = async () => {
    try {
      const { data } = await apiClient.get('/admin/content/past-events');
      setEvents(data.events || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not load past events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const openCreate = () => {
    setEditing(null); setForm(EMPTY); setFiles([]); setRemoveIds([]); setShowForm(true);
  };

  const openEdit = (e) => {
    setEditing(e);
    setForm({
      slug: e.slug, title: e.title, year: e.year, date: e.date || '',
      location: e.location || '', tag: e.tag || '', stat: e.stat || '', blurb: e.blurb || '',
    });
    setFiles([]); setRemoveIds([]); setShowForm(true);
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = new FormData();
      if (!editing) payload.append('slug', form.slug || slugify(form.title));
      ['title', 'year', 'date', 'location', 'tag', 'stat', 'blurb']
        .forEach((k) => form[k] !== '' && payload.append(k, form[k]));
      files.forEach((f) => payload.append('images', f));
      if (removeIds.length) payload.append('removePhotoIds', removeIds.join(','));

      if (editing) {
        await apiClient.patch(`/admin/content/past-events/${editing.id}`, payload,
          { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Past event updated');
      } else {
        await apiClient.post('/admin/content/past-events', payload,
          { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Past event created');
      }
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Could not save');
    } finally {
      setSubmitting(false);
    }
  };

  const toggle = async (e) => {
    setEvents((prev) => prev.map((x) => (x.id === e.id ? { ...x, isActive: !x.isActive } : x)));
    try {
      await apiClient.post(`/admin/content/past-events/${e.id}/toggle`);
    } catch {
      setEvents((prev) => prev.map((x) => (x.id === e.id ? { ...x, isActive: e.isActive } : x)));
      toast.error('Could not change visibility');
    }
  };

  const remove = async (e) => {
    const n = e.photos?.length || 0;
    if (!window.confirm(
      `Delete "${e.title}"?\n\n${n} photograph(s) will be permanently removed from storage. This cannot be undone.`
    )) return;
    try {
      await apiClient.delete(`/admin/content/past-events/${e.id}`);
      toast.success('Past event deleted');
      fetchEvents();
    } catch {
      toast.error('Could not delete');
    }
  };

  const field = (label, name, opts = {}) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: colors.textSecondary }}>{label}</label>
      {opts.textarea ? (
        <textarea rows={opts.rows || 3} value={form[name]}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          className="rounded-lg px-3 py-2 text-sm outline-none border"
          style={{ backgroundColor: colors.bgTertiary, borderColor: colors.border, color: colors.text }} />
      ) : (
        <input type={opts.type || 'text'} value={form[name]} disabled={opts.disabled}
          placeholder={opts.placeholder}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          className="rounded-lg px-3 py-2 text-sm outline-none border disabled:opacity-60"
          style={{ backgroundColor: colors.bgTertiary, borderColor: colors.border, color: colors.text }} />
      )}
      {opts.help && <p className="text-xs" style={{ color: colors.textMuted }}>{opts.help}</p>}
    </div>
  );

  if (loading) return <SkeletonCards count={3} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Past Events</h2>
          <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
            The record of work already delivered, grouped by year on the events page.
          </p>
        </div>
        <button type="button" onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
          style={{ backgroundColor: colors.primary }}>
          <Plus size={16} /> New past event
        </button>
      </div>

      {error && (
        <div className="rounded-xl border p-4" style={{ backgroundColor: colors.errorBg, borderColor: colors.error + '30' }}>
          <p style={{ color: colors.error }}>{error}</p>
        </div>
      )}

      {!events.length && !error ? (
        <EmptyState icon={History} title="No past events yet"
          message="Until one is added here, the site shows the built-in list." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {events.map((e) => (
            <motion.div key={e.id} layout
              className="rounded-xl border overflow-hidden flex flex-col"
              style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}>
              {e.image && (
                <img src={e.image} alt="" className="h-32 w-full object-cover" loading="lazy" />
              )}
              <div className="flex flex-col gap-2 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold leading-snug" style={{ color: colors.text }}>{e.title}</h3>
                  <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                    style={{ backgroundColor: e.isActive ? colors.successBg : colors.bgTertiary,
                             color: e.isActive ? colors.success : colors.textMuted }}>
                    {e.isActive ? 'Live' : 'Hidden'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs" style={{ color: colors.textSecondary }}>
                  <span>{e.year}</span>
                  {e.tag && <span>{e.tag}</span>}
                  <span className="inline-flex items-center gap-1">
                    <Images size={13} style={{ color: colors.primary }} />
                    {e.photos?.length || 0}
                  </span>
                </div>
                <p className="font-mono text-[11px]" style={{ color: colors.textMuted }}>{e.slug}</p>

                <div className="mt-2 flex flex-wrap gap-2 border-t pt-3" style={{ borderColor: colors.borderLight }}>
                  <button type="button" onClick={() => openEdit(e)}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                    style={{ backgroundColor: colors.bgTertiary, color: colors.text }}>Edit</button>
                  <button type="button" onClick={() => toggle(e)}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                    style={{ backgroundColor: e.isActive ? colors.warningBg : colors.successBg,
                             color: e.isActive ? colors.warning : colors.success }}>
                    {e.isActive ? 'Hide' : 'Show'}
                  </button>
                  <button type="button" onClick={() => remove(e)}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                    style={{ backgroundColor: colors.errorBg, color: colors.error }}>Delete</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 py-10"
            onClick={() => setShowForm(false)}>
            <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()} onSubmit={submit}
              className="w-full max-w-2xl rounded-2xl border p-6 flex flex-col gap-4"
              style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}>
              <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                {editing ? 'Edit past event' : 'New past event'}
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {field('Title', 'title')}
                {field('Slug', 'slug', editing
                  ? { disabled: true, help: 'Fixed once created.' }
                  : { placeholder: slugify(form.title) || 'e.g. gdiw-panel-2025' })}
                {field('Year', 'year', { help: 'Groups the event under the year filter.' })}
                {field('Date', 'date', { placeholder: '14 November 2025' })}
                {field('Location', 'location', { placeholder: 'Accra International Conference Centre' })}
                {field('Tag', 'tag', { placeholder: 'Conference · Youth · Schools' })}
              </div>

              {field('Headline figure', 'stat', { placeholder: 'Panel session · 120 students' })}
              {field('Blurb', 'blurb', { textarea: true, rows: 3 })}

              {/* Existing gallery — removal is explicit and staged until save. */}
              {editing?.photos?.length > 0 && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                    Current gallery ({editing.photos.length})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {editing.photos.map((p) => {
                      const going = removeIds.includes(p.cloudinaryId);
                      return (
                        <button key={p.cloudinaryId || p.url} type="button"
                          onClick={() => setRemoveIds((r) =>
                            going ? r.filter((x) => x !== p.cloudinaryId) : [...r, p.cloudinaryId])}
                          className="relative h-20 w-20 overflow-hidden rounded-lg border"
                          style={{ borderColor: going ? colors.error : colors.border,
                                   opacity: going ? 0.4 : 1 }}
                          title={going ? 'Will be removed on save — click to keep' : 'Click to remove on save'}>
                          <img src={p.url} alt="" className="h-full w-full object-cover" />
                          {going && (
                            <span className="absolute inset-0 flex items-center justify-center"
                              style={{ backgroundColor: colors.errorBg }}>
                              <Trash2 size={16} style={{ color: colors.error }} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {removeIds.length > 0 && (
                    <p className="text-xs" style={{ color: colors.error }}>
                      {removeIds.length} photo(s) will be deleted permanently when you save.
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                  Add photographs
                </label>
                <input type="file" accept="image/*" multiple
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                  className="text-sm" style={{ color: colors.textSecondary }} />
                <p className="text-xs" style={{ color: colors.textMuted }}>
                  Up to 10 at a time. These are added to the gallery, not replacing it.
                  {!editing && ' The first becomes the card image.'}
                </p>
              </div>

              <div className="flex justify-end gap-3 border-t pt-4" style={{ borderColor: colors.borderLight }}>
                <button type="button" onClick={() => setShowForm(false)}
                  className="rounded-lg px-4 py-2 text-sm font-semibold"
                  style={{ backgroundColor: colors.bgTertiary, color: colors.text }}>Cancel</button>
                <button type="submit" disabled={submitting}
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
