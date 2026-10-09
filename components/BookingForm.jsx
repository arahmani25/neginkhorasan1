'use client';

import { useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase';

const BOOKING_EMAIL = 'afghanechoes@gmail.com';

export default function BookingForm({ pkg }) {
  const [people, setPeople] = useState(2);
  const [done, setDone] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    const f = new FormData(e.target);
    const booking = {
      package_id: pkg.id,
      package_name: pkg.name,
      destination: pkg.location || '',
      dates: f.get('dates') || '',
      people: Math.max(1, people),
      full_name: (f.get('full_name') || '').trim(),
      email: (f.get('email') || '').trim(),
      phone: (f.get('phone') || '').trim(),
      notes: (f.get('notes') || '').trim()
    };
    if (!booking.full_name || !booking.email) {
      setError('Please fill in your full name and email.');
      return;
    }
    setSaving(true);
    const sb = getBrowserSupabase();
    let saved = booking;
    if (sb) {
      const { data, error: err } = await sb.from('bookings').insert(booking).select().single();
      if (err) {
        setError('Could not save your booking. Please try again or contact us directly.');
        setSaving(false);
        return;
      }
      saved = data;
    } else {
      saved = { ...booking, id: 'DEMO-' + Date.now().toString().slice(-6), demo: true };
    }
    setSaving(false);
    setDone(saved);

    // Notify the team: open the visitor's email app pre-addressed to the booking inbox
    const subject = `New booking: ${saved.package_name} — ${saved.full_name}`;
    const body = [
      `Package: ${saved.package_name}`,
      `Destination: ${saved.destination || '-'}`,
      `Dates: ${saved.dates || 'Flexible'}`,
      `People: ${saved.people}`,
      ``,
      `Name: ${saved.full_name}`,
      `Email: ${saved.email}`,
      `Phone: ${saved.phone || '-'}`,
      ``,
      `Notes: ${saved.notes || '-'}`
    ].join('\n');
    window.location.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-forest/5">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-mist">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#12403C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold text-forest">Request Received</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/60">
          Thank you! We have opened your email app with the booking details — just press
          <strong> Send</strong> and our team at <strong>{BOOKING_EMAIL}</strong> will confirm
          your trip shortly.
          {done.demo && <span className="block mt-1 text-xs">(Demo mode — connect Supabase to store bookings in a database.)</span>}
        </p>
        <div className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3 text-left text-sm">
          <div><p className="label !mb-0.5">Package</p><p className="font-medium">{done.package_name}</p></div>
          <div><p className="label !mb-0.5">Dates</p><p className="font-medium">{done.dates || 'Flexible'}</p></div>
          <div><p className="label !mb-0.5">People</p><p className="font-medium">{done.people}</p></div>
          <div><p className="label !mb-0.5">Name</p><p className="font-medium">{done.full_name}</p></div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white p-7 shadow-xl ring-1 ring-forest/5">
      <h3 className="font-display text-2xl font-semibold text-forest">Book this journey</h3>
      <p className="mt-1 text-sm text-ink/55">
        Tell us your dates and group size — we will confirm availability and details by email.
      </p>

      {error && <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label">Package</label>
          <input className="input bg-sand/50" value={pkg.name} readOnly />
        </div>
        <div>
          <label className="label">Preferred dates</label>
          <input name="dates" className="input" placeholder="e.g. 12–18 Nov" />
        </div>
        <div>
          <label className="label">People</label>
          <input
            type="number" min="1" value={people}
            onChange={(e) => setPeople(Math.max(1, +e.target.value || 1))}
            className="input"
          />
        </div>
        <div>
          <label className="label">Full name *</label>
          <input name="full_name" required className="input" />
        </div>
        <div>
          <label className="label">Email *</label>
          <input name="email" type="email" required className="input" />
        </div>
        <div>
          <label className="label">Phone / WhatsApp</label>
          <input name="phone" className="input" />
        </div>
        <div>
          <label className="label">Notes</label>
          <input name="notes" className="input" placeholder="Anything we should know?" />
        </div>
      </div>

      <button disabled={saving} className="btn-forest mt-6 w-full disabled:opacity-60">
        {saving ? 'Sending…' : 'Request Booking'}
      </button>
      <p className="mt-3 text-center text-xs text-ink/45">
        Your request is sent straight to our team — no payment needed now.
      </p>
    </form>
  );
}
