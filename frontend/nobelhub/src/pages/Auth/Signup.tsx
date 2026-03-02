// =============================================
// SignupPage – Registration UI
// =============================================
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function SignupPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mimic real auth flow
        setTimeout(() => {
            setLoading(false);
            login(email, fullName);
            navigate('/');
        }, 1500);
    };

    return (
        <main className="auth-page">
            <div className="auth-card card animate-fade-in-up">
                <div className="auth-header">
                    <Link to="/" className="navbar__logo" style={{ justifyContent: 'center', marginBottom: 20 }}>
                        <span className="navbar__logo-icon"><Award size={20} /></span>
                        <span>Nobel<span className="text-gold">Hub</span></span>
                    </Link>
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join the world's leading research community</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="fullname">Full Name</label>
                        <div className="search-wrapper">
                            <User size={16} className="search-icon" />
                            <input
                                id="fullname"
                                type="text"
                                placeholder="Dr. Sarah Researcher"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <div className="search-wrapper">
                            <Mail size={16} className="search-icon" />
                            <input
                                id="email"
                                type="email"
                                placeholder="sarah@university.edu"
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
                                <> <UserPlus size={16} /> Get Started </>
                            )}
                        </button>
                        <div className="auth-divider">Or join with</div>
                        <button
                            type="button"
                            className="btn btn--secondary"
                            style={{ width: '100%', justifyContent: 'center' }}
                            onClick={() => {
                                setLoading(true);
                                setTimeout(() => {
                                    setLoading(false);
                                    login('google.user@gmail.com', 'Google Scholar');
                                    navigate('/');
                                }, 1200);
                            }}
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: 16, height: 16 }} /> Sign up with Google
                        </button>
                    </div>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/auth/login" className="auth-link">Sign In</Link>
                </p>
            </div>
        </main>
    );
}
