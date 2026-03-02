// =============================================
// HomePage – Hero, Categories, Featured Content
// =============================================
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Search, Atom, FlaskConical, HeartPulse,
    BookOpen, Handshake, TrendingUp, Play,
    Eye, ArrowRight, Sparkles
} from 'lucide-react';
import CategoryBadge from '../../components/CategoryBadge/CategoryBadge';
import { LAUREATES, LECTURES, PLATFORM_STATS } from '../../data/mockData';
import type { Category } from '../../types';
import './Home.css';

/* ── Category config ──────────────────────── */
const CATEGORIES: { name: Category; Icon: React.ElementType; color: string; bg: string; count: number }[] = [
    { name: 'Physics', Icon: Atom, color: '#4f7eff', bg: 'rgba(79,126,255,0.12)', count: 228 },
    { name: 'Chemistry', Icon: FlaskConical, color: '#ff7b4f', bg: 'rgba(255,123,79,0.12)', count: 194 },
    { name: 'Medicine', Icon: HeartPulse, color: '#3dd68c', bg: 'rgba(61,214,140,0.12)', count: 228 },
    { name: 'Literature', Icon: BookOpen, color: '#9d6ffe', bg: 'rgba(157,111,254,0.12)', count: 121 },
    { name: 'Peace', Icon: Handshake, color: '#f5c842', bg: 'rgba(245,200,66,0.12)', count: 141 },
    { name: 'Economic Sciences', Icon: TrendingUp, color: '#ff4f91', bg: 'rgba(255,79,145,0.12)', count: 96 },
];

/* ── Helper: format view count ─────────────── */
function formatViews(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return String(n);
}

/* ── HomePage ─────────────────────────────── */
export default function HomePage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const featured = LAUREATES.slice(0, 4);
    const topLectures = LECTURES.slice(0, 4);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    return (
        <main>
            {/* ─── HERO ─────────────────────────────── */}
            <section className="hero">
                <div className="hero__bg">
                    <div className="hero__bg-gradient" />
                    <div className="hero__particles" />
                </div>
                <div className="container">
                    <div className="hero__inner animate-fade-in">
                        <div className="hero__pill">
                            <span className="hero__pill-dot" />
                            <Sparkles size={13} />
                            Nobel Prize Research Platform
                        </div>

                        <h1 className="hero__title">
                            Explore <span className="hero__title-highlight">125+ Years</span> of Nobel Prize Achievement
                        </h1>

                        <p className="hero__subtitle">
                            Discover laureate profiles, Nobel lectures, breakthrough research papers, and powerful analytics — all in one beautiful platform.
                        </p>

                        {/* Search Bar */}
                        <form className="hero__search" onSubmit={handleSearch}>
                            <Search size={20} className="hero__search-icon" />
                            <input
                                id="hero-search"
                                type="text"
                                className="hero__search-input"
                                placeholder="Search laureates, lectures, or research topics…"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                            />
                            <button type="submit" className="hero__search-btn">Search</button>
                        </form>

                        {/* Stats */}
                        <div className="hero__stats">
                            <div className="hero__stat">
                                <div className="hero__stat-num">{PLATFORM_STATS.totalLaureates.toLocaleString()}+</div>
                                <div className="hero__stat-label">Laureates</div>
                            </div>
                            <div className="hero__stat">
                                <div className="hero__stat-num">{PLATFORM_STATS.totalLectures.toLocaleString()}+</div>
                                <div className="hero__stat-label">Lectures</div>
                            </div>
                            <div className="hero__stat">
                                <div className="hero__stat-num">{PLATFORM_STATS.totalPapers.toLocaleString()}+</div>
                                <div className="hero__stat-label">Papers</div>
                            </div>
                            <div className="hero__stat">
                                <div className="hero__stat-num">{PLATFORM_STATS.yearsOfData}</div>
                                <div className="hero__stat-label">Years of Data</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CATEGORIES ─────────────────────── */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <div className="section-label">Browse by Category</div>
                            <h2 className="section-title">Six Fields of Excellence</h2>
                        </div>
                        <Link to="/laureates" className="btn btn--ghost btn--sm">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="categories-grid animate-fade-in-up">
                        {CATEGORIES.map(({ name, Icon, color, bg, count }) => (
                            <Link
                                key={name}
                                to={`/laureates?category=${encodeURIComponent(name)}`}
                                className="cat-card"
                                style={{ ['--cat-hover-color' as string]: color }}
                            >
                                <div className="cat-card__icon" style={{ background: bg }}>
                                    <Icon size={22} style={{ color }} />
                                </div>
                                <div className="cat-card__name">{name}</div>
                                <div className="cat-card__count">{count} laureates</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FEATURED LAUREATES ─────────────── */}
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="section-header">
                        <div>
                            <div className="section-label">Featured Profiles</div>
                            <h2 className="section-title">Renowned Laureates</h2>
                            <p className="section-subtitle">Explore the brilliant minds who changed the world through discovery and creativity.</p>
                        </div>
                        <Link to="/laureates" className="btn btn--ghost btn--sm">
                            All Laureates <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid-4">
                        {featured.map((l, i) => (
                            <Link
                                key={l.id}
                                to={`/laureates/${l.id}`}
                                className={`laureate-card animate-fade-in-up delay-${(i + 1) * 100}`}
                            >
                                <img
                                    src={l.photo}
                                    alt={l.fullName}
                                    className="laureate-card__photo"
                                    loading="lazy"
                                />
                                <div className="laureate-card__body">
                                    <div className="laureate-card__meta">
                                        <CategoryBadge category={l.category} size="sm" />
                                        <span className="laureate-card__year">{l.year}</span>
                                    </div>
                                    <div className="laureate-card__name">{l.fullName}</div>
                                    <p className="laureate-card__motivation">{l.motivation}</p>
                                    <div className="laureate-card__footer">
                                        <span className="laureate-card__stat">
                                            <Play size={12} /><strong>{l.lectureCount}</strong> lectures
                                        </span>
                                        <span className="laureate-card__stat">
                                            <BookOpen size={12} /><strong>{l.paperCount}</strong> papers
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FEATURED LECTURES ──────────────── */}
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="section-header">
                        <div>
                            <div className="section-label">Lecture Library</div>
                            <h2 className="section-title">Nobel Lectures</h2>
                            <p className="section-subtitle">Watch and learn from landmark Nobel Prize lectures delivered by laureates themselves.</p>
                        </div>
                        <Link to="/lectures" className="btn btn--ghost btn--sm">
                            All Lectures <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid-4">
                        {topLectures.map((lec, i) => (
                            <Link
                                key={lec.id}
                                to={`/lectures/${lec.id}`}
                                className={`lecture-card animate-fade-in-up delay-${(i + 1) * 100}`}
                            >
                                <div className="lecture-card__thumb-wrapper">
                                    <img src={lec.thumbnailUrl} alt={lec.title} className="lecture-card__thumb" loading="lazy" />
                                    <div className="lecture-card__play">
                                        <div className="lecture-card__play-btn"><Play size={20} fill="currentColor" /></div>
                                    </div>
                                    <span className="lecture-card__duration">{lec.duration}</span>
                                </div>
                                <div className="lecture-card__body">
                                    <div className="lecture-card__cat">
                                        <CategoryBadge category={lec.category} size="sm" />
                                    </div>
                                    <div className="lecture-card__title">{lec.title}</div>
                                    <div className="lecture-card__speaker">{lec.speaker} · {lec.year}</div>
                                    <div className="lecture-card__footer">
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Eye size={12} />{formatViews(lec.views)} views
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA BANNER ─────────────────────── */}
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="cta-banner animate-fade-in-up">
                        <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🏆</div>
                        <h2 className="cta-banner__title">
                            Start Your Nobel Journey Today
                        </h2>
                        <p className="cta-banner__subtitle">
                            Join thousands of researchers, students, and curious minds exploring the world's greatest achievements.
                        </p>
                        <div className="cta-banner__actions">
                            <Link to="/auth/signup" className="btn btn--primary btn--lg">
                                Create Free Account
                            </Link>
                            <Link to="/laureates" className="btn btn--secondary btn--lg">
                                Explore Laureates
                            </Link>
                            <Link to="/pricing" className="btn btn--ghost btn--lg">
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
