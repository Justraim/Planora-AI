import React, { useState, useEffect } from 'react';
import type { ItineraryPreferences } from '../types';

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
    title: "A Fairytale Weekend in Bruges",
    duration: "3 Days",
    budget: "Mid range",
    description: "Wander through cobblestone streets and cruise along scenic canals.",
    imageUrl: "https://images.unsplash.com/photo-1596701836640-153315287d63?q=80&w=2070&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1600579979189-53e33c407a4a?q=80&w=1974&auto=format&fit=crop",
    preferences: {
        destination: "The Cotswolds, UK",
        tripDuration: 4,
        budget: "Mid range",
        pacing: "Go with the Flow",
        tripPurpose: ["Holiday/Vacation"],
        mostExcitedAbout: ["Nature and Outdoor Adventures", "Restaurants and Food"],
    },
  },
  {
    title: "Magical Northern Lights in Iceland",
    duration: "5 Days",
    budget: "Lux",
    description: "Chase the Aurora Borealis and explore stunning ice caves.",
    imageUrl: "https://images.unsplash.com/photo-1534570122622-54d5e5b6a49e?q=80&w=1974&auto=format&fit=crop",
    preferences: {
        destination: "Reykjavik, Iceland",
        tripDuration: 5,
        budget: "Lux",
        pacing: "Maximize Every Moment",
        tripPurpose: ["Adventure and Hiking"],
        mostExcitedAbout: ["Nature and Outdoor Adventures", "Beaches and Scenic Views"],
    },
  },
];

const budgetColorMap: { [key in Exclude<ItineraryPreferences['budget'], ''>]: string } = {
  'Budget': 'bg-green-100 text-green-800',
  'Mid range': 'bg-blue-100 text-blue-800',
  'Lux': 'bg-purple-100 text-purple-800',
  'Mix': 'bg-yellow-100 text-yellow-800',
};

const SampleCard: React.FC<SampleItinerary & { onSelect: () => void }> = ({ title, duration, budget, description, onSelect, imageUrl }) => (
    <button
      onClick={onSelect}
      className="relative text-left w-full h-80 rounded-2xl bg-surface border border-border shadow-subtle overflow-hidden transition-all duration-300 hover:shadow-lg group"
    >
      <div 
          className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110" 
          style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-5 text-white w-full">
         <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">{duration}</span>
            {budget && <span className={`text-xs font-semibold px-2 py-1 rounded-full ${budgetColorMap[budget] || 'bg-gray-100 text-gray-800'}`}>{budget}</span>}
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm mt-1 text-white/90">{description}</p>
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