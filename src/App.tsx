import React, { useState, useEffect } from 'react';
import type { ItineraryPreferences, ItineraryPlan } from './types';
import { generateItinerary, refineItinerary } from './services/geminiService';
import Header from './components/Header';
import ItineraryForm from './components/ItineraryForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import LegalPage from './components/LegalPage';

const privacyPolicyContent = (
  <>
    <p className="font-semibold">Last updated: November 2025</p>
    <p>Itinerae (“we”, “our”, or “us”) values your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our website.</p>
    
    <h4>1. Information We Collect</h4>
    <p>We may collect the following information:</p>
    <ul>
      <li><strong>Personal Information:</strong> such as your name and email address if you contact us or subscribe to updates.</li>
      <li><strong>Trip Details:</strong> including destinations, travel dates, and preferences that you manually enter when using the site.</li>
      <li><strong>Usage Data:</strong> including your device type, browser, and general site activity (for analytics and improvement purposes).</li>
    </ul>
    <p>We do not automatically collect or track your location through your browser or device.</p>

    <h4>2. How We Use Your Information</h4>
    <p>We use the information we collect to:</p>
    <ul>
      <li>Generate or suggest itineraries based on your provided travel details.</li>
      <li>Improve our website’s functionality and user experience.</li>
      <li>Respond to messages or feedback sent through our contact forms.</li>
    </ul>

    <h4>3. Sharing Your Information</h4>
    <p>We do not sell or rent your personal data. We may share non-personal or aggregated data with trusted third-party services (like analytics or mapping tools) to improve performance and understand user trends.</p>

    <h4>4. Cookies and Tracking</h4>
    <p>We may use cookies or similar technologies to remember preferences and analyse site usage. You can adjust your browser settings to refuse cookies if you prefer.</p>
    
    <h4>5. Data Security</h4>
    <p>We take reasonable technical and organisational measures to protect your information. However, no online platform can guarantee complete security.</p>
    
    <h4>6. Your Choices</h4>
    <p>You can:</p>
    <ul>
      <li>Avoid submitting personal information when using the site.</li>
      <li>Contact us at <a href="mailto:info@itinerae.co.za">info@itinerae.co.za</a> to request removal of any information you have shared with us.</li>
    </ul>
    
    <h4>7. Updates to This Policy</h4>
    <p>We may update this Privacy Policy occasionally. Any changes will be posted here with an updated “Last updated” date.</p>
    
    <h4>8. Contact Us</h4>
    <p>For any privacy-related questions, please email us at: <a href="mailto:info@itinerae.co.za">info@itinerae.co.za</a></p>
  </>
);

const termsOfServiceContent = (
  <>
    <p className="font-semibold">Last updated: November 2025</p>
    <p>Welcome to Itinerae! By accessing or using our website, you agree to the following Terms of Service.</p>
    
    <h4>1. Use of the Website</h4>
    <p>You agree to use Itinerae for lawful purposes only. You may not attempt to harm, disrupt, or misuse the website or its content in any way.</p>
    
    <h4>2. Our Service</h4>
    <p>Itinerae provides travel inspiration, destination guides, and itinerary ideas. We do not guarantee the accuracy, availability, or reliability of any destination, business, or service mentioned on the site.</p>
    
    <h4>3. Travel Details</h4>
    <p>You may enter travel details such as destinations, interests, and duration to generate itineraries. Itinerae does not collect or use automatic location tracking — all travel information is manually provided by the user.</p>
    
    <h4>4. Intellectual Property</h4>
    <p>All text, images, logos, and content on this website belong to Itinerae or are used with permission. You may not copy, reproduce, or distribute any content without prior written consent.</p>
    
    <h4>5. Limitation of Liability</h4>
    <p>Itinerae is not responsible for any loss, injury, or damage resulting from your use of the website or reliance on its content. Always verify information independently before making travel decisions.</p>
    
    <h4>6. Links to Other Websites</h4>
    <p>Itinerae may include links to third-party sites. We are not responsible for the content, privacy practices, or services of those sites.</p>
    
    <h4>7. Changes to the Terms</h4>
    <p>We may update these Terms from time to time. Continued use of the website means you accept the updated Terms.</p>
    
    <h4>8. Contact</h4>
    <p>If you have any questions about these Terms, please contact us at: <a href="mailto:info@itinerae.co.za">info@itinerae.co.za</a></p>
  </>
);


const loadingMessages = [
  "Crafting your personalised adventure...",
  "Analysing the best local gems...",
  "Mapping out your daily adventures...",
  "Consulting our virtual globetrotter...",
  "Packing your virtual bags..."
];

type Page = 'landing' | 'app' | 'about' | 'privacy' | 'terms';

const App: React.FC = () => {
  const [preferences, setPreferences] = useState<ItineraryPreferences>({
    name: '',
    destination: '',
    travelFrom: '',
    travelRadius: '',
    startDate: '',
    tripDuration: 1,
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
  const [page, setPage] = useState<Page>('landing');

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

    const { name, destination, travelFrom, travelRadius, startDate, tripDuration, tripPurpose, otherTripPurpose, mostExcitedAbout, otherExcitement, budget, pacing } = preferences;
    const isFormValid = name && destination && travelFrom && travelRadius && startDate && tripDuration && tripPurpose.length > 0 && !(tripPurpose.includes('Other') && !otherTripPurpose) && mostExcitedAbout.length > 0 && !(mostExcitedAbout.includes('Other') && !otherExcitement) && budget && pacing;
    
    if (!isFormValid) {
        setError("It looks like some information is missing. Please ensure all required fields are filled out before generating an itinerary.");
        return;
    }

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
      tripDuration: 1,
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
    setPage('landing'); // Go all the way back to the landing page
  }
  
  const renderContent = () => {
    if (page === 'landing') {
      return <LandingPage onStart={() => setPage('app')} />;
    }

    if (page === 'about') {
        return <AboutPage onBack={() => setPage('landing')} />;
    }
    
    if (page === 'privacy') {
        return <LegalPage title="Privacy Policy" onBack={() => setPage('landing')}>{privacyPolicyContent}</LegalPage>;
    }
    
    if (page === 'terms') {
        return <LegalPage title="Terms of Service" onBack={() => setPage('landing')}>{termsOfServiceContent}</LegalPage>;
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
              Try Again
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
                <a href="#" onClick={(e) => { e.preventDefault(); setPage('about'); }} className="hover:text-primary">About Itinerae</a>
                <a href="mailto:Info@Itinerae.co.za" className="hover:text-primary">Info@Itinerae.co.za</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setPage('terms'); }} className="hover:text-primary">Terms of Service</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setPage('privacy'); }} className="hover:text-primary">Privacy Policy</a>
            </div>
            <div>
              <p>&copy; {new Date().getFullYear()} Itinerae AI. All rights reserved.</p>
            </div>
        </footer>
      </main>
    </div>
  );
};

export default App;