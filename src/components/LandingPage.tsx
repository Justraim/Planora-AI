import React, { useState, useEffect } from 'react';
import type { ItineraryPreferences } from '../types';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { PrinterIcon } from './icons/PrinterIcon';
import { ClockIcon } from './icons/ClockIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { MapPinIcon } from './icons/MapPinIcon';

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
    title: "Vibrant City Life in Cape Town",
    duration: "5 Days",
    budget: "Mix",
    description: "From Table Mountain to the V&A Waterfront, experience the best of the Mother City.",
    imageUrl: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c75?q=80&w=2070&auto=format&fit=crop",
    preferences: {
      destination: "Cape Town, South Africa",
      tripDuration: 5,
      budget: "Mix",
      pacing: "Explore and Unwind",
      tripPurpose: ["Holiday/Vacation", "Nature and Outdoor Adventures"],
      mostExcitedAbout: ["Beaches and Scenic Views", "Restaurants and Food", "Wine Farms and Vineyards"],
    },
  },
  {
    title: "Urban Energy in Johannesburg",
    duration: "4 Days",
    budget: "Mid range",
    description: "Explore the historic heart of South Africa's largest city and its vibrant culture.",
    imageUrl: "https://images.unsplash.com/photo-1628009890710-4664a7536a4a?q=80&w=2560&auto=format&fit=crop",
    preferences: {
      destination: "Johannesburg, South Africa",
      tripDuration: 4,
      budget: "Mid range",
      pacing: "Maximize Every Moment",
      tripPurpose: ["Cultural Exploration"],
      mostExcitedAbout: ["Art Galleries and Museums", "History and Culture", "Local Markets and Shopping"],
    },
  },
  {
    title: "The Ultimate London Experience",
    duration: "4 Days",
    budget: "Mid range",
    description: "From historic landmarks to modern marvels, explore the best of London.",
    imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1280&auto=format&fit=crop",
    preferences: {
      destination: "London, UK",
      tripDuration: 4,
      budget: "Mid range",
      pacing: "Explore and Unwind",
      tripPurpose: ["Cultural Exploration", "Holiday/Vacation"],
      mostExcitedAbout: ["History and Culture", "Art Galleries and Museums", "Local Markets and Shopping"],
    },
  },
  {
    title: "Big Apple Adventure",
    duration: "5 Days",
    budget: "Lux",
    description: "Discover iconic sights and hidden gems in the city that never sleeps.",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1280&auto=format&fit=crop",
    preferences: {
        destination: "New York, USA",
        tripDuration: 5,
        budget: "Lux",
        pacing: "Maximize Every Moment",
        tripPurpose: ["Holiday/Vacation"],
        mostExcitedAbout: ["Cocktails and Nightlife", "Restaurants and Food", "Art Galleries and Museums"],
    },
  },
  {
    title: "Island Escape in Bali",
    duration: "7 Days",
    budget: "Mix",
    description: "Lush rice terraces, ancient temples, and stunning cliffside views await.",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df97525d?q=80&w=1280&auto=format&fit=crop",
    preferences: {
        destination: "Bali, Indonesia",
        tripDuration: 7,
        budget: "Mix",
        pacing: "Go with the Flow",
        tripPurpose: ["Adventure and Hiking", "Romantic Getaway"],
        mostExcitedAbout: ["Beaches and Scenic Views", "Nature and Outdoor Adventures", "Hidden Gems and Unique Experiences"],
    },
  },
  {
    title: "Spanish Charm in Madrid",
    duration: "4 Days",
    budget: "Budget",
    description: "Experience vibrant plazas, world-class art, and delicious tapas.",
    imageUrl: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1280&auto=format&fit=crop",
    preferences: {
      destination: "Madrid, Spain",
      tripDuration: 4,
      budget: "Budget",
      pacing: "Explore and Unwind",
      tripPurpose: ["Cultural Exploration"],
      mostExcitedAbout: ["Restaurants and Food", "Art Galleries and Museums", "Cocktails and Nightlife"],
    },
  },
  {
    title: "Tropical Paradise in Zanzibar",
    duration: "6 Days",
    budget: "Mid range",
    description: "White sand beaches, turquoise waters, and a rich history in Stone Town.",
    imageUrl: "https://images.unsplash.com/photo-1610423012213-35f11a7a8f3b?q=80&w=1974&auto=format&fit=crop",
    preferences: {
      destination: "Zanzibar, Tanzania",
      tripDuration: 6,
      budget: "Mid range",
      pacing: "Go with the Flow",
      tripPurpose: ["Romantic Getaway", "Holiday/Vacation"],
      mostExcitedAbout: ["Beaches and Scenic Views", "History and Culture", "Hidden Gems and Unique Experiences"],
    },
  }
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-5 w-full [text-shadow:0_1px_3px_rgb(0_0_0_/_0.6)]">
         <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">{duration}</span>
            {budget && <span className={`text-xs font-semibold px-2 py-1 rounded-full ${budgetColorMap[budget] || 'bg-gray-100 text-gray-800'}`}>{budget}</span>}
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm mt-1 text-white/95">{description}</p>
      </div>
    </button>
);

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div>
      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10 text-accent mx-auto mb-4">
        {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      <p className="text-secondary text-sm">{children}</p>
    </div>
);

const LandingPage: React.FC<Props> = ({ onStart, onSampleSelect }) => {
  const [displayedItineraries, setDisplayedItineraries] = useState<SampleItinerary[]>([]);

  useEffect(() => {
    const saItineraries = sampleItineraries.filter(it => it.preferences.destination?.includes('South Africa'));
    const otherItineraries = sampleItineraries.filter(it => !it.preferences.destination?.includes('South Africa'));
    
    // 1. Pick one from SA
    const mandatoryItinerary = saItineraries[Math.floor(Math.random() * saItineraries.length)];
    
    // 2. Shuffle others and pick two
    const shuffledOthers = [...otherItineraries].sort(() => 0.5 - Math.random());
    const otherTwo = shuffledOthers.slice(0, 2);
    
    // 3. Combine and shuffle the final three to randomize their display order
    const finalThree = [mandatoryItinerary, ...otherTwo].sort(() => 0.5 - Math.random());
    
    setDisplayedItineraries(finalThree);
  }, []);

  return (
    <div className="space-y-24">
      <div className="text-center pt-8 animate-fade-in-up max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold">Plan less. Travel more.</h1>
        <p className="mt-6 text-lg text-secondary">
          Instant, data-driven itineraries tailored to your preferences.
        </p>
        <button
          onClick={onStart}
          className="mt-8 bg-accent text-white font-semibold py-3 px-6 rounded-lg hover:bg-accent-hover focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all duration-300"
        >
          Create My Itinerary
        </button>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl font-bold text-center mb-8">Inspired Itineraries</h2>
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
      
      <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center max-w-5xl mx-auto">
          <FeatureItem icon={<PaperAirplaneIcon />} title="1. Tell us your plans">Fill in quick preferences for your interests, dates, and travel style.</FeatureItem>
          <FeatureItem icon={<SparklesIcon />} title="2. AI crafts your journey">Our smart planner curates activities, routes, and dining options instantly.</FeatureItem>
          <FeatureItem icon={<PrinterIcon />} title="3. Download or customize">Get a ready-to-go itinerary or tweak it anytime to make it perfect.</FeatureItem>
        </div>
      </div>
      
      <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
         <h2 className="text-3xl font-bold text-center mb-12">Why Travelers Choose Itinerae</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <FeatureItem icon={<ClockIcon />} title="Instant Planning">Get a full itinerary in seconds, not hours.</FeatureItem>
            <FeatureItem icon={<LightBulbIcon />} title="Smarter with Every Trip">Powered by advanced AI and real traveler data.</FeatureItem>
            <FeatureItem icon={<CalendarIcon />} title="Effortless Bookings">Reserve experiences directly from your itinerary.</FeatureItem>
            <FeatureItem icon={<MapPinIcon />} title="Made for You">Every journey is tailored to your unique travel style.</FeatureItem>
         </div>
      </div>

      <div className="text-center py-12 md:py-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-4xl font-bold">Travel smarter with Itinerae.</h2>
      </div>

    </div>
  );
};

export default LandingPage;