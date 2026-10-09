'use client';

import { useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase';

export default function ContactForm({ defaultSubject = '' }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    const f = new FormData(e.target);
    const msg = {
      name: f.get('name'),
      email: f.get('email'),
      subject: f.get('subject'),
      message: f.get('message')
    };
    setSaving(true);
    const sb = getBrowserSupabase();
    if (sb) {
      const { error: err } = await sb.from('messages').insert(msg);
      if (err) setError('Something went wrong. Please try again or email us directly.');
      else setDone(true);
    } else {
      setDone(true); // demo mode
    }
    setSaving(false);
  }

  if (done) {
    return (
      <div className="py-14 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-mist">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#12403C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold text-forest">Message Sent</h3>
        <p className="mt-2 text-sm text-ink/60">Thanks! Your message was sent. We will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <h2 className="font-display text-2xl font-semibold text-forest">Send us a message</h2>
      {error && <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Your name *</label>
          <input name="name" required className="input" />
        </div>
        <div>
          <label className="label">Email *</label>
          <input name="email" type="email" required className="input" />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Subject</label>
          <input name="subject" defaultValue={defaultSubject} className="input" />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Message *</label>
          <textarea name="message" rows="6" required className="input" />
        </div>
      </div>
      <button disabled={saving} className="btn-forest mt-6 disabled:opacity-60">
        {saving ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
