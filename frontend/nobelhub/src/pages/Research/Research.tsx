// =============================================
// Research Page – Papers & Publication Hub
// =============================================
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Download, Share2, Filter, ChevronRight, BookOpen } from 'lucide-react';
import CategoryBadge from '../../components/CategoryBadge/CategoryBadge';
import { PAPERS } from '../../data/mockData';
import type { Category } from '../../types';
import './Research.css';

const CATEGORIES: Category[] = ['Physics', 'Chemistry', 'Medicine', 'Literature', 'Peace', 'Economic Sciences'];

export default function ResearchPage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<Category | ''>('');
    const [sort, setSort] = useState('citations-desc');

    const filtered = useMemo(() => {
        let list = [...PAPERS];
        if (search) list = list.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.authors.some(a => a.toLowerCase().includes(search.toLowerCase())) ||
            p.abstract.toLowerCase().includes(search.toLowerCase())
        );
        if (category) list = list.filter(p => p.category === category);

        if (sort === 'year-desc') list.sort((a, b) => b.year - a.year);
        if (sort === 'year-asc') list.sort((a, b) => a.year - b.year);
        if (sort === 'citations-desc') list.sort((a, b) => b.citations - a.citations);

        return list;
    }, [search, category, sort]);

    return (
        <main className="research-page">
            <div className="container">
                {/* Header */}
                <div className="research-header animate-fade-in">
                    <div className="section-label">Research Intelligence</div>
                    <h1 className="section-title">Scientific Publication Hub</h1>
                    <p className="section-subtitle">
                        Access thousands of landmark papers and research findings from Nobel Prize laureates across 125 years of history.
                    </p>
                </div>

                {/* Controls */}
                <div className="research-controls">
                    <div className="search-wrapper" style={{ flex: 1, maxWidth: 500 }}>
                        <Search size={18} className="search-icon" />
                        <input
                            id="paper-search"
                            type="text"
                            placeholder="Search papers by title, author, DOI, or keywords…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <select
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                        className="research-sort"
                    >
                        <option value="citations-desc">Most Cited</option>
                        <option value="year-desc">Year (Newest)</option>
                        <option value="year-asc">Year (Oldest)</option>
                    </select>
                </div>

                <div className="research-layout">
                    {/* Sidebar Filters */}
                    <aside className="research-sidebar">
                        <div className="research-filter-group">
                            <h4 className="research-filter-label"><Filter size={14} /> Category</h4>
                            <div className="research-filter-list">
                                <button
                                    className={`tag${category === '' ? ' tag--active' : ''}`}
                                    onClick={() => setCategory('')}
                                    style={{ width: '100%', justifyContent: 'flex-start' }}
                                >
                                    All Categories
                                </button>
                                {CATEGORIES.map(c => (
                                    <button
                                        key={c}
                                        className={`tag${category === c ? ' tag--active' : ''}`}
                                        onClick={() => setCategory(c)}
                                        style={{ width: '100%', justifyContent: 'flex-start' }}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="research-sidebar-card card">
                            <h4 className="card-title">Looking for something?</h4>
                            <p className="card-text">Our intelligent search index scans full-text articles and metadata from arXiv, PubMed, and more.</p>
                            <Link to="/search" className="btn btn--ghost btn--sm" style={{ width: '100%', marginTop: 'auto', justifyContent: 'center' }}>
                                Advanced Search
                            </Link>
                        </div>
                    </aside>

                    {/* Main List */}
                    <div className="research-main">
                        <div className="research-count">
                            Showing <strong>{filtered.length}</strong> publication{filtered.length !== 1 ? 's' : ''}
                        </div>

                        <div className="research-list animate-fade-in-up">
                            {filtered.map((p, i) => (
                                <div key={p.id} className="paper-row card" style={{ animationDelay: `${i * 0.05}s` }}>
                                    <div className="paper-row__top">
                                        <CategoryBadge category={p.category} size="sm" />
                                        <span className="paper-row__year">{p.year}</span>
                                        <span className="paper-row__cite-badge">
                                            <BookOpen size={12} /> {p.citations.toLocaleString()} Citations
                                        </span>
                                    </div>
                                    <h3 className="paper-row__title">{p.title}</h3>
                                    <div className="paper-row__authors">
                                        By {p.authors.join(', ')} · <em>{p.journal}</em>
                                    </div>
                                    <p className="paper-row__abstract">{p.abstract}</p>
                                    <div className="paper-row__actions">
                                        {p.externalUrl ? (
                                            <a
                                                href={p.externalUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn--primary btn--sm"
                                            >
                                                <FileText size={14} /> Full Text (Official)
                                            </a>
                                        ) : (
                                            <button className="btn btn--primary btn--sm">
                                                <FileText size={14} /> Full Text
                                            </button>
                                        )}
                                        <a
                                            href={p.externalUrl || `https://scholar.google.com/scholar?q=${encodeURIComponent(p.title)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn--secondary btn--sm"
                                            title="Download/Locate"
                                        >
                                            <Download size={14} /> PDF
                                        </a>
                                        <button
                                            className="btn btn--ghost btn--sm"
                                            title="Copy link"
                                            onClick={() => {
                                                navigator.clipboard.writeText(window.location.origin + `/research/${p.id}`);
                                                alert('Link copied to clipboard!');
                                            }}
                                        >
                                            <Share2 size={14} />
                                        </button>
                                        <Link to={`/research/${p.id}`} className="paper-row__link">
                                            View Detail <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="laureates-empty">
                                <div style={{ fontSize: '3.5rem' }}>📄</div>
                                <h3>No publications found</h3>
                                <p>Try refining your search or filter criteria.</p>
                                <button className="btn btn--secondary" onClick={() => { setSearch(''); setCategory(''); }}>
                                    Show All Papers
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
