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
    title: "A Fairytale Weekend in Bruges",
    duration: "3 Days",
    budget: "Mid range",
    description: "Wander through cobblestone streets and cruise along scenic canals.",
    imageUrl: "https://images.unsplash.com/photo-1596701836640-153315287d63?q=80&w=800&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1600579979189-53e33c407a4a?q=80&w=800&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1534570122622-54d5e5b6a49e?q=80&w=800&auto=format&fit=crop",
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

const featuredDestinations = [
    { name: 'Cape Town', imageUrl: 'https://images.unsplash.com/photo-1576487248805-cf40f448237d?q=80&w=800&auto=format&fit=crop', preferences: { destination: 'Cape Town, South Africa' } },
    { name: 'Tokyo', imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop', preferences: { destination: 'Tokyo, Japan' } },
    { name: 'Lisbon', imageUrl: 'https://images.unsplash.com/photo-1588690152936-39a7a6345dea?q=80&w=800&auto=format&fit=crop', preferences: { destination: 'Lisbon, Portugal' } },
    { name: 'Zanzibar', imageUrl: 'https://images.unsplash.com/photo-1610282522425-06d2c4b8b8b0?q=80&w=800&auto=format&fit=crop', preferences: { destination: 'Zanzibar, Tanzania' } },
    { name: 'Bali', imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df97525d?q=80&w=800&auto=format&fit=crop', preferences: { destination: 'Bali, Indonesia' } },
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

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div>
      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10 text-accent mx-auto mb-4">
        {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      <p className="text-secondary text-sm">{children}</p>
    </div>
);

const DestinationTile: React.FC<{ name: string; imageUrl: string; onSelect: () => void }> = ({ name, imageUrl, onSelect }) => (
    <button
        onClick={onSelect}
        className="relative text-left w-full h-48 rounded-2xl bg-surface border border-border shadow-subtle overflow-hidden transition-all duration-300 hover:shadow-lg group"
    >
        <div 
            className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110" 
            style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white w-full">
            <h3 className="text-lg font-bold">{name}</h3>
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

      <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-3xl font-bold text-center mb-8">Where Will You Go Next?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredDestinations.map((dest) => (
            <DestinationTile 
              key={dest.name}
              {...dest}
              onSelect={() => onSampleSelect(dest.preferences)}
            />
          ))}
        </div>
      </div>

      <div className="text-center py-12 md:py-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-4xl font-bold">Travel smarter with Itinerae.</h2>
      </div>

    </div>
  );
};

export default LandingPage;