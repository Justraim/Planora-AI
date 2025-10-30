import React, { useState, useEffect } from 'react';
import type { ItineraryPreferences } from '../types';
import { ClockIcon } from './icons/ClockIcon';
import { CurrencyDollarIcon } from './icons/CurrencyDollarIcon';

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
  imageUrl: string;
}

const sampleItineraries: SampleItinerary[] = [
  {
    title: "Cape Town",
    duration: "8 Days",
    budget: "Mid range",
    description: "Discover the beauty of Table Mountain and the rich history of South Africa's Mother City.",
    imageUrl: "https://images.unsplash.com/photo-1576487248805-cf40f3c02882?q=80&w=2070&auto=format&fit=crop",
    preferences: {
      destination: "Cape Town, South Africa",
      tripDuration: 8,
      budget: "Mid range",
      pacing: "Explore and Unwind",
      tripPurpose: ["Adventure and Hiking", "Cultural Exploration"],
      mostExcitedAbout: ["Beaches and Scenic Views", "Nature and adventures", "Wine Farms"],
    },
  },
  {
    title: "Kyoto",
    duration: "7 Days",
    budget: "Mid range",
    description: "Immerse yourself in ancient temples, serene gardens, and traditional arts in old Japan.",
    imageUrl: "https://images.unsplash.com/photo-1536531015638-3c35b1599d8d?q=80&w=1974&auto=format&fit=crop",
    preferences: {
        destination: "Kyoto, Japan",
        tripDuration: 7,
        budget: "Mid range",
        pacing: "Explore and Unwind",
        tripPurpose: ["Cultural Exploration"],
        mostExcitedAbout: ["Art Galleries and Museums", "Restaurants and Food", "Nature and adventures"],
    },
  },
  {
    title: "Paris",
    duration: "4 Days",
    budget: "Lux",
    description: "Experience the magic of the City of Light with museums, charming cafés, and romantic strolls.",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760c0337?q=80&w=1974&auto=format&fit=crop",
    preferences: {
        destination: "Paris, France",
        tripDuration: 4,
        budget: "Lux",
        pacing: "Maximize Every Moment",
        tripPurpose: ["Romantic Getaway"],
        mostExcitedAbout: ["Art Galleries and Museums", "Restaurants and Food", "Cocktails and Nightlife"],
    },
  },
  {
    title: "Costa Rica",
    duration: "10 Days",
    budget: "Budget",
    description: "Explore lush rainforests, volcanic landscapes, and stunning coastlines for nature lovers.",
    imageUrl: "https://images.unsplash.com/photo-1532598199736-54de93d395a1?q=80&w=2070&auto=format&fit=crop",
    preferences: {
        destination: "Costa Rica",
        tripDuration: 10,
        budget: "Budget",
        pacing: "Maximize Every Moment",
        tripPurpose: ["Adventure and Hiking"],
        mostExcitedAbout: ["Nature and adventures", "Beaches and Scenic Views"],
    },
  },
];

const SampleCard: React.FC<SampleItinerary & { onSelect: () => void }> = ({ title, duration, budget, description, onSelect, imageUrl }) => (
    <button
      onClick={onSelect}
      className="text-left w-full rounded-2xl bg-surface border border-border shadow-subtle overflow-hidden transition-shadow duration-300 hover:shadow-lg group"
    >
      <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-primary">{title}</h3>
        <p className="text-sm mt-1 mb-4 text-secondary">{description}</p>
        <div className="flex items-center text-xs font-medium gap-4 pt-3 border-t border-border text-secondary">
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CurrencyDollarIcon className="w-4 h-4" />
            <span>{budget}</span>
          </div>
        </div>
      </div>
    </button>
  );


const LandingPage: React.FC<Props> = ({ onStart, onSampleSelect }) => {
  const [displayedItineraries, setDisplayedItineraries] = useState<SampleItinerary[]>([]);

  useEffect(() => {
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