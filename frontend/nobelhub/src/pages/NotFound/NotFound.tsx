// =============================================
// NotFound – Fallback Page for 404 routes
// =============================================
import { Link } from 'react-router-dom';
import { Home, Search, Library } from 'lucide-react';

export default function NotFoundPage() {
    return (
        <main className="container" style={{ paddingTop: '160px', paddingBottom: '160px', textAlign: 'center' }}>
            <div style={{ fontSize: '5rem', marginBottom: 'var(--space-md)' }}>🏛️</div>
            <h1 className="section-title">404: Page Not Found</h1>
            <p className="section-subtitle" style={{ margin: 'var(--space-md) auto var(--space-2xl)' }}>
                The page you are looking for doesn't exist or has been moved. Explore NobelHub's vast archives instead.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                <Link to="/" className="btn btn--primary">
                    <Home size={15} /> Back Home
                </Link>
                <Link to="/search" className="btn btn--secondary">
                    <Search size={15} /> Search Archives
                </Link>
                <Link to="/lectures" className="btn btn--secondary">
                    <Library size={15} /> Video Library
                </Link>
            </div>
        </main>
    );
}
