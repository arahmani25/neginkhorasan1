'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserSupabase, isSupabaseConfigured } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const sb = getBrowserSupabase();
    if (sb) sb.auth.getSession().then(({ data }) => {
      if (data.session) router.push('/admin');
    });
  }, [router]);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    const sb = getBrowserSupabase();
    if (!sb) {
      setError('Supabase is not configured yet. Add your project URL and anon key first (see README).');
      setBusy(false);
      return;
    }
    const { error: err } = await sb.auth.signInWithPassword({ email, password });
    if (err) setError(err.message);
    else router.push('/admin');
    setBusy(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-forest to-forest-deep px-5 pt-20">
      <div className="w-full max-w-md rounded-[2rem] border border-cream/15 bg-cream/5 p-8 shadow-2xl backdrop-blur-md">
        <h1 className="font-display text-3xl font-semibold text-cream">Welcome back</h1>
        <p className="mt-1 text-sm text-cream/70">Sign in to manage your website content.</p>

        {error && <div className="mt-5 rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200">{error}</div>}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="login-email" className="label !text-cream/60">Email</label>
            <input
              id="login-email" autoComplete="username" type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input !border-cream/20 !bg-cream/10 !text-cream placeholder:!text-cream/40 focus:!border-amber"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="label !text-cream/60">Password</label>
            <input
              id="login-password" autoComplete="current-password" type="password" required value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input !border-cream/20 !bg-cream/10 !text-cream placeholder:!text-cream/40 focus:!border-amber"
              placeholder="••••••••"
            />
          </div>
          <button disabled={busy} className="btn-amber w-full disabled:opacity-60">
            {busy ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-cream/50">
          Staff only area · Create users in Supabase → Authentication
        </p>
      </div>
    </div>
  );
}
