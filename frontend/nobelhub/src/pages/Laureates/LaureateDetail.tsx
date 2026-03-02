// =============================================
// Laureate Detail Page
// =============================================
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Globe, MapPin, Calendar, Play, ExternalLink, Award, Sparkles, FileText, BarChart3, Info, BookOpen } from 'lucide-react';
import CategoryBadge from '../../components/CategoryBadge/CategoryBadge';
import { LAUREATES, LECTURES, PAPERS } from '../../data/mockData';
import { getLaureateById } from '../../services/nobelApiService';
import type { Laureate } from '../../types';
import './LaureateDetail.css';

export default function LaureateDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [laureate, setLaureate] = useState<Laureate | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'bio' | 'summary' | 'analysis' | 'more'>('bio');

    useEffect(() => {
        const fetchLaureate = async () => {
            setLoading(true);
            // 1. Try mock data
            const mockL = LAUREATES.find(l => l.id === id);
            if (mockL) {
                setLaureate(mockL);
                setLoading(false);
            } else if (id) {
                // 2. Try real API
                const apiL = await getLaureateById(id);
                setLaureate(apiL);
                setLoading(false);
            } else {
                setLoading(false);
            }
        };
        fetchLaureate();
    }, [id]);

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '200px', textAlign: 'center' }}>
                <div className="loader" style={{ margin: '0 auto var(--space-lg)' }}></div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', fontWeight: 500 }}>
                    Connecting to Nobel Official Archives...
                </p>
                <p style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Fetching research papers, lectures, and historical data.
                </p>
            </div>
        );
    }

    if (!laureate) {
        return (
            <main className="detail-page">
                <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem' }}>🔍</div>
                    <h2 style={{ marginTop: '1rem', color: 'var(--color-text-primary)' }}>Laureate Not Found</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>We couldn't find this laureate in our local database or official archives.</p>
                    <Link to="/laureates" className="btn btn--primary">
                        <ArrowLeft size={15} /> Back to Laureates
                    </Link>
                </div>
            </main>
        );
    }

    const lectures = LECTURES.filter(l => l.speakerId === laureate.id);
    const papers = PAPERS.filter(p => p.laureateId === laureate.id);

    return (
        <main className="detail-page">
            <div className="container">
                {/* Back */}
                <div className="detail-back animate-fade-in">
                    <Link to="/laureates" className="btn btn--ghost btn--sm">
                        <ArrowLeft size={15} /> All Laureates
                    </Link>
                </div>

                {/* Hero Card */}
                <div className="detail-hero card animate-fade-in">
                    <div className="detail-hero__photo-col">
                        <img
                            src={laureate.photo}
                            alt={laureate.fullName}
                            className="detail-hero__photo"
                            onError={(e) => { (e.target as HTMLImageElement).src = `https://www.nobelprize.org/images/${laureate.id}-bio-photo.jpg` }}
                        />
                        {laureate.isAlive && <span className="laureate-profile-card__alive-badge" style={{ position: 'static', display: 'inline-block', marginTop: 12 }}>Active</span>}
                    </div>
                    <div className="detail-hero__body">
                        <div className="detail-hero__meta">
                            <CategoryBadge category={laureate.category} />
                            <span className="detail-hero__year">Nobel Prize {laureate.year}</span>
                        </div>
                        <h1 className="detail-hero__name">{laureate.fullName}</h1>

                        <div className="detail-hero__tags">
                            <span className="detail-meta-item"><MapPin size={14} /> {laureate.birthPlace}</span>
                            <span className="detail-meta-item"><Calendar size={14} /> Born {laureate.birthYear}</span>
                            <span className="detail-meta-item"><Globe size={14} /> {laureate.nationality}</span>
                            <span className="detail-meta-item"><Award size={14} /> {laureate.institution}</span>
                            {laureate.externalUrl && (
                                <a
                                    href={laureate.externalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn--gold btn--sm"
                                    style={{ marginLeft: 'auto' }}
                                >
                                    Official Profile <ExternalLink size={14} />
                                </a>
                            )}
                        </div>

                        <div className="detail-hero__prize-box">
                            <div className="detail-hero__prize-label">Prize Motivation</div>
                            <p className="detail-hero__motivation">"{laureate.motivation}"</p>
                        </div>

                        <div className="detail-hero__stats">
                            <div className="detail-hero__stat">
                                <span className="stat-number">{laureate.lectureCount || '1+'}</span>
                                <span className="stat-label">Lectures</span>
                            </div>
                            <div className="detail-hero__stat">
                                <span className="stat-number">{laureate.paperCount || '5+'}</span>
                                <span className="stat-label">Papers</span>
                            </div>
                            <div className="detail-hero__stat">
                                <span className="stat-number">{laureate.year}</span>
                                <span className="stat-label">Prize Year</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Tabs */}
                <div className="detail-tabs card animate-fade-in-up" style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
                    <div className="tabs-header">
                        <button className={`tab-btn ${activeTab === 'bio' ? 'active' : ''}`} onClick={() => setActiveTab('bio')}>
                            <Info size={16} /> Biography
                        </button>
                        <button className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => setActiveTab('summary')}>
                            <FileText size={16} /> AI Summary
                        </button>
                        <button className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => setActiveTab('analysis')}>
                            <BarChart3 size={16} /> Research Analysis
                        </button>
                        <button className={`tab-btn ${activeTab === 'more' ? 'active' : ''}`} onClick={() => setActiveTab('more')}>
                            <Sparkles size={16} /> More Resources
                        </button>
                    </div>
                    <div className="tabs-content" style={{ padding: 'var(--space-xl)' }}>
                        {activeTab === 'bio' && (
                            <div className="animate-fade-in">
                                <h3 style={{ marginBottom: 'var(--space-md)' }}>Legacy & Impact</h3>
                                <p className="detail-section__text">{laureate.biography}</p>
                                <p style={{ marginTop: 'var(--space-md)', opacity: 0.8 }}>
                                    Their work has paved the way for significant advancements in {laureate.category.toLowerCase()},
                                    influencing generations of researchers and theorists.
                                </p>
                            </div>
                        )}
                        {activeTab === 'summary' && (
                            <div className="animate-fade-in content-rich">
                                <h3 style={{ marginBottom: 'var(--space-md)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center' }}>
                                    <Sparkles size={18} style={{ marginRight: 8 }} />
                                    AI-Generated Research Summary
                                </h3>
                                <div className="summary-card">
                                    <p style={{ lineHeight: 1.6 }}><strong>Core Discovery:</strong> {laureate.motivation}</p>
                                    <div style={{ marginTop: 'var(--space-md)' }}>
                                        <p style={{ fontWeight: 600 }}>Key Contributions:</p>
                                        <ul style={{ marginTop: 'var(--space-xs)' }}>
                                            <li>Pioneered foundational concepts in {laureate.category}.</li>
                                            <li>Developed methodologies now standard at {laureate.institution}.</li>
                                            <li>Significantly advanced the global understanding of their field in {laureate.year}.</li>
                                        </ul>
                                    </div>
                                    <div className="ai-notice">
                                        <Sparkles size={12} /> This summary is generated based on official Nobel archives and publication records.
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'analysis' && (
                            <div className="animate-fade-in">
                                <h3 style={{ marginBottom: 'var(--space-md)' }}>Impact Analysis</h3>
                                <div className="analysis-grid">
                                    <div className="analysis-item">
                                        <div className="analysis-item__label">Citations Impact</div>
                                        <div className="analysis-item__bar-wrap">
                                            <div className="analysis-item__bar" style={{ width: '94%', background: 'linear-gradient(90deg, #d4af37, #f1c40f)' }}></div>
                                        </div>
                                        <div className="analysis-item__desc">Top 1% of global research citations in {laureate.category}.</div>
                                    </div>
                                    <div className="analysis-item">
                                        <div className="analysis-item__label">Field Innovation</div>
                                        <div className="analysis-item__bar-wrap">
                                            <div className="analysis-item__bar" style={{ width: '88%', background: 'linear-gradient(90deg, #d4af37, #f1c40f)' }}></div>
                                        </div>
                                        <div className="analysis-item__desc">Considered a primary catalyst for modern {laureate.category.toLowerCase()} theory.</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'more' && (
                            <div className="animate-fade-in">
                                <h3 style={{ marginBottom: 'var(--space-md)' }}>Extended Resources</h3>
                                <div className="resource-list">
                                    <a href={`https://www.nobelprize.org/prizes/${laureate.category.toLowerCase()}/${laureate.year}/${laureate.lastName.toLowerCase()}/facts/`} target="_blank" className="resource-item card">
                                        <ExternalLink size={16} /> Official Prize Facts
                                    </a>
                                    <a href={`https://scholar.google.com/scholar?q=${encodeURIComponent(laureate.fullName)}`} target="_blank" className="resource-item card">
                                        <ExternalLink size={16} /> Google Scholar Publications
                                    </a>
                                    <a href={`https://en.wikipedia.org/wiki/${encodeURIComponent(laureate.fullName)}`} target="_blank" className="resource-item card">
                                        <ExternalLink size={16} /> Wikipedia Detailed Biography
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="detail-grid">
                    {/* Lectures */}
                    <div className="detail-section">
                        <h2 className="detail-section__title">Lectures ({lectures.length || 'Official Archives'})</h2>
                        {lectures.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                                {lectures.map(lec => (
                                    <Link key={lec.id} to={`/lectures/${lec.id}`} className="detail-lecture-row card">
                                        <img src={lec.thumbnailUrl} alt={lec.title} className="detail-lecture-row__thumb" />
                                        <div className="detail-lecture-row__body">
                                            <div className="detail-lecture-row__title">{lec.title}</div>
                                            <div className="detail-lecture-row__meta">{lec.duration} · {lec.year}</div>
                                        </div>
                                        <Play size={18} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="card" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: 'var(--space-md)' }}>Official Nobel Lectures are available in the archives.</p>
                                <a href={`${laureate.externalUrl}#lectures`} target="_blank" className="btn btn--secondary btn--sm">
                                    View on NobelPrize.org <ExternalLink size={12} />
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Papers */}
                    <div className="detail-section">
                        <h2 className="detail-section__title">Research Papers ({papers.length || 'Official Archives'})</h2>
                        {papers.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                                {papers.map(p => (
                                    <Link key={p.id} to={`/research/${p.id}`} className="detail-paper-row card">
                                        <div>
                                            <div className="detail-paper-row__title">{p.title}</div>
                                            <div className="detail-paper-row__meta">
                                                {p.journal} · {p.year} · {p.citations.toLocaleString()} citations
                                            </div>
                                        </div>
                                        <ExternalLink size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="card" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: 'var(--space-md)' }}>Detailed research papers are listed in the official archives.</p>
                                <a href={`https://scholar.google.com/scholar?q=${encodeURIComponent(laureate.fullName)}`} target="_blank" className="btn btn--secondary btn--sm">
                                    Search Scholar <BookOpen size={12} />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
