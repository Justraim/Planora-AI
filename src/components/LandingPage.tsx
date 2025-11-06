import React from 'react';
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
}

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div>
      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10 text-accent mx-auto mb-4">
        {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      <p className="text-secondary text-sm">{children}</p>
    </div>
);

const LandingPage: React.FC<Props> = ({ onStart }) => {
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
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center max-w-5xl mx-auto">
          <FeatureItem icon={<PaperAirplaneIcon />} title="1. Tell us your plans">Fill in quick preferences for your interests, dates, and travel style.</FeatureItem>
          <FeatureItem icon={<SparklesIcon />} title="2. AI crafts your journey">Our smart planner curates activities, routes, and dining options instantly.</FeatureItem>
          <FeatureItem icon={<PrinterIcon />} title="3. Download or customize">Get a ready-to-go itinerary or tweak it anytime to make it perfect.</FeatureItem>
        </div>
      </div>
      
      <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
         <h2 className="text-3xl font-bold text-center mb-12">Why Travelers Choose Itinerae</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <FeatureItem icon={<ClockIcon />} title="Instant Planning">Get a full itinerary in seconds, not hours.</FeatureItem>
            <FeatureItem icon={<LightBulbIcon />} title="Smarter with Every Trip">Powered by advanced AI and real traveler data.</FeatureItem>
            <FeatureItem icon={<CalendarIcon />} title="Effortless Bookings">Reserve experiences directly from your itinerary.</FeatureItem>
            <FeatureItem icon={<MapPinIcon />} title="Made for You">Every journey is tailored to your unique travel style.</FeatureItem>
         </div>
      </div>

      <div className="text-center py-12 md:py-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-4xl font-bold">Travel smarter with Itinerae.</h2>
      </div>

    </div>
  );
};

export default LandingPage;