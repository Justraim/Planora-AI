import React, { useState, useEffect } from 'react';
import type { ItineraryPreferences } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
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
  patternClass: string;
  textColor: string;
  preferences: Partial<ItineraryPreferences>;
}

const capeTownItinerary: SampleItinerary = {
  title: "Cape Town",
  duration: "8 Days",
  budget: "Mid range",
  patternClass: "pattern-1",
  textColor: "text-blue-900",
  description: "Discover the stunning beauty of Table Mountain, vibrant neighborhoods, and the rich history of South Africa's Mother City.",
  preferences: {
    destination: "Cape Town, South Africa",
    tripDuration: 8,
    budget: "Mid range",
    pacing: "Explore and Unwind",
    tripPurpose: ["Adventure and Hiking", "Cultural Exploration"],
    mostExcitedAbout: ["Beaches and Scenic Views", "Nature and adventures", "Wine Farms"],
  }
};

const allSampleItineraries: SampleItinerary[] = [
  {
    title: "Kyoto",
    duration: "7 Days",
    budget: "Mid range",
    patternClass: "pattern-2",
    textColor: "text-red-900",
    description: "Immerse yourself in ancient temples, serene gardens, and traditional arts. A journey through the heart of old Japan.",
    preferences: {
        destination: "Kyoto, Japan",
        tripDuration: 7,
        budget: "Mid range",
        pacing: "Explore and Unwind",
        tripPurpose: ["Cultural Exploration"],
        mostExcitedAbout: ["Art Galleries and Museums", "Restaurants and Food", "Nature and adventures"],
    }
  },
  {
    title: "Paris",
    duration: "4 Days",
    budget: "Lux",
    patternClass: "pattern-3",
    textColor: "text-purple-900",
    description: "Experience the magic of the City of Light with museum visits, charming cafés, and romantic evening strolls.",
    preferences: {
        destination: "Paris, France",
        tripDuration: 4,
        budget: "Lux",
        pacing: "Maximize Every Moment",
        tripPurpose: ["Romantic Getaway"],
        mostExcitedAbout: ["Art Galleries and Museums", "Restaurants and Food", "Cocktails and Nightlife"],
    }
  },
  {
    title: "Costa Rica",
    duration: "10 Days",
    budget: "Budget",
    patternClass: "pattern-4",
    textColor: "text-green-900",
    description: "Explore lush rainforests, volcanic landscapes, and stunning coastlines. An action-packed trip for nature lovers.",
    preferences: {
        destination: "Costa Rica",
        tripDuration: 10,
        budget: "Budget",
        pacing: "Maximize Every Moment",
        tripPurpose: ["Adventure and Hiking"],
        mostExcitedAbout: ["Nature and adventures", "Beaches and Scenic Views"],
    }
  },
    {
    title: "Rome",
    duration: "6 Days",
    budget: "Mid range",
    patternClass: "pattern-2",
    textColor: "text-amber-900",
    description: "Walk through history in the Eternal City, from the Colosseum to the Vatican, indulging in pasta and gelato along the way.",
    preferences: {
        destination: "Rome, Italy",
        tripDuration: 6,
        budget: "Mid range",
        pacing: "Explore and Unwind",
        tripPurpose: ["Cultural Exploration", "Holiday/Vacation"],
        mostExcitedAbout: ["Art Galleries and Museums", "Restaurants and Food"],
    }
  },
  {
    title: "Thai Islands",
    duration: "12 Days",
    budget: "Budget",
    patternClass: "pattern-1",
    textColor: "text-teal-900",
    description: "Island hop between Phuket and Koh Samui, discovering pristine beaches, vibrant nightlife, and world-class snorkeling.",
    preferences: {
        destination: "Phuket & Koh Samui, Thailand",
        tripDuration: 12,
        budget: "Budget",
        pacing: "Go with the Flow",
        tripPurpose: ["Holiday/Vacation"],
        mostExcitedAbout: ["Beaches and Scenic Views", "Cocktails and Nightlife"],
    }
  },
  {
    title: "Swiss Alps",
    duration: "8 Days",
    budget: "Lux",
    patternClass: "pattern-4",
    textColor: "text-slate-900",
    description: "Breathe in fresh mountain air, hike through stunning alpine meadows, and relax in charming villages in Interlaken.",
    preferences: {
        destination: "Interlaken, Switzerland",
        tripDuration: 8,
        budget: "Lux",
        pacing: "Go with the Flow",
        tripPurpose: ["Adventure and Hiking"],
        mostExcitedAbout: ["Nature and adventures", "Beaches and Scenic Views"],
    }
  },
];

const SampleCard: React.FC<SampleItinerary & { onSelect: () => void }> = ({ title, duration, budget, description, patternClass, textColor, onSelect }) => (
  <button 
    onClick={onSelect} 
    className={`relative text-left w-full h-64 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1.5 border border-gray-200/80 group ${patternClass}`}
  >
    <div className="p-6 flex flex-col justify-between h-full bg-gradient-to-t from-black/5 to-transparent">
        <div>
            <h2 className={`font-serif text-8xl font-bold ${textColor} opacity-10 group-hover:opacity-15 transition-opacity duration-300 absolute -bottom-4 -right-2 select-none`}>
                {title}
            </h2>
            <p className="text-gray-700 font-semibold mb-3">{description}</p>
        </div>
        <div className="flex items-center justify-start text-sm text-gray-600 font-medium gap-4 pt-3 border-t border-gray-900/10">
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
    const otherItineraries = allSampleItineraries.filter(it => it.title !== capeTownItinerary.title);
    const shuffled = otherItineraries.sort(() => 0.5 - Math.random());
    const randomTwo = shuffled.slice(0, 2);
    const finalThree = [capeTownItinerary, ...randomTwo].sort(() => 0.5 - Math.random());
    setDisplayedItineraries(finalThree);
  }, []);

  return (
    <div className="space-y-16">
      <div className="text-center pt-8 animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800">Your Perfect Trip, Planned in Seconds</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Stop worrying about the details. Let Itinerae AI craft a personalized travel itinerary that matches your style, budget, and dreams.</p>
        <button
          onClick={onStart}
          className="mt-8 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
        >
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-6 w-6" />
            Create My Free Itinerary
          </div>
        </button>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Get Inspired</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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