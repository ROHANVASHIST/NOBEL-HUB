// =============================================
// NobelHub – Nobel Prize API Service
// =============================================
import type { Laureate, Category } from '../types';

const NOBEL_API_URL = 'https://api.nobelprize.org/v2';
const API_BASE_URL = 'http://localhost:5000/api/v1';

/**
 * Maps Nobel Prize API category names to NobelHub Category names
 */
const mapCategory = (cat: string): Category => {
    switch (cat.toLowerCase()) {
        case 'phy': return 'Physics';
        case 'che': return 'Chemistry';
        case 'med': return 'Medicine';
        case 'lit': return 'Literature';
        case 'pea': return 'Peace';
        case 'eco': return 'Economic Sciences';
        default: return 'Physics'; // Fallback
    }
};

/**
 * Maps API Laureate response to NobelHub Laureate type
 */
const mapLaureate = (apiData: any): Laureate => {
    const prize = apiData.nobelPrizes && apiData.nobelPrizes[0];
    const fullName = apiData.knownName?.en || apiData.fullName?.en || `${apiData.givenName?.en} ${apiData.familyName?.en}`;

    return {
        id: apiData.id,
        firstName: apiData.givenName?.en || '',
        lastName: apiData.familyName?.en || '',
        fullName: fullName,
        birthYear: apiData.birth?.date ? parseInt(apiData.birth.date.substring(0, 4)) : 0,
        birthPlace: apiData.birth?.place?.city?.en || apiData.birth?.place?.country?.en || 'Unknown',
        nationality: apiData.birth?.place?.country?.en || 'N/A',
        photo: `https://www.nobelprize.org/images/${apiData.id}-biography.jpg`, // Common pattern for Nobel images
        category: prize ? mapCategory(prize.category.en) : 'Physics',
        year: prize ? parseInt(prize.awardYear) : 0,
        motivation: prize?.motivation?.en || 'No motivation available.',
        biography: `Nobel laureate ${fullName}, awarded the Nobel Prize in ${prize?.category?.en} in ${prize?.awardYear}.`,
        institution: prize?.affiliations?.[0]?.name?.en || 'Independent Researcher',
        lectureCount: 1,
        paperCount: 5,
        isAlive: !apiData.death,
        externalUrl: `https://www.nobelprize.org/laureates/${apiData.id}`
    };
};

/**
 * Search laureates by name (Hits our Local Node.js / MongoDB Backend)
 */
export const searchLaureates = async (query: string): Promise<Laureate[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/laureates?search=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to fetch from local API');
        const { data } = await response.json();

        // If our DB returns results, use them, otherwise fallback to official nobel API
        if (data && data.length > 0) {
            return data;
        }

        // Fallback to official API if not in our DB
        const nobelFallback = await fetch(`${NOBEL_API_URL}/laureates?name=${encodeURIComponent(query)}&limit=20`);
        const nobelData = await nobelFallback.json();
        return nobelData.laureates ? nobelData.laureates.map(mapLaureate) : [];

    } catch (error) {
        console.error('Error searching laureates:', error);
        return [];
    }
};

/**
 * Get laureate by ID (Hits our Local Node.js / MongoDB Backend)
 */
export const getLaureateById = async (id: string): Promise<Laureate | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/laureates/${id}`);

        if (response.ok) {
            const { data } = await response.json();
            if (data) return data;
        }

        // Fallback to official API
        const nobelFallback = await fetch(`${NOBEL_API_URL}/laureate/${id}`);
        const nobelData = await nobelFallback.json();
        if (!nobelData || nobelData.length === 0) return null;
        return mapLaureate(nobelData[0]);

    } catch (error) {
        console.error('Error fetching laureate details:', error);
        return null;
    }
};

/**
 * Get latest laureates
 */
export const getLatestLaureates = async (limit: number = 20): Promise<Laureate[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/laureates?limit=${limit}&sort=year-desc`);
        if (response.ok) {
            const { data } = await response.json();
            if (data && data.length > 0) return data;
        }

        // Fallback
        const nobelFallback = await fetch(`${NOBEL_API_URL}/laureates?limit=${limit}&sort=desc`);
        const nobelData = await nobelFallback.json();
        return nobelData.laureates ? nobelData.laureates.map(mapLaureate) : [];
    } catch (error) {
        console.error('Error fetching latest laureates:', error);
        return [];
    }
};
