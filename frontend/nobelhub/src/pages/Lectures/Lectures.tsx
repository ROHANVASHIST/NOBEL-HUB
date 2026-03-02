// =============================================
// Lectures Page – Video Archive
// =============================================
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Play, Eye, Calendar, Clock, SlidersHorizontal, ExternalLink } from 'lucide-react';
import CategoryBadge from '../../components/CategoryBadge/CategoryBadge';
import { LECTURES } from '../../data/mockData';
import type { Category } from '../../types';
import './Lectures.css';

const CATEGORIES: Category[] = ['Physics', 'Chemistry', 'Medicine', 'Literature', 'Peace', 'Economic Sciences'];

/* ── Helper: format view count ─────────────── */
function formatViews(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return String(n);
}

export default function LecturesPage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<Category | ''>('');
    const [showFilters, setShowFilters] = useState(false);

    const filtered = useMemo(() => {
        let list = [...LECTURES];
        if (search) list = list.filter(l =>
            l.title.toLowerCase().includes(search.toLowerCase()) ||
            l.speaker.toLowerCase().includes(search.toLowerCase()) ||
            l.description.toLowerCase().includes(search.toLowerCase())
        );
        if (category) list = list.filter(l => l.category === category);
        list.sort((a, b) => b.year - a.year);
        return list;
    }, [search, category]);

    return (
        <main className="lectures-page">
            <div className="container">
                {/* Header */}
                <div className="lectures-header animate-fade-in">
                    <div className="section-label">NobelHub Archive</div>
                    <h1 className="section-title">Nobel Prize Lectures</h1>
                    <p className="section-subtitle">
                        Watch and study official Nobel Prize lectures from 1901 to present. Experience history's greatest minds in their own words.
                    </p>
                </div>

                {/* Search & Tabs */}
                <div className="lectures-controls">
                    <div className="search-wrapper" style={{ flex: 1, maxWidth: 500 }}>
                        <Search size={18} className="search-icon" />
                        <input
                            id="lecture-search"
                            type="text"
                            placeholder="Search lectures by title, speaker, or keywords…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <button
                        className={`btn btn--secondary ${showFilters ? 'btn--primary' : ''}`}
                        onClick={() => setShowFilters(f => !f)}
                    >
                        <SlidersHorizontal size={16} /> Filters
                    </button>
                </div>

                {showFilters && (
                    <div className="lectures-filter-bar animate-fade-in">
                        <span className="filter-label">Category:</span>
                        {CATEGORIES.map(c => (
                            <button
                                key={c}
                                className={`tag${category === c ? ' tag--active' : ''}`}
                                onClick={() => setCategory(prev => prev === c ? '' : c)}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                )}

                {/* Featured / Hero Video Example (Optional, showing first in the list) */}
                {filtered.length > 0 && !search && !category && (
                    <Link to={`/lectures/${filtered[0].id}`} className="lectures-hero card animate-fade-in-up">
                        <div className="lectures-hero__thumb-wrap">
                            <img src={filtered[0].thumbnailUrl} alt={filtered[0].title} className="lectures-hero__thumb" />
                            <div className="lectures-hero__play"><Play size={40} fill="currentColor" /></div>
                        </div>
                        <div className="lectures-hero__body">
                            <CategoryBadge category={filtered[0].category} />
                            <h2 className="lectures-hero__title">{filtered[0].title}</h2>
                            <div className="lectures-hero__speaker">Delivered by {filtered[0].speaker} · {filtered[0].year}</div>
                            <p className="lectures-hero__desc">{filtered[0].description}</p>
                            <div className="lectures-hero__footer">
                                <span><Clock size={13} /> {filtered[0].duration}</span>
                                <span><Eye size={13} /> {formatViews(filtered[0].views)} views</span>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Grid */}
                <h3 className="lectures-list-title">
                    {search || category ? `Results (${filtered.length})` : 'Recent Lectures'}
                </h3>
                <div className="grid-3 animate-fade-in-up">
                    {(search || category ? filtered : filtered.slice(1)).map((l, i) => (
                        <Link key={l.id} to={`/lectures/${l.id}`} className="lecture-card" style={{ animationDelay: `${i * 0.05}s` }}>
                            <div className="lecture-card__thumb-wrapper">
                                <img src={l.thumbnailUrl} alt={l.title} className="lecture-card__thumb" loading="lazy" />
                                <div className="lecture-card__play">
                                    <div className="lecture-card__play-btn"><Play size={20} fill="currentColor" /></div>
                                </div>
                                <span className="lecture-card__duration">{l.duration}</span>
                            </div>
                            <div className="lecture-card__body">
                                <div className="lecture-card__cat">
                                    <CategoryBadge category={l.category} size="sm" />
                                </div>
                                <div className="lecture-card__title">{l.title}</div>
                                <div className="lecture-card__speaker">{l.speaker}</div>
                                <div className="lecture-card__footer">
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <Calendar size={12} /> {l.year}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <Eye size={12} /> {formatViews(l.views)}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="laureates-empty card animate-fade-in-up" style={{ padding: 'var(--space-3xl)', textAlign: 'center' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: 'var(--space-md)' }}>🎬</div>
                        <h3>No lectures found in our records</h3>
                        <p>Try searching the main Nobel Prize archives for all available video recordings.</p>
                        <div style={{ marginTop: 'var(--space-xl)', display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
                            <button className="btn btn--secondary" onClick={() => { setSearch(''); setCategory(''); }}>
                                Show All Local Lectures
                            </button>
                            <a
                                href={`https://www.nobelprize.org/search/?s=${encodeURIComponent(search)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn--primary"
                            >
                                Search Official Archives <ExternalLink size={16} />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
