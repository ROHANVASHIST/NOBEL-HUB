// =============================================
// CategoryBadge – Reusable category pill
// =============================================
import type { Category } from '../../types';

const MAP: Record<Category, string> = {
    Physics: 'badge--physics',
    Chemistry: 'badge--chemistry',
    Medicine: 'badge--medicine',
    Literature: 'badge--literature',
    Peace: 'badge--peace',
    'Economic Sciences': 'badge--economics',
};

interface Props {
    category: Category;
    size?: 'sm' | 'md';
}

export default function CategoryBadge({ category, size = 'md' }: Props) {
    return (
        <span
            className={`badge ${MAP[category]}`}
            style={size === 'sm' ? { fontSize: '0.68rem', padding: '2px 8px' } : undefined}
        >
            {category}
        </span>
    );
}
