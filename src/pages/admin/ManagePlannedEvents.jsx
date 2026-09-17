import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { CalendarClock, Plus, Users } from 'lucide-react';
import { apiClient } from '../../api/client';
import { useTheme } from '../../context/ThemeContext';
import { EVENT_ICON_NAMES } from '../../constants/eventIcons';
import { PlannedEventPreview } from './EventPreviews';
import EmptyState from '../../components/EmptyState';
import { SkeletonCards } from '../../components/Skeleton';

/**
 * Planned events — the ones published so people can register interest before a
 * date is committed.
 *
 * The slug is the load-bearing field on this screen. Interest signups are
 * stored against it as a plain string, so renaming one would silently detach
 * every person who put their hand up. The API refuses the change; this form
 * makes that visible rather than letting someone try and wonder why it did not
 * take.
 */

// Offered as a short list rather than free text, and read from the same module
// the public page resolves against — so the picker cannot offer an icon that
// does not ship. See constants/eventIcons.js for why that set is closed.
const ICONS = EVENT_ICON_NAMES;

const EMPTY = {
  slug: '', title: '', goal: 30, iconName: 'Sparkles',
  window: '', venue: '', format: '', pitch: '', signals: '',
  mediaUrl: '', mediaType: 'image',
};

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function ManagePlannedEvents() {
  const { colors } = useTheme();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [mediaFile, setMediaFile] = useState(null);
  // null when idle. A 5MB flyer over a Ghanaian mobile connection is a long
  // silence otherwise, and silence is indistinguishable from failure.
  const [uploadPct, setUploadPct] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchEvents = async () => {
    try {
      const { data } = await apiClient.get('/admin/content/planned-events');
      setEvents(data.events || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not load planned events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setMediaFile(null);
    setShowForm(true);
  };

  const openEdit = (e) => {
    setEditing(e);
    setForm({
      slug: e.slug, title: e.title, goal: e.goal, iconName: e.iconName || 'Sparkles',
      window: e.window || '', venue: e.venue || '', format: e.format || '',
      pitch: e.pitch || '', signals: (e.signals || []).join(', '),
      // Deliberately blank when the artwork is one we uploaded: the field is
      // for pointing at media hosted elsewhere, and showing our own URL in it
      // invites an edit that would detach the record from its Cloudinary asset.
      mediaUrl: e.mediaCloudinaryId ? '' : e.mediaUrl || '',
      mediaType: e.mediaType || 'image',
    });
    setMediaFile(null);
    setShowForm(true);
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = new FormData();
      // slug is only sent on create; the API strips it from updates anyway.
      if (!editing) payload.append('slug', form.slug || slugify(form.title));
      ['title', 'goal', 'iconName', 'window', 'venue', 'format', 'pitch', 'signals', 'mediaUrl', 'mediaType']
        .forEach((k) => form[k] !== '' && payload.append(k, form[k]));
      if (mediaFile) {
        payload.append('image', mediaFile);
        // The file decides the type — picking a video makes it a video whatever
        // the dropdown said. `set`, not `append`: the loop above has already put
        // a mediaType in, and appending a second one sends both, which reaches
        // the API as an array and fails to cast.
        payload.set('mediaType', mediaFile.type.startsWith('video') ? 'video' : 'image');
      }

      // Only meaningful when a file is attached; without one the body is a
      // few hundred bytes and the bar would flash past at 100%.
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: mediaFile
          ? (e) => e.total && setUploadPct(Math.round((e.loaded / e.total) * 100))
          : undefined,
      };

      if (editing) {
        await apiClient.patch(`/admin/content/planned-events/${editing.id}`, payload, config);
        toast.success(mediaFile ? 'Saved — artwork uploaded' : 'Planned event updated');
      } else {
        await apiClient.post('/admin/content/planned-events', payload, config);
        toast.success(mediaFile ? 'Created — artwork uploaded' : 'Planned event created');
      }
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Could not save');
    } finally {
      setSubmitting(false);
      setUploadPct(null);
    }
  };

  const toggle = async (e) => {
    // Optimistic: the row flips immediately and is put back if the call fails.
    setEvents((prev) => prev.map((x) => (x.id === e.id ? { ...x, isActive: !x.isActive } : x)));
    try {
      await apiClient.post(`/admin/content/planned-events/${e.id}/toggle`);
    } catch {
      setEvents((prev) => prev.map((x) => (x.id === e.id ? { ...x, isActive: e.isActive } : x)));
      toast.error('Could not change visibility');
    }
  };

  const remove = async (e) => {
    const warn = e.interestCount
      ? `Delete "${e.title}"?\n\n${e.interestCount} interest signup(s) were collected for this event. They are kept, not deleted — but nothing on the site will show them any more.`
      : `Delete "${e.title}"?`;
    if (!window.confirm(warn)) return;
    try {
      await apiClient.delete(`/admin/content/planned-events/${e.id}`);
      toast.success('Planned event deleted');
      fetchEvents();
    } catch {
      toast.error('Could not delete');
    }
  };

  const field = (label, name, opts = {}) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: colors.textSecondary }}>
        {label}
      </label>
      {opts.textarea ? (
        <textarea
          rows={opts.rows || 3}
          value={form[name]}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          className="rounded-lg px-3 py-2 text-sm outline-none border"
          style={{ backgroundColor: colors.bgTertiary, borderColor: colors.border, color: colors.text }}
        />
      ) : opts.options ? (
        <select
          value={form[name]}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          className="rounded-lg px-3 py-2 text-sm outline-none border"
          style={{ backgroundColor: colors.bgTertiary, borderColor: colors.border, color: colors.text }}
        >
          {opts.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={opts.type || 'text'}
          value={form[name]}
          disabled={opts.disabled}
          placeholder={opts.placeholder}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          className="rounded-lg px-3 py-2 text-sm outline-none border disabled:opacity-60"
          style={{ backgroundColor: colors.bgTertiary, borderColor: colors.border, color: colors.text }}
        />
      )}
      {opts.help && (
        <p className="text-xs" style={{ color: colors.textMuted }}>{opts.help}</p>
      )}
    </div>
  );

  if (loading) return <SkeletonCards count={3} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Planned Events</h2>
          <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
            Published without a date so people can register interest. The ones with
            the most demand are the ones worth booking.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
          style={{ backgroundColor: colors.primary }}
        >
          <Plus size={16} /> New planned event
        </button>
      </div>

      {error && (
        <div className="rounded-xl border p-4" style={{ backgroundColor: colors.errorBg, borderColor: colors.error + '30' }}>
          <p style={{ color: colors.error }}>{error}</p>
        </div>
      )}

      {!events.length && !error ? (
        <EmptyState
          icon={CalendarClock}
          title="No planned events yet"
          message="Until one is added here, the site shows the built-in list."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {events.map((e) => (
            <motion.div
              key={e.id}
              layout
              className="overflow-hidden rounded-xl border flex flex-col"
              style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
            >
              {/* The artwork was missing from this list entirely, which made a
                  replaced image look like a failed upload: there was simply
                  nowhere on the screen for it to appear. The cache-busting
                  parameter is for the browser, not the API — a replaced asset
                  gets a new Cloudinary URL, but this costs nothing and removes
                  any doubt about what is being looked at. */}
              {e.mediaUrl ? (
                e.mediaType === 'video' ? (
                  <video src={e.mediaUrl} muted loop autoPlay playsInline
                    className="h-28 w-full object-cover" />
                ) : (
                  <img src={`${e.mediaUrl}?v=${e.updatedAt || ''}`} alt=""
                    className="h-28 w-full object-cover" loading="lazy" />
                )
              ) : (
                <div className="flex h-28 w-full items-center justify-center text-xs"
                     style={{ backgroundColor: colors.bgTertiary, color: colors.textMuted }}>
                  No artwork
                </div>
              )}

              <div className="flex flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold leading-snug" style={{ color: colors.text }}>{e.title}</h3>
                <span
                  className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{
                    backgroundColor: e.isActive ? colors.successBg : colors.bgTertiary,
                    color: e.isActive ? colors.success : colors.textMuted,
                  }}
                >
                  {e.isActive ? 'Live' : 'Hidden'}
                </span>
              </div>

              <p className="font-mono text-[11px]" style={{ color: colors.textMuted }}>{e.slug}</p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: colors.textSecondary }}>
                {e.window && <span>{e.window}</span>}
                <span className="inline-flex items-center gap-1">
                  <Users size={13} style={{ color: colors.primary }} />
                  {e.interestCount ?? 0} of {e.goal} interested
                </span>
              </div>

              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: colors.bgTertiary }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, ((e.interestCount ?? 0) / (e.goal || 1)) * 100)}%`,
                    backgroundColor: colors.primary,
                  }}
                />
              </div>

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
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 py-10"
            onClick={() => setShowForm(false)}
          >
            <motion.form
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={submit}
              className="w-full max-w-5xl rounded-2xl border p-6"
              style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
            >
              <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                {editing ? 'Edit planned event' : 'New planned event'}
              </h3>

              {/* Fields left, live preview right. The preview is sticky so it
                  stays in view while the pitch is being written near the
                  bottom of a long form. */}
              <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
                <div className="flex flex-col gap-4">

              <div className="grid gap-4 sm:grid-cols-2">
                {field('Title', 'title')}
                {field(
                  'Slug',
                  'slug',
                  editing
                    ? { disabled: true,
                        help: `Fixed. ${editing.interestCount ?? 0} interest signup(s) are stored against this slug — changing it would detach them.` }
                    : { placeholder: slugify(form.title) || 'e.g. hthm-kumasi',
                        help: 'Used to link interest signups. Cannot be changed later.' }
                )}
                {field('Interest goal', 'goal', { type: 'number' })}
                {field('Icon', 'iconName', { options: ICONS })}
                {field('Timing', 'window', { placeholder: 'Targeting Q1 2027' })}
                {field('Venue', 'venue', { placeholder: 'Kumasi — venue to be confirmed' })}
              </div>

              {field('Format', 'format', { placeholder: 'Half-day workshop · In person' })}
              {field('Pitch', 'pitch', { textarea: true, rows: 3,
                help: 'The paragraph on the card — why this event, and why here.' })}
              {field('Signals', 'signals', {
                placeholder: 'Free to attend, Open to everyone, Limited seats',
                help: 'Comma separated. Shown as small chips on the card.' })}

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                  Artwork
                </label>

                {/* What is on the record now. Without this the only way to know
                    whether an event already has artwork is to go and look at the
                    site. */}
                {editing?.mediaUrl && !mediaFile && (
                  <div className="flex items-center gap-3 rounded-lg border p-2"
                       style={{ borderColor: colors.borderLight }}>
                    {editing.mediaType === 'video' ? (
                      <video src={editing.mediaUrl} muted className="h-12 w-16 rounded object-cover" />
                    ) : (
                      <img src={editing.mediaUrl} alt="" className="h-12 w-16 rounded object-cover" />
                    )}
                    <span className="text-xs" style={{ color: colors.textMuted }}>
                      Current artwork. Choosing a file below replaces it.
                    </span>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
                  className="text-sm"
                  style={{ color: colors.textSecondary }}
                />

                {/* Nothing has left the browser yet at this point — the file only
                    uploads on save — so this says "ready to upload", not
                    "uploaded". Claiming the latter here would be a lie that only
                    surfaces when the save fails. */}
                {mediaFile && (
                  <div className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2"
                       style={{ borderColor: colors.primary, backgroundColor: colors.bgTertiary }}>
                    <span className="min-w-0 text-xs" style={{ color: colors.text }}>
                      <span className="block truncate font-semibold">{mediaFile.name}</span>
                      <span style={{ color: colors.textMuted }}>
                        {(mediaFile.size / 1024 / 1024).toFixed(2)} MB — ready to upload on save
                        {mediaFile.size > 5 * 1024 * 1024 && ' · over the 5MB limit'}
                      </span>
                    </span>
                    <button type="button" onClick={() => setMediaFile(null)}
                      className="shrink-0 rounded px-2 py-1 text-xs font-semibold"
                      style={{ color: colors.textMuted }}>
                      Remove
                    </button>
                  </div>
                )}

                {uploadPct !== null && (
                  <div className="flex flex-col gap-1">
                    <div className="h-1.5 overflow-hidden rounded-full"
                         style={{ backgroundColor: colors.bgTertiary }}>
                      <div className="h-full rounded-full transition-all duration-200"
                           style={{ width: `${uploadPct}%`, backgroundColor: colors.primary }} />
                    </div>
                    <span className="text-xs" style={{ color: colors.textMuted }}>
                      {uploadPct < 100 ? `Uploading ${uploadPct}%` : 'Processing on the server…'}
                    </span>
                  </div>
                )}

                <p className="text-xs" style={{ color: colors.textMuted }}>
                  JPEG, PNG, WebP or GIF, up to 5MB. Optional — the card works
                  without one.
                </p>
              </div>

              {/* Uploads are restricted to images on purpose: the file filter that
                  enforces that is shared with courses, blogs and popups, and
                  widening it here would widen it everywhere. A card that needs
                  video points at an already-hosted file instead — which is the
                  only reason this field still exists. It stays empty for artwork
                  we host ourselves. */}
              <details className="rounded-lg border px-3 py-2" style={{ borderColor: colors.borderLight }}>
                <summary className="cursor-pointer text-xs font-semibold" style={{ color: colors.textSecondary }}>
                  Use video, or media hosted elsewhere
                </summary>
                <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_auto]">
                  {field('Link to hosted media', 'mediaUrl', {
                    placeholder: 'https://…/flyer.mp4',
                    help: 'Uploads accept images only, so a video goes here as a URL.',
                  })}
                  {field('Media type', 'mediaType', { options: ['image', 'video'] })}
                </div>
              </details>
                </div>

                <div className="lg:sticky lg:top-0 lg:self-start">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider"
                     style={{ color: colors.textMuted }}>
                    Live preview
                  </p>
                  {/* storedMediaUrl is passed separately because the form field is
                      deliberately blank for artwork we host ourselves — without it,
                      an event with a perfectly good image previews as "No artwork
                      yet", which is exactly the wrong signal. */}
                  <PlannedEventPreview
                    form={form}
                    file={mediaFile}
                    storedMediaUrl={editing?.mediaUrl}
                    storedMediaType={editing?.mediaType}
                    interestCount={editing?.interestCount ?? 0}
                  />
                  <p className="mt-2 text-xs" style={{ color: colors.textMuted }}>
                    Close to how it appears on the events page. The real card
                    changes size depending on which event has the most interest.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-3 border-t pt-4" style={{ borderColor: colors.borderLight }}>
                <button type="button" onClick={() => setShowForm(false)}
                  className="rounded-lg px-4 py-2 text-sm font-semibold"
                  style={{ backgroundColor: colors.bgTertiary, color: colors.text }}>Cancel</button>
                <button type="submit" disabled={submitting}
                  className="rounded-lg px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  style={{ backgroundColor: colors.primary }}>
                  {submitting
                    ? uploadPct !== null && uploadPct < 100
                      ? `Uploading ${uploadPct}%`
                      : 'Saving…'
                    : editing ? 'Save changes' : 'Create'}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
