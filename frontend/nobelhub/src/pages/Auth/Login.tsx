// =============================================
// LoginPage – Shared Auth UI
// =============================================
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mimic real auth flow
        setTimeout(() => {
            setLoading(false);
            const name = email.split('@')[0];
            login(email, name.charAt(0).toUpperCase() + name.slice(1));
            navigate('/');
        }, 1200);
    };

    return (
        <main className="auth-page">
            <div className="auth-card card animate-fade-in-up">
                <div className="auth-header">
                    <Link to="/" className="navbar__logo" style={{ justifyContent: 'center', marginBottom: 20 }}>
                        <span className="navbar__logo-icon"><Award size={20} /></span>
                        <span>Nobel<span className="text-gold">Hub</span></span>
                    </Link>
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Continue your journey through the Nobel archives</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <div className="search-wrapper">
                            <Mail size={16} className="search-icon" />
                            <input
                                id="email"
                                type="email"
                                placeholder="name@university.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <div className="search-wrapper">
                            <Lock size={16} className="search-icon" />
                            <input id="password" type="password" placeholder="••••••••" required />
                        </div>
                    </div>

                    <div className="auth-actions">
                        <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                            {loading ? (
                                <div className="spinner" style={{ width: 16, height: 16, borderTopColor: '#000' }} />
                            ) : (
                                <> <LogIn size={16} /> Sign In </>
                            )}
                        </button>
                        <div className="auth-divider">Or continue with</div>
                        <button
                            type="button"
                            className="btn btn--secondary"
                            style={{ width: '100%', justifyContent: 'center' }}
                            onClick={() => {
                                setLoading(true);
                                setTimeout(() => {
                                    setLoading(false);
                                    login('google.user@gmail.com', 'Google User');
                                    navigate('/');
                                }, 1000);
                            }}
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: 16, height: 16 }} /> Sign in with Google
                        </button>
                    </div>
                </form>

                <p className="auth-footer">
                    New here? <Link to="/auth/signup" className="auth-link">Create Account</Link>
                </p>
            </div>
        </main>
    );
}
