import React, { useState, useEffect } from 'react';
import type { ItineraryPreferences } from '../types';
import { CityscapeIcon } from './icons/CityscapeIcon';
import { MountainIcon } from './icons/MountainIcon';

interface Props {
  onStart: () => void;
  onSampleSelect: (samplePrefs: Partial<ItineraryPreferences>) => void;
}

interface SampleItinerary {
  title: string;
  duration: string;
  budget: ItineraryPreferences['budget'];
  description: string;
  preferences: Partial<ItineraryPreferences>;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const sampleItineraries: SampleItinerary[] = [
  {
    title: "A Fairytale Weekend in Bruges",
    duration: "3 Days",
    budget: "Mid range",
    description: "Wander through cobblestone streets and cruise along scenic canals.",
    icon: CityscapeIcon,
    preferences: {
      destination: "Bruges, Belgium",
      tripDuration: 3,
      budget: "Mid range",
      pacing: "Explore and Unwind",
      tripPurpose: ["Romantic Getaway", "Cultural Exploration"],
      mostExcitedAbout: ["Local Markets and Shopping", "Restaurants and Food"],
    },
  },
  {
    title: "Cozy Autumn in The Cotswolds",
    duration: "4 Days",
    budget: "Mid range",
    description: "Charming stone villages, rolling hills, and cozy pubs.",
    icon: CityscapeIcon,
    preferences: {
        destination: "The Cotswolds, UK",
        tripDuration: 4,
        budget: "Mid range",
        pacing: "Go with the Flow",
        tripPurpose: ["Holiday/Vacation"],
        mostExcitedAbout: ["Nature and adventures", "Restaurants and Food"],
    },
  },
  {
    title: "Magical Northern Lights in Iceland",
    duration: "5 Days",
    budget: "Lux",
    description: "Chase the Aurora Borealis and explore stunning ice caves.",
    icon: MountainIcon,
    preferences: {
        destination: "Reykjavik, Iceland",
        tripDuration: 5,
        budget: "Lux",
        pacing: "Maximize Every Moment",
        tripPurpose: ["Adventure and Hiking"],
        mostExcitedAbout: ["Nature and adventures", "Beaches and Scenic Views"],
    },
  },
];

const budgetColorMap: { [key in Exclude<ItineraryPreferences['budget'], ''>]: string } = {
  'Budget': 'bg-green-100 text-green-800',
  'Mid range': 'bg-blue-100 text-blue-800',
  'Lux': 'bg-purple-100 text-purple-800',
  'Mix': 'bg-yellow-100 text-yellow-800',
};

const SampleCard: React.FC<SampleItinerary & { onSelect: () => void }> = ({ title, duration, budget, description, onSelect, icon: Icon }) => (
    <button
      onClick={onSelect}
      className="text-left w-full rounded-2xl bg-surface border border-border shadow-subtle overflow-hidden transition-all duration-300 hover:shadow-lg group flex flex-col hover:-translate-y-1"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center p-6">
        <Icon className="w-24 h-24 text-gray-300 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:text-accent" />
      </div>
      <div className="p-5 flex-grow flex flex-col">
         <h3 className="text-lg font-bold text-primary">{title}</h3>
         <p className="text-sm mt-1 text-secondary flex-grow">{description}</p>
         <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
            <span className="text-xs font-semibold bg-gray-100 text-gray-800 px-2 py-1 rounded-full">{duration}</span>
            {budget && <span className={`text-xs font-semibold px-2 py-1 rounded-full ${budgetColorMap[budget] || 'bg-gray-100 text-gray-800'}`}>{budget}</span>}
        </div>
      </div>
    </button>
  );


const LandingPage: React.FC<Props> = ({ onStart, onSampleSelect }) => {
  const [displayedItineraries, setDisplayedItineraries] = useState<SampleItinerary[]>([]);

  useEffect(() => {
    // Show a consistent set of 3 random itineraries on each load
    const shuffled = [...sampleItineraries].sort(() => 0.5 - Math.random());
    const randomThree = shuffled.slice(0, 3);
    setDisplayedItineraries(randomThree);
  }, []);

  return (
    <div className="space-y-24">
      <div className="text-center pt-8 animate-fade-in-up max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold">Your perfect trip, planned in seconds.</h1>
        <p className="mt-6 text-lg text-secondary">
          Stop worrying about the details. Let Itinerae AI craft a personalized travel itinerary that matches your style, budget, and dreams.
        </p>
        <button
          onClick={onStart}
          className="mt-8 bg-accent text-white font-semibold py-3 px-6 rounded-lg hover:bg-accent-hover focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all duration-300"
        >
          Create My Itinerary
        </button>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl font-bold text-center mb-8">Or get inspired</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItineraries.map((itinerary) => (
            <SampleCard 
              key={itinerary.title} 
              {...itinerary} 
              onSelect={() => onSampleSelect(itinerary.preferences)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;