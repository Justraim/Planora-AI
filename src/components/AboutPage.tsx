import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface Props {
  onBack: () => void;
}

const AboutPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto bg-surface p-6 md:p-10 rounded-2xl shadow-subtle border border-border animate-fade-in-up">
        <h2 className="text-4xl font-bold text-center mb-8">About Itinerae</h2>
        <div className="text-lg text-secondary space-y-6 text-left">
            <p>
                Itinerae is your modern travel companion, powered by intelligence and crafted with inspiration. We help you uncover places that speak to your style, from hidden cafés and coastal escapes to timeless landmarks and vibrant nightlife.
            </p>
            <p>
                No endless forms or research rabbit holes, just beautifully curated itineraries that adapt to you. Whether you are chasing art, adventure, or calm, Itinerae designs journeys that feel personal, effortless, and unforgettable.
            </p>
            <p>
                We believe travel should feel like discovery, not logistics. Welcome to something beyond travel.
            </p>
        </div>
        <div className="text-center mt-10">
             <button
                onClick={onBack}
                className="inline-flex items-center justify-center bg-surface border border-border text-secondary font-semibold py-2 px-5 rounded-lg hover:bg-background hover:text-primary transition-colors duration-300"
            >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back to Home
            </button>
        </div>
    </div>
  );
};

export default AboutPage;
