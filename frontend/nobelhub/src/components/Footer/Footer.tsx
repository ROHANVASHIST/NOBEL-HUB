// =============================================
// Footer Component
// =============================================
import { Link } from 'react-router-dom';
import { Award, Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import './Footer.css';

const FOOTER_LINKS = {
    Discover: [
        { label: 'Laureates', path: '/laureates' },
        { label: 'Lectures', path: '/lectures' },
        { label: 'Research', path: '/research' },
        { label: 'Analytics', path: '/analytics' },
        { label: 'Search', path: '/search' },
    ],
    Categories: [
        { label: 'Physics', path: '/laureates?category=Physics' },
        { label: 'Chemistry', path: '/laureates?category=Chemistry' },
        { label: 'Medicine', path: '/laureates?category=Medicine' },
        { label: 'Literature', path: '/laureates?category=Literature' },
        { label: 'Peace', path: '/laureates?category=Peace' },
        { label: 'Economic Sciences', path: '/laureates?category=Economic Sciences' },
    ],
    Support: [
        { label: 'Documentation', path: '/legal' },
        { label: 'Pricing', path: '/pricing' },
        { label: 'API Reference', path: '/legal' },
        { label: 'Support Center', path: '/legal' },
    ],
    Legal: [
        { label: 'Privacy Policy', path: '/legal' },
        { label: 'Terms of Use', path: '/legal' },
        { label: 'Cookie Policy', path: '/legal' },
        { label: 'Ethics Guidelines', path: '/legal' },
    ],
};

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    {/* Brand */}
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <span className="footer__logo-icon"><Award size={20} /></span>
                            <span>Nobel<span className="text-gold">Hub</span></span>
                        </Link>
                        <p className="footer__tagline">
                            The world's leading platform for Nobel Prize research, lectures, and knowledge discovery. Spanning 125+ years of human achievement.
                        </p>
                        <div className="footer__socials">
                            <a href="https://twitter.com/nobelprize" target="_blank" rel="noreferrer" className="footer__social" aria-label="Twitter"><Twitter size={16} /></a>
                            <a href="https://github.com/nobelprize" target="_blank" rel="noreferrer" className="footer__social" aria-label="GitHub"><Github size={16} /></a>
                            <a href="https://linkedin.com/company/nobelprize" target="_blank" rel="noreferrer" className="footer__social" aria-label="LinkedIn"><Linkedin size={16} /></a>
                            <a href="mailto:info@nobelhub.org" className="footer__social" aria-label="Email"><Mail size={16} /></a>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
                        <div key={heading} className="footer__col">
                            <h4 className="footer__heading">{heading}</h4>
                            <ul className="footer__list">
                                {links.map(l => (
                                    <li key={l.label}>
                                        <Link to={l.path} className="footer__link">{l.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <hr className="divider" />

                <div className="footer__bottom">
                    <p className="footer__copy">
                        © 2026 NobelHub. All rights reserved. Nobel Prize data sourced from{' '}
                        <a href="https://nobelprize.org" target="_blank" rel="noreferrer" className="footer__ext-link">
                            nobelprize.org <ExternalLink size={11} />
                        </a>
                    </p>
                    <div className="footer__badges">
                        <span className="badge badge--green">WCAG 2.1 AA</span>
                        <span className="badge badge--blue">GDPR Compliant</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
