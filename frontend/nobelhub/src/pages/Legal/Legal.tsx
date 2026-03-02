// =============================================
// Legal & Transparency Page
// =============================================
import { ShieldCheck, Lock, FileText, Scale } from 'lucide-react';
import './Legal.css';

export default function LegalPage() {
    return (
        <main className="legal-page">
            <div className="container">
                <div className="legal-header animate-fade-in">
                    <h1 className="section-title">Legal & Transparency</h1>
                    <p className="section-subtitle">Our commitment to data integrity and user privacy.</p>
                </div>

                <div className="legal-grid">
                    <section className="legal-section card animate-fade-in-up">
                        <div className="section-header">
                            <ShieldCheck className="text-gold" size={32} />
                            <h2>Privacy Policy</h2>
                        </div>
                        <p>Your data is encrypted and handled with the highest academic standards. We do not sell your research patterns to third parties. All data processing is GDPR compliant.</p>
                        <ul className="legal-list">
                            <li>End-to-end encryption for account data</li>
                            <li>Anonymous research pattern tracking</li>
                            <li>Full right to data deletion</li>
                        </ul>
                    </section>

                    <section className="legal-section card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="section-header">
                            <Lock className="text-gold" size={32} />
                            <h2>Terms of Service</h2>
                        </div>
                        <p>NobelHub is a research facilitation platform. Users must cite data correctly and adhere to the ethical guidelines of scientific research.</p>
                        <ul className="legal-list">
                            <li>Non-commercial personal use only on free tiers</li>
                            <li>Attribution required for all exported charts</li>
                            <li>Responsible use of API endpoints</li>
                        </ul>
                    </section>

                    <section className="legal-section card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="section-header">
                            <FileText className="text-gold" size={32} />
                            <h2>Data Sourcing</h2>
                        </div>
                        <p>Our primary dataset is sourced from the Nobel Prize official archives. We maintain a synchronized cache to ensure high availability while respecting source authority.</p>
                    </section>

                    <section className="legal-section card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="section-header">
                            <Scale className="text-gold" size={32} />
                            <h2>Compliance</h2>
                        </div>
                        <p>We are fully compliant with WCAG 2.1 AA accessibility standards and strictly follow the Open Data principles for scientific communication.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
