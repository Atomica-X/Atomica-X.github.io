import { useState, FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      toast.success('Welcome back!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <svg
            className="w-16 h-16 mb-4"
            viewBox="0 0 256 256"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M128 0 L128 64 A64 64 0 0 1 64 128 L0 128 L0 0 Z" />
            <path d="M128 0 L256 0 L256 128 L192 128 A64 64 0 0 1 128 64 Z" />
            <path d="M0 128 L64 128 A64 64 0 0 1 128 192 L128 256 L0 256 Z" />
            <path d="M128 256 L128 192 A64 64 0 0 1 192 128 L256 128 L256 256 Z" />
          </svg>
          <span className="text-white text-xs tracking-[0.4em] font-light">
            A T O M I C A
          </span>
          <h1 className="text-white text-2xl font-medium mt-4">Admin Login</h1>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-white/60 text-sm mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="admin@atomica.io"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-white/60 text-sm mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed btn-cut"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-white/50 text-sm hover:text-white/70 transition-colors"
            >
              ← Back to website
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-white/40 text-xs">
          <p>Default credentials:</p>
          <p>Email: admin@atomica.io</p>
          <p>Password: (Set in Supabase Auth)</p>
        </div>
      </div>
    </div>
  );
}
