// =============================================
// Pricing Page – Plans & Subscriptions
// =============================================
import { Check, ArrowRight, Zap, Target, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const PLANS = [
    {
        name: 'Researcher',
        price: '0',
        description: 'For curious minds and students exploring the archives.',
        features: [
            'Full access to Laureate directory',
            'Unified search across all categories',
            'Standard data visualizations',
            'Public lecture recordings',
            'Personal bookmarks (Limited)',
        ],
        cta: 'Get Started',
        path: '/auth/signup',
        icon: Target,
        type: 'free'
    },
    {
        name: 'Academic Pro',
        price: '19',
        description: 'Advanced intelligence for researchers and institutions.',
        features: [
            'Everything in Researcher',
            'Advanced Citation analytics',
            'Full-text PDF downloads',
            'Export data to CSV/Excel',
            'Institutional API access',
            'Collaborative research boards',
        ],
        cta: 'Start Free Trial',
        path: '/auth/signup',
        icon: Zap,
        type: 'pro',
        popular: true
    },
    {
        name: 'Enterprise',
        price: '99',
        description: 'Custom solutions for global research universities.',
        features: [
            'Everything in Academic Pro',
            'White-label integration',
            'Dedicated data historian',
            'SSO & SAML authentication',
            'Priority 24/7 support',
            'Custom database snapshots',
        ],
        cta: 'Contact Sales',
        path: '#',
        icon: Star,
        type: 'enterprise'
    }
];

export default function PricingPage() {
    return (
        <main className="pricing-page">
            <div className="container">
                {/* Header */}
                <div className="pricing-header animate-fade-in">
                    <div className="section-label">Pricing Plans</div>
                    <h1 className="section-title">Unlock Universal Intelligence</h1>
                    <p className="section-subtitle">
                        Find the perfect plan for your research needs. From personal exploration to institutional mastery.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="pricing-grid">
                    {PLANS.map((plan, i) => (
                        <div
                            key={plan.name}
                            className={`pricing-card card animate-fade-in-up ${plan.popular ? 'pricing-card--popular' : ''}`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            {plan.popular && <span className="popular-badge">Most Popular</span>}
                            <div className="pricing-card__header">
                                <div className="pricing-card__icon">
                                    <plan.icon size={24} />
                                </div>
                                <h3 className="pricing-card__name">{plan.name}</h3>
                                <div className="pricing-card__price">
                                    <span className="currency">$</span>
                                    <span className="amount">{plan.price}</span>
                                    <span className="period">/mo</span>
                                </div>
                                <p className="pricing-card__desc">{plan.description}</p>
                            </div>

                            <div className="pricing-card__features">
                                {plan.features.map(f => (
                                    <div key={f} className="pricing-feature">
                                        <Check size={16} className="text-gold" />
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pricing-card__footer">
                                <Link
                                    to={plan.path}
                                    className={`btn ${plan.type === 'pro' ? 'btn--primary' : 'btn--secondary'} w-full`}
                                    style={{ justifyContent: 'center', width: '100%' }}
                                >
                                    {plan.cta} <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <section className="pricing-faq card animate-fade-in-up">
                    <h2 className="faq-title">Frequently Asked Questions</h2>
                    <div className="faq-grid">
                        <div className="faq-item">
                            <h4>Can I cancel my subscription at any time?</h4>
                            <p>Yes, all our plans are flexible. You can cancel your Academic Pro subscription at any time with one click.</p>
                        </div>
                        <div className="faq-item">
                            <h4>Do you offer educational discounts?</h4>
                            <p>Verified university students and faculty are eligible for a 50% discount on Academic Pro. Contact support for details.</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
