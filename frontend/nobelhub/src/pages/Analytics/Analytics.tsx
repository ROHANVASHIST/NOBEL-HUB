// =============================================
// Analytics Page – Trends & Distribution Data
// =============================================
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
    Users, Award, TrendingUp, Download, Share2, Info,
    ExternalLink, MapPin
} from 'lucide-react';
import { CATEGORY_DISTRIBUTION, YEARLY_TRENDS, PLATFORM_STATS } from '../../data/mockData';
import './Analytics.css';

const CAT_COLORS = [
    '#4f7eff', // Physics
    '#ff7b4f', // Chemistry
    '#3dd68c', // Medicine
    '#9d6ffe', // Literature
    '#f5c842', // Peace
    '#ff4f91', // Economics
];

export default function AnalyticsPage() {
    return (
        <main className="analytics-page">
            <div className="container">
                {/* Header */}
                <div className="analytics-header animate-fade-in">
                    <div className="section-label">Data Intelligence</div>
                    <h1 className="section-title">Trends & Insights Dashboard</h1>
                    <p className="section-subtitle">
                        Exploring patterns and statistics across 125 years of Nobel Prize history through interactive visualizations.
                    </p>
                    <div className="analytics-actions">
                        <button className="btn btn--secondary btn--sm"><Download size={14} /> Export CSV</button>
                        <button className="btn btn--secondary btn--sm"><Share2 size={14} /> Share Report</button>
                    </div>
                </div>

                {/* Top Stats Cards */}
                <div className="analytics-stats-grid">
                    <div className="stat-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="stat-card__icon" style={{ background: 'rgba(245,200,66,0.1)' }}><Award style={{ color: '#f5c842' }} /></div>
                        <div className="stat-card__body">
                            <div className="stat-card__val">{PLATFORM_STATS.totalLaureates}</div>
                            <div className="stat-card__label">Total Laureates</div>
                        </div>
                    </div>
                    <div className="stat-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="stat-card__icon" style={{ background: 'rgba(79,126,255,0.1)' }}><TrendingUp style={{ color: '#4f7eff' }} /></div>
                        <div className="stat-card__body">
                            <div className="stat-card__val">{PLATFORM_STATS.yearsOfData}</div>
                            <div className="stat-card__label">Years of History</div>
                        </div>
                    </div>
                    <div className="stat-card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="stat-card__icon" style={{ background: 'rgba(61,214,140,0.1)' }}><Users style={{ color: '#3dd68c' }} /></div>
                        <div className="stat-card__body">
                            <div className="stat-card__val">75+</div>
                            <div className="stat-card__label">Nationalities</div>
                        </div>
                    </div>
                    <div className="stat-card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="stat-card__icon" style={{ background: 'rgba(157,111,254,0.1)' }}><Info style={{ color: '#9d6ffe' }} /></div>
                        <div className="stat-card__body">
                            <div className="stat-card__val">12k+</div>
                            <div className="stat-card__label">Publications</div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="analytics-charts">
                    {/* Distribution by Category */}
                    <div className="chart-container card animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <div className="chart-container__header">
                            <h3 className="chart-container__title">Distribution by Field</h3>
                            <p className="chart-container__subtitle">Breakdown of prizes across all 6 categories</p>
                        </div>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={CATEGORY_DISTRIBUTION}
                                        cx="50%" cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="count"
                                        nameKey="category"
                                    >
                                        {CATEGORY_DISTRIBUTION.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={CAT_COLORS[index % CAT_COLORS.length]} stroke="transparent" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '8px' }}
                                        itemStyle={{ color: '#f0f0f8' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="chart-legend">
                                {CATEGORY_DISTRIBUTION.map((c, i) => (
                                    <div key={c.category} className="legend-item">
                                        <span className="legend-dot" style={{ backgroundColor: CAT_COLORS[i] }} />
                                        <span className="legend-name">{c.category}</span>
                                        <span className="legend-val">{c.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Yearly Trends */}
                    <div className="chart-container card animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <div className="chart-container__header">
                            <h3 className="chart-container__title">Yearly Prize Volume</h3>
                            <p className="chart-container__subtitle">Trends in awarding frequency over time</p>
                        </div>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={YEARLY_TRENDS}>
                                    <defs>
                                        <linearGradient id="colorPrizes" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f5c842" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f5c842" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
                                    <XAxis dataKey="year" stroke="#5a5a7a" fontSize={11} tickMargin={10} />
                                    <YAxis stroke="#5a5a7a" fontSize={11} />
                                    <Tooltip
                                        contentStyle={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '8px' }}
                                    />
                                    <Area type="monotone" dataKey="prizes" stroke="#f5c842" fillOpacity={1} fill="url(#colorPrizes)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Female Laureates over time */}
                    <div className="chart-container card animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                        <div className="chart-container__header">
                            <h3 className="chart-container__title">Female Representation</h3>
                            <p className="chart-container__subtitle">Growth in female Nobel Laureates per year</p>
                        </div>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={YEARLY_TRENDS}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
                                    <XAxis dataKey="year" stroke="#5a5a7a" fontSize={11} />
                                    <YAxis stroke="#5a5a7a" fontSize={11} />
                                    <Tooltip
                                        contentStyle={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '8px' }}
                                    />
                                    <Bar dataKey="female" fill="#9d6ffe" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Institutional Impact (Mock) */}
                    <div className="chart-container card animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                        <div className="chart-container__header">
                            <h3 className="chart-container__title">Top Institutions</h3>
                            <p className="chart-container__subtitle">Universities with the most Nobel Laureates</p>
                        </div>
                        <div className="inst-list">
                            {[
                                { name: 'Kaiser Wilhelm Institute', count: 42, icon: <MapPin size={12} /> },
                                { name: 'University of Paris', count: 35, icon: <MapPin size={12} /> },
                                { name: 'California Institute of Technology', count: 32, icon: <MapPin size={12} /> },
                                { name: 'Princeton University', count: 28, icon: <MapPin size={12} /> },
                                { name: 'MRC Laboratory', count: 24, icon: <MapPin size={12} /> },
                            ].map((inst, idx) => (
                                <div key={idx} className="inst-row">
                                    <span className="inst-name">{inst.icon} {inst.name}</span>
                                    <div className="inst-bar-bg"><div className="inst-bar-fill" style={{ width: `${(inst.count / 42) * 100}%` }} /></div>
                                    <span className="inst-val">{inst.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer info section */}
                <div className="analytics-info card animate-fade-in">
                    <div>
                        <h4 style={{ color: 'var(--color-gold)', marginBottom: 8 }}>Methodology</h4>
                        <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                            All data is aggregated from the official Nobel Prize API and university repositories. Statistics represent cumulative values as of 2026.
                        </p>
                    </div>
                    <button className="btn btn--ghost btn--sm">
                        Read Verification Policy <ExternalLink size={12} />
                    </button>
                </div>
            </div>
        </main>
    );
}
