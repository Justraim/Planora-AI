import React, { useState, useEffect } from 'react';
import type { ItineraryPreferences } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { ClockIcon } from './icons/ClockIcon';
import { CurrencyDollarIcon } from './icons/CurrencyDollarIcon';
import { MountainIcon } from './icons/MountainIcon';
import { TempleIcon } from './icons/TempleIcon';
import { EiffelTowerIcon } from './icons/EiffelTowerIcon';
import { PalmTreeIcon } from './icons/PalmTreeIcon';

interface Props {
  onStart: () => void;
  onSampleSelect: (samplePrefs: Partial<ItineraryPreferences>) => void;
}

interface SampleItinerary {
  title: string;
  duration: string;
  budget: ItineraryPreferences['budget'];
  description: string;
  bgColor: string;
  titleColor: string;
  textColor: string;
  preferences: Partial<ItineraryPreferences>;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const sampleItineraries: SampleItinerary[] = [
  {
    title: "Cape Town",
    duration: "8 Days",
    budget: "Mid range",
    bgColor: "bg-[#0c2a4c]",
    titleColor: "text-blue-200/50",
    textColor: "text-blue-200",
    description: "Discover the stunning beauty of Table Mountain, vibrant neighborhoods, and the rich history of South Africa's Mother City.",
    preferences: {
      destination: "Cape Town, South Africa",
      tripDuration: 8,
      budget: "Mid range",
      pacing: "Explore and Unwind",
      tripPurpose: ["Adventure and Hiking", "Cultural Exploration"],
      mostExcitedAbout: ["Beaches and Scenic Views", "Nature and adventures", "Wine Farms"],
    },
    icon: MountainIcon,
  },
  {
    title: "Kyoto",
    duration: "7 Days",
    budget: "Mid range",
    bgColor: "bg-[#4a1a2c]",
    titleColor: "text-red-200/50",
    textColor: "text-red-200",
    description: "Immerse yourself in ancient temples, serene gardens, and traditional arts. A journey through the heart of old Japan.",
    preferences: {
        destination: "Kyoto, Japan",
        tripDuration: 7,
        budget: "Mid range",
        pacing: "Explore and Unwind",
        tripPurpose: ["Cultural Exploration"],
        mostExcitedAbout: ["Art Galleries and Museums", "Restaurants and Food", "Nature and adventures"],
    },
    icon: TempleIcon,
  },
  {
    title: "Paris",
    duration: "4 Days",
    budget: "Lux",
    bgColor: "bg-[#3a255c]",
    titleColor: "text-purple-200/50",
    textColor: "text-purple-200",
    description: "Experience the magic of the City of Light with museum visits, charming cafés, and romantic evening strolls.",
    preferences: {
        destination: "Paris, France",
        tripDuration: 4,
        budget: "Lux",
        pacing: "Maximize Every Moment",
        tripPurpose: ["Romantic Getaway"],
        mostExcitedAbout: ["Art Galleries and Museums", "Restaurants and Food", "Cocktails and Nightlife"],
    },
    icon: EiffelTowerIcon,
  },
  {
    title: "Costa Rica",
    duration: "10 Days",
    budget: "Budget",
    bgColor: "bg-[#164a3f]",
    titleColor: "text-green-200/50",
    textColor: "text-green-200",
    description: "Explore lush rainforests, volcanic landscapes, and stunning coastlines. An action-packed trip for nature lovers.",
    preferences: {
        destination: "Costa Rica",
        tripDuration: 10,
        budget: "Budget",
        pacing: "Maximize Every Moment",
        tripPurpose: ["Adventure and Hiking"],
        mostExcitedAbout: ["Nature and adventures", "Beaches and Scenic Views"],
    },
    icon: PalmTreeIcon,
  },
];

const SampleCard: React.FC<SampleItinerary & { onSelect: () => void }> = ({ title, duration, budget, description, bgColor, titleColor, textColor, onSelect, icon: Icon }) => (
  <button 
    onClick={onSelect} 
    className={`relative text-left w-full h-64 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1.5 border border-white/10 group ${bgColor}`}
  >
    <Icon className={`absolute top-5 left-5 w-10 h-10 ${textColor} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
    <div className="p-6 flex flex-col justify-between h-full bg-gradient-to-t from-black/20 to-transparent">
        <div>
            <h2 className={`font-serif text-8xl font-bold ${titleColor} group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-4 -right-2 select-none`}>
                {title}
            </h2>
            <p className={`font-semibold mb-3 ${textColor}`}>{description}</p>
        </div>
        <div className={`flex items-center justify-start text-sm font-medium gap-4 pt-3 border-t border-white/10 ${textColor}`}>
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
    <div className="space-y-16">
      <div className="text-center pt-8 animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold text-accent-soft">Your Perfect Trip, Planned in Seconds</h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">Stop worrying about the details. Let Itinerae AI craft a personalized travel itinerary that matches your style, budget, and dreams.</p>
        <button
          onClick={onStart}
          className="mt-8 bg-accent text-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-accent transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
        >
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-6 w-6" />
            Create My Free Itinerary
          </div>
        </button>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl font-bold text-center text-accent-soft mb-8">Get Inspired</h2>
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