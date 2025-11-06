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
    imageUrl: "https://images.unsplash.com/photo-1576485299334-421c9a2a7a27?q=80&w=1974&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1622303038480-205167a6a40a?q=80&w=2070&auto=format&fit=crop",
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
    title: "Coastal Bliss in Durban",
    duration: "4 Days",
    budget: "Budget",
    description: "Golden beaches, warm Indian Ocean waters, and a vibrant multicultural vibe.",
    imageUrl: "https://images.unsplash.com/photo-1594924842426-99313d420556?q=80&w=2070&auto=format&fit=crop",
    preferences: {
      destination: "Durban, South Africa",
      tripDuration: 4,
      budget: "Budget",
      pacing: "Go with the Flow",
      tripPurpose: ["Holiday/Vacation"],
      mostExcitedAbout: ["Beaches and Scenic Views", "Local Markets and Shopping"],
    },
  },
  {
    title: "Ancient Medinas in Rabat",
    duration: "3 Days",
    budget: "Budget",
    description: "Discover the imperial city with its historic kasbahs and royal landmarks.",
    imageUrl: "https://images.unsplash.com/photo-1590123537827-21a42e032543?q=80&w=1964&auto=format&fit=crop",
    preferences: {
        destination: "Rabat, Morocco",
        tripDuration: 3,
        budget: "Budget",
        pacing: "Explore and Unwind",
        tripPurpose: ["Cultural Exploration"],
        mostExcitedAbout: ["History and Culture", "Hidden Gems and Unique Experiences"],
    },
  },
  {
    title: "Island Escape in Bali",
    duration: "7 Days",
    budget: "Mix",
    description: "Lush rice terraces, ancient temples, and stunning cliffside views await.",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df97525p?q=80&w=1935&auto=format&fit=crop",
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
    title: "Future Meets Tradition in Tokyo",
    duration: "6 Days",
    budget: "Mid range",
    description: "Neon-lit skyscrapers, tranquil temples, and world-class cuisine.",
    imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop",
    preferences: {
      destination: "Tokyo, Japan",
      tripDuration: 6,
      budget: "Mid range",
      pacing: "Maximize Every Moment",
      tripPurpose: ["Cultural Exploration"],
      mostExcitedAbout: ["Restaurants and Food", "Local Markets and Shopping", "Cocktails and Nightlife"],
    },
  },
  {
    title: "Tropical Paradise in Zanzibar",
    duration: "6 Days",
    budget: "Mid range",
    description: "White sand beaches, turquoise waters, and a rich history in Stone Town.",
    imageUrl: "https://images.unsplash.com/photo-1603723321966-530dd71a10c2?q=80&w=2070&auto=format&fit=crop",
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent [text-shadow:0_2px_4px_rgb(0_0_0_/_0.5)]"></div>
      <div className="absolute bottom-0 left-0 p-5 w-full">
         <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-white bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">{duration}</span>
            {budget && <span className={`text-xs font-semibold px-2 py-1 rounded-full ${budgetColorMap[budget] || 'bg-gray-100 text-gray-800'}`}>{budget}</span>}
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm mt-1 text-white">{description}</p>
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