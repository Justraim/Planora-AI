import React, { useState, useEffect } from 'react';
import type { ItineraryPreferences, ItineraryPlan } from './types';
import { generateItinerary, refineItinerary } from './services/geminiService';
import Header from './components/Header';
import ItineraryForm from './components/ItineraryForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import LandingPage from './components/LandingPage';

const loadingMessages = [
  "Crafting your personalized adventure...",
  "Analyzing the best local gems...",
  "Mapping out your daily adventures...",
  "Consulting our virtual globetrotter...",
  "Packing your virtual bags..."
];

const App: React.FC = () => {
  const [preferences, setPreferences] = useState<ItineraryPreferences>({
    name: '',
    destination: '',
    travelFrom: '',
    travelRadius: '',
    startDate: '',
    tripDuration: '',
    numberOfTravelers: 1,
    firstTime: 'Yes',
    tripPurpose: [],
    otherTripPurpose: '',
    mostExcitedAbout: [],
    otherExcitement: '',
    specificInclusions: '',
    budget: '',
    pacing: '',
  });
  const [itinerary, setItinerary] = useState<ItineraryPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isLoading) {
      interval = window.setInterval(() => {
        setLoadingMessage(prev => {
          const currentIndex = loadingMessages.indexOf(prev);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    
    try {
      const result = await generateItinerary(preferences);
      setItinerary(result);
    } catch (err) {
      setError('Sorry, we encountered an issue generating your itinerary. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async (refinementPrompt: string) => {
    if (!itinerary) return;
    setIsRefining(true);
    setError(null);
    try {
      const refinedResult = await refineItinerary(itinerary, refinementPrompt);
      setItinerary(refinedResult);
    } catch (err) {
      setError('Sorry, we couldn\'t refine your itinerary. Please try a different request.');
      console.error(err);
    } finally {
      setIsRefining(false);
    }
  };
  
  const handleReset = () => {
    setItinerary(null);
    setError(null);
    setFormVisible(true); // Go back to the form, not the landing page
    setPreferences({
      name: '',
      destination: '',
      travelFrom: '',
      travelRadius: '',
      startDate: '',
      tripDuration: '',
      numberOfTravelers: 1,
      firstTime: 'Yes',
      tripPurpose: [],
      otherTripPurpose: '',
      mostExcitedAbout: [],
      otherExcitement: '',
      specificInclusions: '',
      budget: '',
      pacing: '',
    });
  }

  const handleStartOver = () => {
    handleReset();
    setFormVisible(false); // Go all the way back to the landing page
  }
  
  const handleSampleSelect = (samplePrefs: Partial<ItineraryPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...samplePrefs,
      name: prev.name, // Keep the user's name if they've already entered it
      travelFrom: prev.travelFrom, // Keep user's travel from location
    }));
    setFormVisible(true);
  };


  const renderContent = () => {
    if (!formVisible) {
      return <LandingPage onStart={() => setFormVisible(true)} onSampleSelect={handleSampleSelect} />;
    }

    if (isLoading) {
      return (
        <div className="max-w-4xl mx-auto bg-surface p-6 md:p-10 rounded-2xl shadow-subtle border border-border">
          <div className="text-center py-16">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-secondary transition-opacity duration-500">{loadingMessage}</p>
            <p className="text-sm text-secondary/70">This can take a moment.</p>
          </div>
        </div>
      );
    }

    if (error) {
       return (
        <div className="max-w-4xl mx-auto bg-surface p-6 md:p-10 rounded-2xl shadow-subtle border border-red-500/40">
          <div className="text-center py-16">
            <p className="text-red-500 font-semibold">{error}</p>
            <button
              onClick={handleReset}
              className="mt-6 bg-accent text-white font-bold py-2 px-6 rounded-lg hover:bg-accent-hover transition-colors duration-300"
            >
              Start Over
            </button>
          </div>
        </div>
      );
    }

    if (itinerary) {
      return (
        <div className="max-w-4xl mx-auto bg-surface p-6 md:p-10 rounded-2xl shadow-subtle border border-border">
          <ItineraryDisplay 
            itinerary={itinerary}
            startDate={preferences.startDate}
            onReset={handleReset}
            onRefine={handleRefine}
            isRefining={isRefining}
          />
        </div>
      );
    }
    
    return (
      <ItineraryForm
        preferences={preferences}
        setPreferences={setPreferences}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background text-primary">
      <Header onLogoClick={handleStartOver} />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {renderContent()}
        <footer className="text-center mt-12 text-secondary text-sm no-print space-y-4">
            <div className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap">
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary">About Itinerae</a>
                <a href="mailto:Info@Itinerae.co.za" className="hover:text-primary">Info@Itinerae.co.za</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary">Terms of Service</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary">Privacy Policy</a>
            </div>
            <div>
              <p>&copy; {new Date().getFullYear()} Itinerae AI. All rights reserved.</p>
              <p className="text-xs mt-2">Powered by Google Gemini</p>
            </div>
        </footer>
      </main>
    </div>
  );
};

export default App;