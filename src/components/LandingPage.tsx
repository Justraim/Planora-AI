import React from 'react';
import { PencilIcon } from './icons/PencilIcon';
import { WandIcon } from './icons/WandIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { BoltIcon } from './icons/BoltIcon';
import { BrainIcon } from './icons/BrainIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { UserIcon } from './icons/UserIcon';

interface Props {
  onStart: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-accent/10 rounded-lg text-accent">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-bold text-primary">{title}</h4>
      <p className="mt-1 text-secondary">{children}</p>
    </div>
  </div>
);

const HowItWorksCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-surface p-6 rounded-2xl border border-border shadow-subtle text-center">
        <div className="mx-auto h-12 w-12 flex items-center justify-center bg-accent/10 rounded-full text-accent mb-4">
            {icon}
        </div>
        <h3 className="font-bold text-lg text-primary">{title}</h3>
        <p className="text-secondary mt-2 text-sm">{children}</p>
    </div>
);


const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="space-y-24 md:space-y-32">
      {/* Hero Section */}
      <div className="text-center pt-8 animate-fade-in-up max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold">Your perfect trip, planned in seconds.</h1>
        <p className="mt-6 text-lg text-secondary">
          Stop worrying about the details. Let Itinerae AI craft a personalized travel itinerary that matches your style, budget, and dreams.
        </p>
        <button
          onClick={onStart}
          className="mt-8 bg-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-accent-hover focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all duration-300 text-lg"
        >
          Create My Itinerary
        </button>
      </div>
      
      {/* How It Works Section */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">How It Works</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <HowItWorksCard icon={<PencilIcon className="w-6 h-6" />} title="1. Tell us your plans">
                Fill in quick preferences for your interests, dates, and travel style.
            </HowItWorksCard>
            <HowItWorksCard icon={<WandIcon className="w-6 h-6" />} title="2. AI crafts your journey">
                Our smart planner curates activities, routes, and dining options instantly.
            </HowItWorksCard>
            <HowItWorksCard icon={<DownloadIcon className="w-6 h-6" />} title="3. Download or customise">
                Get a ready-to-go itinerary or tweak it anytime to make it perfect.
            </HowItWorksCard>
        </div>
      </div>
      
      {/* Why Choose Us Section */}
      <div className="animate-fade-in-up max-w-4xl mx-auto" style={{ animationDelay: '0.4s' }}>
         <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">Why Travellers Choose Itinerae</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
          <FeatureCard icon={<BoltIcon className="w-7 h-7" />} title="Instant Planning">
            Get a full itinerary in seconds, not hours.
          </FeatureCard>
          <FeatureCard icon={<BrainIcon className="w-7 h-7" />} title="Smarter with Every Trip">
            Powered by advanced AI and real traveller data.
          </FeatureCard>
          <FeatureCard icon={<BookmarkIcon className="w-7 h-7" />} title="Effortless Bookings">
            Reserve experiences directly from your itinerary.
          </FeatureCard>
          <FeatureCard icon={<UserIcon className="w-7 h-7" />} title="Made for You">
            Every journey is tailored to your unique travel style.
          </FeatureCard>
        </div>
      </div>
      
      {/* Final CTA Section */}
      <div className="text-center py-16 bg-surface rounded-2xl border border-border animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-4xl font-bold">Ready for your next adventure?</h2>
        <p className="mt-4 text-secondary max-w-xl mx-auto">Let's turn your travel dreams into a reality. Click below to start planning.</p>
        <button
          onClick={onStart}
          className="mt-8 bg-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-accent-hover focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all duration-300 text-lg"
        >
          Start Planning Now
        </button>
      </div>

    </div>
  );
};

export default LandingPage;
