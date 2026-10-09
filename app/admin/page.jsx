'use client';

import { useCallback, useEffect, useState } from 'react';
import { getBrowserSupabase, isSupabaseConfigured } from '@/lib/supabase';

/* ------------------------------------------------------------------ */
/* Resource definitions — edit fields here to change the admin forms   */
/* ------------------------------------------------------------------ */
const RESOURCES = {
  packages: {
    label: 'Packages',
    table: 'packages',
    nameField: 'name',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'description', label: 'Short description', type: 'textarea' },
      { name: 'content', label: 'Full content (HTML allowed)', type: 'textarea', rows: 6 },
      { name: 'image_path', label: 'Image', type: 'image' },
      { name: 'featured', label: 'Featured on homepage', type: 'checkbox' }
    ]
  },
  blog_posts: {
    label: 'Blog posts',
    table: 'blog_posts',
    nameField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'author', label: 'Author', type: 'text' },
      { name: 'content', label: 'Content (HTML allowed)', type: 'textarea', rows: 10, required: true },
      { name: 'image_path', label: 'Cover image', type: 'image' }
    ]
  },
  news: {
    label: 'News',
    table: 'news',
    nameField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'author', label: 'Author', type: 'text' },
      { name: 'content', label: 'Content (HTML allowed)', type: 'textarea', rows: 10, required: true },
      { name: 'image_path', label: 'Cover image', type: 'image' }
    ]
  },
  gallery: {
    label: 'Gallery',
    table: 'gallery',
    nameField: 'caption',
    fields: [
      { name: 'media_type', label: 'Media type', type: 'select', options: ['image', 'video'] },
      { name: 'image_path', label: 'Image (or YouTube thumbnail fallback)', type: 'image' },
      { name: 'video_url', label: 'Video URL (YouTube link)', type: 'text' },
      { name: 'caption', label: 'Caption', type: 'text' }
    ]
  },
  services: {
    label: 'Services',
    table: 'services',
    nameField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'text', label: 'Short text', type: 'textarea' },
      { name: 'content', label: 'Full content (HTML allowed)', type: 'textarea', rows: 6 },
      { name: 'image_path', label: 'Image', type: 'image' }
    ]
  },
  team: {
    label: 'Team',
    table: 'team',
    nameField: 'name',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'photo_path', label: 'Photo', type: 'image' }
    ]
  },
  destinations: {
    label: 'Destinations',
    table: 'destinations',
    nameField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'caption', label: 'Caption', type: 'text' },
      { name: 'image_path', label: 'Image', type: 'image' }
    ]
  }
};

const READONLY = {
  bookings: { label: 'Bookings', table: 'bookings', statusField: 'status' },
  messages: { label: 'Messages', table: 'messages' },
  subscribers: { label: 'Subscribers', table: 'subscribers' }
};

const SETTINGS_FIELDS = [
  { name: 'site_name', label: 'Site name', type: 'text' },
  { name: 'tagline', label: 'Tagline', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'text' },
  { name: 'address', label: 'Address', type: 'text' },
  { name: 'about', label: 'About text (shown on About page)', type: 'textarea', rows: 8 }
];

const inputCls =
  'w-full rounded-xl border border-forest/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-amber focus:ring-2 focus:ring-amber/30';

/* ================================================================== */
export default function AdminPage() {
  const [sb, setSb] = useState(null);
  const [session, setSession] = useState(undefined);
  const [tab, setTab] = useState('dashboard');

  useEffect(() => {
    if (!isSupabaseConfigured) { setSession(null); return; }
    const client = getBrowserSupabase();
    setSb(client);
    client.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = client.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <div className="grid min-h-screen place-items-center bg-forest-mist/40 text-forest">Loading…</div>;
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="grid min-h-screen place-items-center bg-forest-mist/40 px-5">
        <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <h1 className="font-display text-2xl font-semibold text-forest">Connect Supabase first</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/60">
            The admin panel needs a database. Create a free Supabase project, run{' '}
            <code className="rounded bg-sand px-1.5 py-0.5 text-xs">supabase/schema.sql</code>, then set
            <code className="mx-1 rounded bg-sand px-1.5 py-0.5 text-xs">NEXT_PUBLIC_SUPABASE_URL</code> and
            <code className="mx-1 rounded bg-sand px-1.5 py-0.5 text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
            Full steps are in the README.
          </p>
        </div>
      </div>
    );
  }

  if (!session) return <AdminLogin sb={sb} onLoggedIn={setSession} />;

  return (
    <div className="flex min-h-screen bg-forest-mist/40">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col bg-forest-deep p-5 text-cream/80 md:flex">
        <p className="mb-6 px-2 font-display text-lg font-semibold text-cream">
          Content <span className="text-amber">Manager</span>
        </p>
        <SideButton label="Dashboard" id="dashboard" tab={tab} setTab={setTab} icon="▦" />
        <p className="mb-1 mt-6 px-2 text-[10px] font-bold uppercase tracking-[0.25em] text-cream/40">Content</p>
        {Object.entries(RESOURCES).map(([id, r]) => (
          <SideButton key={id} label={r.label} id={id} tab={tab} setTab={setTab} />
        ))}
        <p className="mb-1 mt-6 px-2 text-[10px] font-bold uppercase tracking-[0.25em] text-cream/40">Inbox</p>
        {Object.entries(READONLY).map(([id, r]) => (
          <SideButton key={id} label={r.label} id={id} tab={tab} setTab={setTab} />
        ))}
        <SideButton label="Settings" id="settings" tab={tab} setTab={setTab} icon="⚙" />
        <button
          onClick={async () => { await sb.auth.signOut(); setSession(null); }}
          className="mt-auto rounded-xl px-3 py-2.5 text-left text-sm text-cream/70 transition hover:bg-cream/10 hover:text-cream"
        >
          Sign out
        </button>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1 p-5 md:p-8">
        {/* Mobile tabs */}
        <select
          className="mb-5 w-full rounded-xl border border-forest/15 bg-white px-3 py-2.5 text-sm md:hidden"
          value={tab}
          onChange={(e) => setTab(e.target.value)}
        >
          <option value="dashboard">Dashboard</option>
          {Object.entries(RESOURCES).map(([id, r]) => <option key={id} value={id}>{r.label}</option>)}
          {Object.entries(READONLY).map(([id, r]) => <option key={id} value={id}>{r.label}</option>)}
          <option value="settings">Settings</option>
        </select>

        {tab === 'dashboard' && <Dashboard sb={sb} setTab={setTab} />}
        {RESOURCES[tab] && <CrudPanel key={tab} sb={sb} def={RESOURCES[tab]} />}
        {READONLY[tab] && <InboxPanel key={tab} sb={sb} def={READONLY[tab]} />}
        {tab === 'settings' && <SettingsPanel sb={sb} />}
      </div>
    </div>
  );
}

function SideButton({ label, id, tab, setTab, icon }) {
  const active = tab === id;
  return (
    <button
      onClick={() => setTab(id)}
      className={`mb-0.5 rounded-xl px-3 py-2.5 text-left text-sm transition ${
        active ? 'bg-amber font-semibold text-forest-deep' : 'hover:bg-cream/10 hover:text-cream'
      }`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
}

/* ------------------------- Login gate ----------------------------- */
function AdminLogin({ sb, onLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(''); setBusy(true);
    const { data, error: err } = await sb.auth.signInWithPassword({ email, password });
    if (err) setError(err.message);
    else onLoggedIn(data.session);
    setBusy(false);
  }

  return (
    <div className="grid min-h-screen place-items-center bg-forest px-5">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-cream/15 bg-cream/5 p-8 backdrop-blur">
        <h1 className="font-display text-2xl font-semibold text-cream">Admin Login</h1>
        <p className="mt-1 text-sm text-cream/60">Manage packages, blog, news, gallery & more.</p>
        {error && <div className="mt-4 rounded-xl bg-red-500/15 px-4 py-2.5 text-sm text-red-200">{error}</div>}
        <div className="mt-5 space-y-3">
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-cream/20 bg-cream/10 px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-amber focus:outline-none" />
          <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-cream/20 bg-cream/10 px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-amber focus:outline-none" />
        </div>
        <button disabled={busy} className="btn-amber mt-5 w-full disabled:opacity-60">
          {busy ? 'Signing in…' : 'Login'}
        </button>
      </form>
    </div>
  );
}

/* ------------------------- Dashboard ------------------------------ */
function Dashboard({ sb, setTab }) {
  const [counts, setCounts] = useState({});
  useEffect(() => {
    (async () => {
      const tables = [...Object.values(RESOURCES).map((r) => r.table), ...Object.values(READONLY).map((r) => r.table)];
      const out = {};
      await Promise.all(
        tables.map(async (t) => {
          const { count } = await sb.from(t).select('id', { count: 'exact', head: true });
          out[t] = count ?? 0;
        })
      );
      setCounts(out);
    })();
  }, [sb]);

  const cards = [
    ...Object.entries(RESOURCES).map(([id, r]) => ({ id, label: r.label, table: r.table, editable: true })),
    ...Object.entries(READONLY).map(([id, r]) => ({ id, label: r.label, table: r.table, editable: false }))
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-forest">Dashboard</h1>
      <p className="mt-1 text-sm text-ink/55">Everything on your website, at a glance.</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <button
            key={c.id}
            onClick={() => setTab(c.id)}
            className="rounded-3xl bg-white p-6 text-left shadow-sm ring-1 ring-forest/5 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/45">{c.label}</p>
            <p className="mt-2 font-display text-4xl font-semibold text-forest">{counts[c.table] ?? '–'}</p>
            <p className="mt-1 text-xs text-amber-dark">{c.editable ? 'Manage →' : 'View →'}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------- CRUD panel ----------------------------- */
function CrudPanel({ sb, def }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // {} = new, object = edit
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    const { data } = await sb.from(def.table).select('*').order('created_at', { ascending: false });
    setItems(data || []);
  }, [sb, def.table]);

  useEffect(() => { load(); }, [load]);

  async function save(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const rec = {};
    for (const f of def.fields) {
      let v = form.get(f.name);
      if (f.type === 'number') v = v === '' ? null : Number(v);
      if (f.type === 'checkbox') v = form.get(f.name) === 'on';
      if (v === '' && f.type !== 'text') v = null;
      rec[f.name] = v;
    }
    let err;
    if (editing?.id) ({ error: err } = await sb.from(def.table).update(rec).eq('id', editing.id));
    else ({ error: err } = await sb.from(def.table).insert(rec));
    if (err) setNotice('Error: ' + err.message);
    else { setNotice(editing?.id ? 'Saved changes.' : 'Item created.'); setEditing(null); load(); }
  }

  async function remove(id) {
    if (!confirm('Delete this item? This cannot be undone.')) return;
    const { error } = await sb.from(def.table).delete().eq('id', id);
    if (error) setNotice('Error: ' + error.message);
    else { setNotice('Deleted.'); load(); }
  }

  async function upload(file, done) {
    const path = `${Date.now()}-${file.name.replace(/[^\w.-]/g, '_')}`;
    const { error } = await sb.storage.from('media').upload(path, file);
    if (error) setNotice('Upload failed: ' + error.message);
    else done(sb.storage.from('media').getPublicUrl(path).data.publicUrl);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-forest">{def.label}</h1>
          <p className="mt-1 text-sm text-ink/55">{items.length} item{items.length === 1 ? '' : 's'}</p>
        </div>
        <button onClick={() => setEditing({})} className="btn-forest">+ Add new</button>
      </div>

      {notice && (
        <div className="mt-4 flex items-center justify-between rounded-xl bg-sand px-4 py-3 text-sm text-forest">
          {notice}
          <button onClick={() => setNotice('')} className="font-bold">×</button>
        </div>
      )}

      {/* Editor */}
      {editing && (
        <form onSubmit={save} className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-forest/5">
          <h2 className="font-display text-xl font-semibold text-forest">
            {editing.id ? 'Edit' : 'New'} {def.label.slice(0, -1) || def.label}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {def.fields.map((f) => (
              <Field
                key={f.name}
                f={f}
                value={editing[f.name]}
                onUpload={upload}
                full={f.type === 'textarea' || f.type === 'image'}
              />
            ))}
          </div>
          <div className="mt-6 flex gap-2">
            <button className="btn-forest" type="submit">{editing.id ? 'Save changes' : 'Create'}</button>
            <button type="button" onClick={() => setEditing(null)} className="btn-outline">Cancel</button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-forest/5">
        {items.length === 0 && <p className="p-8 text-center text-sm text-ink/50">Nothing here yet — click “Add new”.</p>}
        {items.map((it) => {
          const name = it[def.nameField] || it.title || it.name || it.caption || it.email || it.id;
          const img = it.image_path || it.photo_path;
          return (
            <div key={it.id} className="flex items-center gap-4 border-b border-forest/5 px-5 py-3.5 last:border-0">
              {img && (
                <img src={img} alt="" className="h-12 w-12 rounded-xl object-cover ring-1 ring-forest/10" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-forest">{String(name)}</p>
                <p className="text-xs text-ink/45">
                  {new Date(it.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  {it.featured ? ' · Featured' : ''}
                </p>
              </div>
              <button onClick={() => setEditing(it)} className="rounded-full bg-forest-mist px-4 py-1.5 text-xs font-semibold text-forest hover:bg-forest hover:text-cream">
                Edit
              </button>
              <button onClick={() => remove(it.id)} className="rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100">
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({ f, value, onUpload, full }) {
  const [url, setUrl] = useState(value ?? (f.type === 'checkbox' ? false : f.type === 'select' ? f.options[0] : ''));
  const cls = full ? 'sm:col-span-2' : '';

  if (f.type === 'textarea')
    return (
      <div className={cls}>
        <label className="label">{f.label}{f.required ? ' *' : ''}</label>
        <textarea name={f.name} rows={f.rows || 4} required={f.required} defaultValue={value ?? ''} className={inputCls} />
      </div>
    );
  if (f.type === 'select')
    return (
      <div className={cls}>
        <label className="label">{f.label}</label>
        <select name={f.name} defaultValue={value ?? f.options[0]} className={inputCls}>
          {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  if (f.type === 'checkbox')
    return (
      <div className={`${cls} flex items-center gap-2.5 pt-6`}>
        <input type="checkbox" name={f.name} id={f.name} defaultChecked={!!value} className="h-4 w-4 accent-[#D9A441]" />
        <label htmlFor={f.name} className="text-sm font-medium text-forest">{f.label}</label>
      </div>
    );
  if (f.type === 'image')
    return (
      <div className={cls}>
        <label className="label">{f.label}</label>
        <input type="hidden" name={f.name} value={url || ''} />
        <div className="flex flex-wrap items-center gap-3">
          {url && <img src={url} alt="" className="h-16 w-16 rounded-xl object-cover ring-1 ring-forest/10" />}
          <label className="cursor-pointer rounded-full bg-forest-mist px-4 py-2 text-xs font-semibold text-forest hover:bg-forest hover:text-cream">
            Upload image
            <input type="file" accept="image/*" className="hidden"
              onChange={(e) => e.target.files[0] && onUpload(e.target.files[0], setUrl)} />
          </label>
          <input value={url || ''} onChange={(e) => setUrl(e.target.value)} placeholder="…or paste an image URL"
            className="min-w-0 flex-1 rounded-xl border border-forest/15 px-3 py-2 text-xs outline-none focus:border-amber" />
        </div>
      </div>
    );
  return (
    <div className={cls}>
      <label className="label">{f.label}{f.required ? ' *' : ''}</label>
      <input name={f.name} type={f.type} required={f.required} defaultValue={value ?? ''} className={inputCls} />
    </div>
  );
}

/* ------------------------- Inbox ---------------------------------- */
function InboxPanel({ sb, def }) {
  const [items, setItems] = useState([]);
  const load = useCallback(async () => {
    const { data } = await sb.from(def.table).select('*').order('created_at', { ascending: false });
    setItems(data || []);
  }, [sb, def.table]);
  useEffect(() => { load(); }, [load]);

  async function remove(id) {
    if (!confirm('Delete this item?')) return;
    await sb.from(def.table).delete().eq('id', id);
    load();
  }

  async function setStatus(id, status) {
    await sb.from(def.table).update({ status }).eq('id', id);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-forest">{def.label}</h1>
      <p className="mt-1 text-sm text-ink/55">{items.length} item{items.length === 1 ? '' : 's'}</p>
      <div className="mt-6 space-y-4">
        {items.length === 0 && (
          <p className="rounded-3xl bg-white p-10 text-center text-sm text-ink/50 shadow-sm ring-1 ring-forest/5">
            Nothing here yet.
          </p>
        )}
        {items.map((it) => (
          <div key={it.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-forest/5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-forest">
                  {it.full_name || it.name || it.email}
                  {it.package_name && <span className="ml-2 text-sm font-normal text-ink/50">— {it.package_name}</span>}
                </p>
                <p className="text-xs text-ink/45">
                  {it.email} {it.phone && `· ${it.phone}`} · {new Date(it.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {def.statusField && (
                  <select
                    value={it.status || 'new'}
                    onChange={(e) => setStatus(it.id, e.target.value)}
                    className="rounded-full border border-forest/15 bg-white px-3 py-1.5 text-xs font-semibold text-forest"
                  >
                    {['new', 'confirmed', 'cancelled'].map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                )}
                <button onClick={() => remove(it.id)} className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100">
                  Delete
                </button>
              </div>
            </div>
            {it.subject && <p className="mt-2 text-sm font-medium text-ink/80">Subject: {it.subject}</p>}
            {it.dates && <p className="mt-1 text-sm text-ink/70">Dates: {it.dates} · People: {it.people} · Total: ${it.price_total}</p>}
            {(it.message || it.notes) && (
              <p className="mt-2 rounded-xl bg-sand/60 px-4 py-3 text-sm leading-relaxed text-ink/75">{it.message || it.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------- Settings ------------------------------- */
function SettingsPanel({ sb }) {
  const [settings, setSettings] = useState(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await sb.from('site_settings').select('*').eq('id', 1).single();
      setSettings(data || { id: 1 });
    })();
  }, [sb]);

  if (!settings) return <p className="text-forest">Loading…</p>;

  async function save(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const rec = { id: 1 };
    for (const f of SETTINGS_FIELDS) rec[f.name] = form.get(f.name);
    const { error } = await sb.from('site_settings').upsert(rec);
    setNotice(error ? 'Error: ' + error.message : 'Settings saved.');
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold text-forest">Site Settings</h1>
      <p className="mt-1 text-sm text-ink/55">Name, contact details and about text shown across the site.</p>
      {notice && <div className="mt-4 rounded-xl bg-sand px-4 py-3 text-sm text-forest">{notice}</div>}
      <form onSubmit={save} className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-forest/5">
        <div className="grid gap-4 sm:grid-cols-2">
          {SETTINGS_FIELDS.map((f) =>
            f.type === 'textarea' ? (
              <div key={f.name} className="sm:col-span-2">
                <label className="label">{f.label}</label>
                <textarea name={f.name} rows={f.rows} defaultValue={settings[f.name] ?? ''} className={inputCls} />
              </div>
            ) : (
              <div key={f.name}>
                <label className="label">{f.label}</label>
                <input name={f.name} defaultValue={settings[f.name] ?? ''} className={inputCls} />
              </div>
            )
          )}
        </div>
        <button className="btn-forest mt-6">Save settings</button>
      </form>
    </div>
  );
}
