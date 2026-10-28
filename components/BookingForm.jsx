'use client';
import { useState } from 'react';
import { getBrowserSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { Arrow, WhatsAppIcon } from './Icons';
import { whatsappLink } from '@/lib/contact';
export default function BookingForm({pkg,email='afghanechoes@gmail.com',whatsappNumber}) {
 const [done,setDone]=useState(null);
 const [error,setError]=useState('');
 const [saving,setSaving]=useState(false);
 async function submit(e) {
  e.preventDefault();setError('');setSaving(true);
  const f=new FormData(e.currentTarget);
  const booking={package_id:pkg.id,package_name:pkg.name,destination:pkg.location||'',dates:String(f.get('dates')||'').trim(),people:Number(f.get('people')),full_name:String(f.get('full_name')).trim(),email:String(f.get('email')).trim(),phone:String(f.get('phone')||'').trim(),notes:String(f.get('notes')||'').trim()};
  if(!booking.full_name||!booking.email||!Number.isInteger(booking.people)||booking.people<1||booking.people>100) {setError('Please enter your name, email, and a group size from 1 to 100.');setSaving(false);return;}
  try {
   const sb=getBrowserSupabase();
   if(sb) {const {error}=await sb.from('bookings').insert(booking);if(error) throw error;}
   setDone({...booking,saved:Boolean(sb)});
  } catch {setError('We could not save your request. Please try again, or email '+email+'.');}
  finally {setSaving(false);}
 }
 if(done){
  const subject='Journey enquiry: '+done.package_name;
  const body=['Journey: '+done.package_name,'Destination: '+done.destination,'Dates: '+(done.dates||'Flexible'),'People: '+done.people,'Name: '+done.full_name,'Email: '+done.email,'Phone: '+done.phone,'Notes: '+done.notes].join('\n');
  return <div className="rounded-2xl border border-forest/15 bg-white p-8">
   <p className="eyebrow">{done.saved?'YOUR NEXT CHAPTER':'ONE MORE STEP'}</p><h3 className="mt-4 text-3xl tracking-tight text-forest">{done.saved?'Request received.':'Your email draft is ready.'}</h3>
   <p className="mt-4 text-sm leading-relaxed text-ink/65">{done.saved?'Your request is saved in our booking inbox. Our team will contact you to discuss availability and the details.':'Online booking is not connected yet. Open the email draft below and press Send in your email app to send your request.'}</p>
   <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-sand/60 p-5 text-sm"><div><dt className="label">Journey</dt><dd>{done.package_name}</dd></div><div><dt className="label">Guests</dt><dd>{done.people}</dd></div><div><dt className="label">Dates</dt><dd>{done.dates||'Flexible'}</dd></div><div><dt className="label">Your name</dt><dd>{done.full_name}</dd></div></dl>
   {!done.saved&&<a className="btn-forest mt-6 w-full" href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}>Open email draft <Arrow/></a>}
   <a className="btn-amber mt-5 w-full" href={whatsappLink(whatsappNumber,body)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/> Continue on WhatsApp</a>
   <button onClick={()=>setDone(null)} className="mt-5 text-xs underline underline-offset-4 text-forest">Return to the form</button>
  </div>;
 }
 return <form onSubmit={submit} className="rounded-2xl border border-forest/15 bg-white p-7 shadow-xl shadow-forest/5">
  <p className="eyebrow">MAKE IT YOURS</p><h3 className="mt-3 text-3xl tracking-tight text-forest">A journey starts<br/>with a conversation.</h3>
  <p className="mt-3 mb-6 text-sm leading-relaxed text-ink/60">Share your dates and a little about yourself. We will take it from here.</p>
  <a className="booking-whatsapp" href={whatsappLink(whatsappNumber,`Hello Negin Khorasan! I’m interested in ${pkg.name}. Can you help me plan my trip?`)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/><span>Prefer a quick chat?<strong>Ask about this journey on WhatsApp</strong></span><Arrow/></a>
  {!isSupabaseConfigured&&<p className="form-notice">Online booking is being set up. This form prepares an email for you to send to our team.</p>}
  {error&&<p role="alert" className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
  <div className="grid gap-4 sm:grid-cols-2">
   <div className="sm:col-span-2"><label className="label" htmlFor="booking-package">Your journey</label><input id="booking-package" readOnly value={pkg.name} className="input !bg-sand/50"/></div>
   <div><label className="label" htmlFor="booking-dates">Preferred dates</label><input id="booking-dates" name="dates" maxLength={150} placeholder="e.g. 12–18 November" className="input"/></div>
   <div><label className="label" htmlFor="booking-people">Number of guests</label><input id="booking-people" name="people" type="number" min="1" max="100" step="1" required defaultValue="2" className="input"/></div>
   <div><label className="label" htmlFor="booking-name">Full name *</label><input id="booking-name" name="full_name" autoComplete="name" required maxLength={150} className="input"/></div>
   <div><label className="label" htmlFor="booking-email">Email *</label><input id="booking-email" name="email" type="email" autoComplete="email" required maxLength={254} className="input"/></div>
   <div className="sm:col-span-2"><label className="label" htmlFor="booking-phone">Phone / WhatsApp</label><input id="booking-phone" name="phone" type="tel" autoComplete="tel" maxLength={50} className="input"/></div>
   <div className="sm:col-span-2"><label className="label" htmlFor="booking-notes">Anything on your mind?</label><textarea id="booking-notes" name="notes" rows="3" maxLength={3000} placeholder="Your interests, travel style, or questions…" className="input"/></div>
  </div><button disabled={saving} className="btn-forest mt-6 w-full">{saving?'Sending…':isSupabaseConfigured?'Request this journey':'Prepare email request'}<Arrow/></button><p className="mt-4 text-center text-[10px] text-ink/55">No payment required. Just possibilities.</p>
 </form>;
}
