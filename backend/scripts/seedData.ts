import mongoose from 'mongoose';
import { LaureateModel } from '../src/models/laureate.model';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/nobelhub';

// Sample curated mock data based on the frontend mockData.ts
const seedData = [
    {
        id: 'einstein',
        firstName: 'Albert',
        lastName: 'Einstein',
        fullName: 'Albert Einstein',
        birthYear: 1879,
        birthPlace: 'Ulm, Germany',
        nationality: 'German-American',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/440px-Albert_Einstein_Head.jpg',
        category: 'Physics',
        year: 1921,
        externalUrl: 'https://www.nobelprize.org/prizes/physics/1921/einstein/biographical/',
        motivation: 'For his services to Theoretical Physics, and especially for his discovery of the law of the photoelectric effect.',
        biography: 'Albert Einstein was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics. His work is also known for its influence on the philosophy of science.',
        institution: 'Kaiser Wilhelm Institute',
        lectureCount: 3,
        paperCount: 12,
        isAlive: false,
    },
    {
        id: 'curie',
        firstName: 'Marie',
        lastName: 'Curie',
        fullName: 'Marie Curie',
        birthYear: 1867,
        birthPlace: 'Warsaw, Poland',
        nationality: 'Polish-French',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Marie_Curie_c._1920s.jpg/440px-Marie_Curie_c._1920s.jpg',
        category: 'Chemistry',
        year: 1911,
        externalUrl: 'https://www.nobelprize.org/prizes/chemistry/1911/curie/biographical/',
        motivation: 'In recognition of her extraordinary services to the advancement of chemistry by the discovery of the elements radium and polonium.',
        biography: 'Marie Curie was a Polish and naturalised-French physicist and chemist who conducted pioneering research on radioactivity. She was the first woman to win a Nobel Prize, and the only person to win in two different sciences.',
        institution: 'University of Paris',
        lectureCount: 2,
        paperCount: 18,
        isAlive: false,
    },
    {
        id: 'malala',
        firstName: 'Malala',
        lastName: 'Yousafzai',
        fullName: 'Malala Yousafzai',
        birthYear: 1997,
        birthPlace: 'Mingora, Pakistan',
        nationality: 'Pakistani',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Malala_Yousafzai.jpg',
        category: 'Peace',
        year: 2014,
        externalUrl: 'https://www.nobelprize.org/prizes/peace/2014/yousafzai/facts/',
        motivation: 'For their struggle against the suppression of children and young people and for the right of all children to education.',
        biography: 'Malala Yousafzai is a Pakistani activist for female education and the youngest Nobel Prize laureate. She is known for human rights advocacy, especially the education of women and children in her native Swat Valley in Khyber Pakhtunkhwa.',
        institution: 'Malala Fund',
        lectureCount: 2,
        paperCount: 0,
        isAlive: true,
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB Connected for seeding');

        await LaureateModel.deleteMany({});
        console.log('Cleared existing data');

        await LaureateModel.insertMany(seedData);
        console.log('Seed data inserted successfully!');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDB();
