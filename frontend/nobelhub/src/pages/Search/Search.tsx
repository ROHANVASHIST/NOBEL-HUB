// =============================================
// Search Results Page – Unified Search
// =============================================
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Users, Library, BookOpen, ChevronRight, Filter, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';
import { LAUREATES, LECTURES, PAPERS } from '../../data/mockData';
import { searchLaureates } from '../../services/nobelApiService';
import CategoryBadge from '../../components/CategoryBadge/CategoryBadge';
import type { Laureate, SearchResult } from '../../types';
import './Search.css';

export default function SearchPage() {
    const [params, setParams] = useSearchParams();
    const q = params.get('q') || '';

    const [searchQuery, setSearchQuery] = useState(q);
    const [activeType, setActiveType] = useState<'all' | 'laureate' | 'lecture' | 'paper'>('all');
    const [apiLaureates, setApiLaureates] = useState<Laureate[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setSearchQuery(q);
        if (q) {
            handleApiSearch(q);
        }
    }, [q]);

    const handleApiSearch = async (query: string) => {
        setIsLoading(true);
        try {
            const results = await searchLaureates(query);
            setApiLaureates(results);
        } catch (error) {
            console.error('API search failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const results = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query && !q) return [];

        // Local Laureates (Mock)
        const localLaureateResults = LAUREATES.filter(l =>
            l.fullName.toLowerCase().includes(query) ||
            l.motivation.toLowerCase().includes(query)
        ).map(l => ({
            type: 'laureate' as const,
            id: l.id,
            title: l.fullName,
            subtitle: `${l.category} · ${l.year} Nobel Prize`,
            year: l.year,
            category: l.category,
            path: `/laureates/${l.id}`
        }));

        // API Laureates (avoid duplicates if same ID)
        const apiLaureateResults = apiLaureates
            .filter(al => !LAUREATES.some(ml => ml.id === al.id))
            .map(al => ({
                type: 'laureate' as const,
                id: al.id,
                title: al.fullName,
                subtitle: `${al.category} · ${al.year} Nobel Prize (Official)`,
                year: al.year,
                category: al.category,
                path: `/laureates/${al.id}`
            }));

        const lectureResults = LECTURES.filter(lec =>
            lec.title.toLowerCase().includes(query) ||
            lec.speaker.toLowerCase().includes(query)
        ).map(lec => ({
            type: 'lecture' as const,
            id: lec.id,
            title: lec.title,
            subtitle: `Lecture by ${lec.speaker} (${lec.year})`,
            year: lec.year,
            category: lec.category,
            path: `/lectures/${lec.id}`
        }));

        const paperResults = PAPERS.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.abstract.toLowerCase().includes(query)
        ).map(p => ({
            type: 'paper' as const,
            id: p.id,
            title: p.title,
            subtitle: `Research Paper · ${p.year}`,
            year: p.year,
            category: p.category,
            path: `/research/${p.id}`
        }));

        let all = [...localLaureateResults, ...apiLaureateResults, ...lectureResults, ...paperResults];
        all.sort((a, b) => b.year - a.year);

        if (activeType !== 'all') {
            all = all.filter(r => r.type === activeType);
        }

        return all;
    }, [searchQuery, activeType, apiLaureates, q]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setParams({ q: searchQuery });
    };

    return (
        <main className="search-results-page">
            <div className="container">
                {/* Search Input Area */}
                <div className="search-results-header animate-fade-in">
                    <form className="search-form hero__search" onSubmit={handleSearch} style={{ margin: '0 0 var(--space-xl) 0', maxWidth: '100%' }}>
                        <SearchIcon size={22} className="hero__search-icon" />
                        <input
                            id="main-search"
                            type="text"
                            className="hero__search-input"
                            placeholder="Search names, fields, or research topics..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="hero__search-btn">
                            {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Search'}
                        </button>
                    </form>
                </div>

                <div className="search-layout">
                    {/* Sidebar / Types */}
                    <aside className="search-sidebar">
                        <h4 className="sidebar-label"><Filter size={14} /> Result Type</h4>
                        <div className="search-type-list">
                            <button
                                className={`search-type-btn${activeType === 'all' ? ' active' : ''}`}
                                onClick={() => setActiveType('all')}
                            >
                                All Results <span className="type-count">{results.length}</span>
                            </button>
                            <button
                                className={`search-type-btn${activeType === 'laureate' ? ' active' : ''}`}
                                onClick={() => setActiveType('laureate')}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Users size={14} /> Laureates
                                </span>
                            </button>
                            <button
                                className={`search-type-btn${activeType === 'lecture' ? ' active' : ''}`}
                                onClick={() => setActiveType('lecture')}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Library size={14} /> Lectures
                                </span>
                            </button>
                            <button
                                className={`search-type-btn${activeType === 'paper' ? ' active' : ''}`}
                                onClick={() => setActiveType('paper')}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <BookOpen size={14} /> Research Papers
                                </span>
                            </button>
                        </div>
                    </aside>

                    {/* Core Results */}
                    <div className="search-main">
                        {q ? (
                            <>
                                <div className="search-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        Results for "<span className="text-gold">{q}</span>": <strong>{results.length} found</strong>
                                    </div>
                                    {isLoading && <div className="text-muted" style={{ fontSize: '0.8rem' }}>Searching archives...</div>}
                                </div>

                                <div className="search-list animate-fade-in-up">
                                    {results.map((r, i) => (
                                        <Link key={`${r.type}-${r.id}`} to={r.path} className="search-result-row card" style={{ animationDelay: `${i * 0.05}s` }}>
                                            <div className="result-icon-box">
                                                {r.type === 'laureate' && <Users size={18} />}
                                                {r.type === 'lecture' && <Library size={18} />}
                                                {r.type === 'paper' && <BookOpen size={18} />}
                                            </div>
                                            <div className="result-body">
                                                <div className="result-top">
                                                    <CategoryBadge category={r.category} size="sm" />
                                                    <span className="result-type-label">{r.type}</span>
                                                </div>
                                                <h3 className="result-title">{r.title}</h3>
                                                <p className="result-subtitle">{r.subtitle}</p>
                                            </div>
                                            <ChevronRight size={18} className="result-arrow" />
                                        </Link>
                                    ))}
                                </div>

                                {results.length === 0 && !isLoading && (
                                    <div className="search-empty">
                                        <AlertCircle size={40} style={{ color: 'var(--color-text-muted)', marginBottom: 16 }} />
                                        <h3>No matches found</h3>
                                        <p>Try searching with broader terms or different keywords.</p>
                                        <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
                                            <a
                                                href={`https://www.nobelprize.org/search/?s=${encodeURIComponent(q)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn--secondary btn--sm"
                                            >
                                                Web Search <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {results.length > 0 && !isLoading && (
                                    <div className="search-footer animate-fade-in" style={{ marginTop: 'var(--space-2xl)', textAlign: 'center', padding: 'var(--space-xl)', borderTop: '1px solid var(--color-border)' }}>
                                        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>Found what you were looking for?</p>
                                        <a
                                            href={`https://www.nobelprize.org/search/?s=${encodeURIComponent(q)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn--secondary btn--sm"
                                        >
                                            View More Official Results <ExternalLink size={14} />
                                        </a>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="search-prompt">
                                <SearchIcon size={48} style={{ opacity: 0.2, marginBottom: 20 }} />
                                <h3>Nobel Archive Search</h3>
                                <p>Search globally across the official Nobel Prize database (over 1000+ laureates).</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
