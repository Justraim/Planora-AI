import React, { useState, useEffect } from 'react';
import type { ItineraryPreferences, ItineraryPlan } from './types';
import { generateItinerary, refineItinerary } from './services/geminiService';
import Header from './components/Header';
import ItineraryForm from './components/ItineraryForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import LoadingSpinner from './components/LoadingSpinner';

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
    firstTime: '',
    tripPurpose: [],
    otherTripPurpose: '',
    mostExcitedAbout: [],
    specificInclusions: '',
    budget: '',
    pacing: '',
  });
  const [itinerary, setItinerary] = useState<ItineraryPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

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
    setPreferences({
      name: '',
      destination: '',
      travelFrom: '',
      travelRadius: '',
      startDate: '',
      tripDuration: '',
      numberOfTravelers: 1,
      firstTime: '',
      tripPurpose: [],
      otherTripPurpose: '',
      mostExcitedAbout: [],
      specificInclusions: '',
      budget: '',
      pacing: '',
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {!itinerary && !isLoading && !error && (
            <ItineraryForm
              preferences={preferences}
              setPreferences={setPreferences}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
        )}

        {(itinerary || isLoading || error) && (
          <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl p-6 md:p-10 rounded-2xl shadow-xl shadow-blue-500/10 border border-gray-200/50">
            {isLoading && (
              <div className="text-center py-16">
                <LoadingSpinner />
                <p className="mt-4 text-lg text-gray-600 transition-opacity duration-500">{loadingMessage}</p>
                <p className="text-sm text-gray-500">This can take a moment.</p>
              </div>
            )}

            {error && (
              <div className="text-center py-16">
                <p className="text-red-500 font-semibold">{error}</p>
                <button
                  onClick={handleReset}
                  className="mt-6 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Start Over
                </button>
              </div>
            )}

            {itinerary && (
              <ItineraryDisplay 
                itinerary={itinerary}
                startDate={preferences.startDate}
                onReset={handleReset}
                onRefine={handleRefine}
                isRefining={isRefining}
              />
            )}
          </div>
        )}
        <footer className="text-center mt-12 text-gray-500 text-sm no-print space-y-2">
          <p>&copy; {new Date().getFullYear()} Planora AI. All rights reserved.</p>
          <a href="#" className="hover:text-gray-700 underline">Privacy Policy</a>
        </footer>
      </main>
    </div>
  );
};

export default App;
