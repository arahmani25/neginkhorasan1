'use client';

import { useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase';

const money = (n) =>
  '$' + Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function BookingForm({ pkg }) {
  const unit = Number(pkg.price || 0);
  const [people, setPeople] = useState(1);
  const [done, setDone] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const total = unit * Math.max(1, people);

  async function submit(e) {
    e.preventDefault();
    setError('');
    const f = new FormData(e.target);
    const booking = {
      package_id: pkg.id,
      package_name: pkg.name,
      destination: pkg.location || '',
      price_unit: unit,
      price_total: total,
      dates: f.get('dates') || '',
      people: Math.max(1, people),
      full_name: f.get('full_name') || '',
      email: f.get('email') || '',
      phone: f.get('phone') || '',
      notes: f.get('notes') || ''
    };
    if (!booking.full_name || !booking.email) {
      setError('Please fill in your full name and email.');
      return;
    }
    setSaving(true);
    const sb = getBrowserSupabase();
    if (sb) {
      const { data, error: err } = await sb.from('bookings').insert(booking).select().single();
      if (err) setError('Could not save your booking. Please try again or contact us directly.');
      else setDone(data);
    } else {
      // Demo mode — pretend success so the flow can be tested without Supabase
      setDone({ ...booking, id: 'DEMO-' + Date.now().toString().slice(-6), demo: true });
    }
    setSaving(false);
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-forest/5">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-mist text-3xl">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#12403C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold text-forest">Booking Received</h3>
        <p className="mt-2 text-sm text-ink/60">
          Your reference is <strong className="text-forest">#{String(done.id).slice(0, 8)}</strong>.
          We will confirm shortly{done.email ? <> at <strong>{done.email}</strong></> : null}.
          {done.demo && <span className="block mt-1 text-xs">(Demo mode — connect Supabase to store real bookings.)</span>}
        </p>
        <div className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3 text-left text-sm">
          <div><p className="label !mb-0.5">Package</p><p className="font-medium">{done.package_name}</p></div>
          <div><p className="label !mb-0.5">Total</p><p className="font-medium">{money(done.price_total)}</p></div>
          <div><p className="label !mb-0.5">Dates</p><p className="font-medium">{done.dates || 'Flexible'}</p></div>
          <div><p className="label !mb-0.5">People</p><p className="font-medium">{done.people}</p></div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white p-7 shadow-xl ring-1 ring-forest/5">
      <h3 className="font-display text-2xl font-semibold text-forest">Book this package</h3>
      <p className="mt-1 text-sm text-ink/55">Fill in your details and we will confirm shortly.</p>

      {error && <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label">Package</label>
          <input className="input bg-sand/50" value={pkg.name} readOnly />
        </div>
        <div>
          <label className="label">Dates</label>
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
        <div className="sm:col-span-2">
          <label className="label">Price</label>
          <input className="input bg-sand/50 font-semibold" value={money(total)} readOnly />
          {unit > 0 && (
            <p className="mt-1 text-xs text-ink/50">{money(unit)} × {Math.max(1, people)} = {money(total)}</p>
          )}
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
          <label className="label">Phone</label>
          <input name="phone" className="input" />
        </div>
        <div>
          <label className="label">Notes</label>
          <input name="notes" className="input" placeholder="Anything we should know?" />
        </div>
      </div>

      <button disabled={saving} className="btn-forest mt-6 w-full disabled:opacity-60">
        {saving ? 'Saving…' : 'Confirm Booking'}
      </button>
    </form>
  );
}
