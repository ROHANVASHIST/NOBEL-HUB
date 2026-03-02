// =============================================
// Laureates Page – Directory with Filters
// =============================================
import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Play, BookOpen, Globe, X, ExternalLink, Loader2 } from 'lucide-react';
import CategoryBadge from '../../components/CategoryBadge/CategoryBadge';
import { LAUREATES } from '../../data/mockData';
import { searchLaureates, getLatestLaureates } from '../../services/nobelApiService';
import type { Category, Laureate } from '../../types';
import './Laureates.css';

const CATEGORIES: Category[] = ['Physics', 'Chemistry', 'Medicine', 'Literature', 'Peace', 'Economic Sciences'];
const SORT_OPTIONS = [
    { label: 'Year (Newest)', value: 'year-desc' },
    { label: 'Year (Oldest)', value: 'year-asc' },
    { label: 'Name (A–Z)', value: 'name-asc' },
];

export default function LaureatePage() {
    const [params] = useSearchParams();
    const initialCat = (params.get('category') as Category) || '';

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<Category | ''>(initialCat);
    const [sort, setSort] = useState('year-desc');
    const [showFilters, setShowFilters] = useState(false);

    const [apiResults, setApiResults] = useState<Laureate[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Initial load of latest laureates if no search
    useEffect(() => {
        const fetchLatest = async () => {
            setIsLoading(true);
            const latest = await getLatestLaureates(20);
            setApiResults(latest);
            setIsLoading(false);
        };
        if (!search) {
            fetchLatest();
        }
    }, [search]);

    // Handle search input with debouncing or on demand
    const handleSearchSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!search) return;
        setIsLoading(true);
        const results = await searchLaureates(search);
        setApiResults(results);
        setIsLoading(false);
    };

    const filtered = useMemo(() => {
        // Merge mock with API results
        let list = [...LAUREATES];

        // Only include API results that aren't already in mock
        const uniqueApiResults = apiResults.filter(al => !LAUREATES.some(ml => ml.id === al.id));
        list = [...list, ...uniqueApiResults];

        if (search) {
            list = list.filter(l =>
                l.fullName.toLowerCase().includes(search.toLowerCase()) ||
                l.motivation.toLowerCase().includes(search.toLowerCase()) ||
                l.nationality.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category) list = list.filter(l => l.category === category);

        if (sort === 'year-desc') list.sort((a, b) => b.year - a.year);
        if (sort === 'year-asc') list.sort((a, b) => a.year - b.year);
        if (sort === 'name-asc') list.sort((a, b) => a.lastName.localeCompare(b.lastName || a.fullName));

        return list;
    }, [search, category, sort, apiResults]);

    return (
        <main className="laureates-page">
            <div className="container">
                {/* Header */}
                <div className="laureates-header animate-fade-in">
                    <div>
                        <div className="section-label">Nobel Prize Laureates</div>
                        <h1 className="section-title">Discover the Laureates</h1>
                        <p className="section-subtitle">
                            Browse 1000+ laureate profiles across all 6 Nobel Prize categories, connected directly to the official Nobel archives.
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <form className="laureates-controls" onSubmit={handleSearchSubmit}>
                    <div className="search-wrapper" style={{ flex: 1, maxWidth: 400 }}>
                        <Search size={17} className="search-icon" />
                        <input
                            id="laureate-search"
                            type="text"
                            placeholder="Search by name, field, or nationality…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        className="btn btn--secondary btn--sm"
                        onClick={() => setShowFilters(f => !f)}
                    >
                        <SlidersHorizontal size={15} />
                        Filters {category && <span className="filter-count">1</span>}
                    </button>

                    <select
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                        className="laureates-sort"
                    >
                        {SORT_OPTIONS.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </form>

                {/* Filter Pills */}
                {showFilters && (
                    <div className="laureates-filters animate-fade-in">
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
                        {category && (
                            <button className="btn btn--ghost btn--sm" onClick={() => setCategory('')}>
                                <X size={13} /> Clear
                            </button>
                        )}
                    </div>
                )}

                {/* Result Count */}
                <div className="laureates-count" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Showing <strong>{filtered.length}</strong> laureate{filtered.length !== 1 ? 's' : ''}</span>
                    {isLoading && <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}><Loader2 size={14} className="animate-spin" /> Fetching from archives...</span>}
                </div>

                {/* Grid */}
                <div className="laureates-grid">
                    {filtered.map((l, i) => (
                        <Link
                            key={l.id}
                            to={`/laureates/${l.id}`}
                            className={`laureate-profile-card animate-fade-in-up`}
                            style={{ animationDelay: `${Math.min(i, 6) * 0.07}s` }}
                        >
                            <div className="laureate-profile-card__photo-wrap">
                                <img
                                    src={l.photo}
                                    alt={l.fullName}
                                    className="laureate-profile-card__photo"
                                    loading="lazy"
                                    onError={(e) => { (e.target as HTMLImageElement).src = `https://www.nobelprize.org/images/${l.id}-bio-photo.jpg` }}
                                />
                                {l.isAlive && <span className="laureate-profile-card__alive-badge">Active</span>}
                            </div>
                            <div className="laureate-profile-card__body">
                                <div className="laureate-profile-card__meta">
                                    <CategoryBadge category={l.category} size="sm" />
                                    <span className="laureate-profile-card__year">{l.year}</span>
                                </div>
                                <h3 className="laureate-profile-card__name">{l.fullName}</h3>
                                <div className="laureate-profile-card__info">
                                    <Globe size={13} />
                                    <span>{l.nationality} · {l.institution}</span>
                                </div>
                                <p className="laureate-profile-card__motivation">{l.motivation}</p>
                                <div className="laureate-profile-card__stats">
                                    <span><Play size={12} /> <strong>{l.lectureCount || '1+'}</strong> lectures</span>
                                    <span><BookOpen size={12} /> <strong>{l.paperCount || '5+'}</strong> papers</span>
                                    {l.externalUrl && (
                                        <div
                                            className="text-gold"
                                            style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem' }}
                                        >
                                            Profile <ExternalLink size={10} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && !isLoading && (
                    <div className="laureates-empty card animate-fade-in-up" style={{ padding: 'var(--space-3xl)', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🔍</div>
                        <h3>No laureates found</h3>
                        <p>We couldn't find matches for your search. Try broadening your terms.</p>
                        <div style={{ marginTop: 'var(--space-xl)', display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
                            <button className="btn btn--secondary" onClick={() => { setSearch(''); setCategory(''); setApiResults([]); }}>
                                <X size={15} /> Clear All
                            </button>
                            <a
                                href={`https://www.nobelprize.org/search/?s=${encodeURIComponent(search)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn--primary"
                            >
                                Search Official site <ExternalLink size={16} />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
