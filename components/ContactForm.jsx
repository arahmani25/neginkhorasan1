'use client';
import {useState} from 'react';
import {getBrowserSupabase,isSupabaseConfigured} from '@/lib/supabase';
import {Arrow} from './Icons';
export default function ContactForm({defaultSubject='',email='afghanechoes@gmail.com'}) {
 const [done,setDone]=useState(false),[draft,setDraft]=useState(null),[error,setError]=useState(''),[saving,setSaving]=useState(false);
 async function submit(e){
  e.preventDefault();setError('');setSaving(true);
  const form=new FormData(e.currentTarget);
  const msg={name:String(form.get('name')).trim(),email:String(form.get('email')).trim(),subject:String(form.get('subject')||'').trim(),message:String(form.get('message')).trim()};
  if(!msg.name||!msg.message){setError('Please enter your name and message.');setSaving(false);return;}
  try {
   const sb=getBrowserSupabase();
   if(!sb){setDraft(msg);return;}
   const {error}=await sb.from('messages').insert(msg);if(error)throw error;setDone(true);
  }catch{setError('Your message could not be saved. Please try again or email '+email+'.');}
  finally{setSaving(false);}
 }
 if(done) return <div className="py-12"><p className="eyebrow">THANK YOU FOR REACHING OUT</p><h2 className="mt-5 text-3xl tracking-tight text-forest">Your message is with us.</h2><p className="mt-4 text-sm leading-relaxed text-ink/65">Our team will get back to you using the email address you provided.</p><button className="text-link" onClick={()=>setDone(false)}>Send another message <Arrow/></button></div>;
 if(draft) return <div className="py-8"><p className="eyebrow">ONE MORE STEP</p><h2 className="mt-5 text-3xl tracking-tight text-forest">Your draft is ready.</h2><p className="mt-4 text-sm leading-relaxed text-ink/65">Open your email app and press Send to deliver this message. Nothing has been submitted online.</p><a className="btn-forest mt-7" href={`mailto:${email}?subject=${encodeURIComponent(draft.subject||'Travel enquiry')}&body=${encodeURIComponent('Name: '+draft.name+'\nEmail: '+draft.email+'\n\n'+draft.message)}`}>Open email draft <Arrow/></a><button className="block mt-6 text-xs underline text-forest" onClick={()=>setDraft(null)}>Edit message</button></div>;
 return <form onSubmit={submit}><p className="eyebrow">LET'S TALK TRAVEL</p><h2 className="mt-3 text-3xl tracking-tight text-forest">What are you dreaming of?</h2><p className="mt-3 mb-6 text-sm leading-relaxed text-ink/60">Big ideas, little questions. We would love to hear them.</p>
 {!isSupabaseConfigured&&<p className="form-notice">Online messaging is being set up. You can use this form to prepare an email to our team.</p>}
 {error&&<p role="alert" className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
 <div className="grid gap-5 sm:grid-cols-2">
 <div><label className="label" htmlFor="contact-name">Your name *</label><input id="contact-name" name="name" autoComplete="name" maxLength={150} required className="input"/></div>
 <div><label className="label" htmlFor="contact-email">Email *</label><input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required className="input"/></div>
 <div className="sm:col-span-2"><label className="label" htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" maxLength={200} defaultValue={defaultSubject} className="input"/></div>
 <div className="sm:col-span-2"><label className="label" htmlFor="contact-message">Your message *</label><textarea id="contact-message" name="message" rows="6" maxLength={5000} required className="input"/></div>
 </div><button disabled={saving} className="btn-forest mt-6">{saving?'Sending…':isSupabaseConfigured?'Send message':'Prepare email message'}<Arrow/></button></form>;
}
