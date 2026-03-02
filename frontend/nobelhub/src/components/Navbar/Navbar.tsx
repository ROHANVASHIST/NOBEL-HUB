// =============================================
// Navbar – Top Navigation Component
// =============================================
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Award, Search, BookOpen, Users, BarChart2,
    Library, Menu, X, ChevronRight, LogOut, User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const NAV_LINKS = [
    { label: 'Laureates', path: '/laureates', Icon: Users },
    { label: 'Lectures', path: '/lectures', Icon: Library },
    { label: 'Research', path: '/research', Icon: BookOpen },
    { label: 'Analytics', path: '/analytics', Icon: BarChart2 },
    { label: 'Search', path: '/search', Icon: Search },
];

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close menu on route change
    useEffect(() => { setMenuOpen(false); }, [location.pathname]);

    return (
        <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
            <nav className="navbar__inner container">
                {/* Logo */}
                <Link to="/" className="navbar__logo">
                    <span className="navbar__logo-icon">
                        <Award size={22} />
                    </span>
                    <span className="navbar__logo-text">
                        Nobel<span className="navbar__logo-accent">Hub</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <ul className="navbar__links">
                    {NAV_LINKS.map(({ label, path, Icon }) => (
                        <li key={path}>
                            <Link
                                to={path}
                                className={`navbar__link${location.pathname.startsWith(path) ? ' navbar__link--active' : ''}`}
                            >
                                <Icon size={15} />
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <div className="navbar__actions">
                    {isAuthenticated ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                            <div className="navbar__user" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                <User size={16} />
                                <span>{user?.name}</span>
                            </div>
                            <button onClick={logout} className="btn btn--ghost btn--sm" title="Log Out">
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/auth/login" className="btn btn--ghost btn--sm">Log In</Link>
                            <Link to="/auth/signup" className="btn btn--primary btn--sm">
                                Get Started <ChevronRight size={14} />
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="navbar__menu-toggle"
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Menu"
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="navbar__mobile-menu glass">
                    {NAV_LINKS.map(({ label, path, Icon }) => (
                        <Link
                            key={path}
                            to={path}
                            className={`navbar__mobile-link${location.pathname.startsWith(path) ? ' navbar__mobile-link--active' : ''}`}
                        >
                            <Icon size={17} />
                            {label}
                        </Link>
                    ))}
                    <hr className="divider" style={{ margin: '12px 0' }} />
                    {isAuthenticated ? (
                        <>
                            <div className="navbar__mobile-link">
                                <User size={17} />
                                <span>{user?.name}</span>
                            </div>
                            <button onClick={logout} className="btn btn--secondary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                                <LogOut size={17} /> Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/auth/login" className="btn btn--ghost" style={{ width: '100%', justifyContent: 'center' }}>Log In</Link>
                            <Link to="/auth/signup" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>Get Started</Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}
