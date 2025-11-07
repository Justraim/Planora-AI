import React, { useState } from 'react';
import type { ItineraryPreferences } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { CheckIcon } from './icons/CheckIcon';
import ToggleSwitch from './ToggleSwitch';
import NumberStepper from './NumberStepper';

interface Props {
  preferences: ItineraryPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<ItineraryPreferences>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const tripPurposeOptions: string[] = ['Holiday/Vacation', 'Family Trip', 'Adventure and Hiking', 'Romantic Getaway', 'Cultural Exploration', 'Business Trip', 'Other'];
const excitementOptions = [
    "Restaurants and Food", 
    "Cocktails and Nightlife", 
    "Beaches and Scenic Views", 
    "Wine Farms and Vineyards", 
    "Art Galleries and Museums", 
    "Local Markets and Shopping", 
    "Nature and Outdoor Adventures", 
    "History and Culture", 
    "Festivals and Events", 
    "Hidden Gems and Unique Experiences", 
    "Other"
];
const budgetOptions: Exclude<ItineraryPreferences['budget'], ''>[] = ['Budget', 'Mid range', 'Lux', 'Mix'];
const radiusOptions: Exclude<ItineraryPreferences['travelRadius'], ''>[] = ['City Centre', 'Within 15km', 'Within 30km', 'No preference'];
const pacingOptions: Exclude<ItineraryPreferences['pacing'], ''>[] = ['Maximize Every Moment', 'Explore and Unwind', 'Go with the Flow'];

const ChipButton: React.FC<{ onClick: () => void, isSelected: boolean, children: React.ReactNode}> = ({ onClick, isSelected, children }) => (
    <button type="button" onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 flex items-center justify-center gap-2 ${
        isSelected
          ? 'bg-accent text-white border-accent'
          : 'bg-background border-border text-primary hover:bg-gray-100'
      }`}
    >
      {isSelected && <CheckIcon className="w-4 h-4" />}
      {children}
    </button>
);

const ProgressBar: React.FC<{ currentStep: number }> = ({ currentStep }) => (
  <div className="w-full mb-8">
    <div className="flex justify-between items-center mb-2 px-1">
        <span className={`text-sm font-semibold ${currentStep >= 1 ? 'text-accent' : 'text-secondary'}`}>The Basics</span>
        <span className={`text-sm font-semibold ${currentStep >= 2 ? 'text-accent' : 'text-secondary'}`}>Trip Details</span>
        <span className={`text-sm font-semibold ${currentStep >= 3 ? 'text-accent' : 'text-secondary'}`}>Your Style</span>
    </div>
    <div className="relative w-full bg-gray-200 rounded-full h-1.5">
      <div 
        className="bg-accent h-1.5 rounded-full transition-all duration-500 ease-in-out" 
        style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
      ></div>
    </div>
  </div>
);


const ItineraryForm: React.FC<Props> = ({ preferences, setPreferences, onSubmit, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleMultiSelectChange = (option: string, field: 'mostExcitedAbout' | 'tripPurpose') => {
    setPreferences(prev => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(option)
        ? currentValues.filter(i => i !== option)
        : [...currentValues, option];
      
      const updates: Partial<ItineraryPreferences> = { [field]: newValues };

      if (field === 'tripPurpose') {
        updates.otherTripPurpose = newValues.includes('Other') ? prev.otherTripPurpose : '';
      }
      
      if (field === 'mostExcitedAbout') {
        updates.otherExcitement = newValues.includes('Other') ? prev.otherExcitement : '';
      }

      return { ...prev, ...updates };
    });
  };

  const handleSurpriseMe = () => {
    const availableOptions = excitementOptions.filter(o => o !== 'Other');
    const shuffled = [...availableOptions].sort(() => 0.5 - Math.random());
    const selectionCount = Math.floor(Math.random() * 3) + 2;
    const selectedOptions = shuffled.slice(0, selectionCount);
    
    setPreferences(prev => ({
      ...prev,
      mostExcitedAbout: selectedOptions,
      otherExcitement: ''
    }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumericChange = (name: keyof ItineraryPreferences, value: number) => {
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionSelect = (name: keyof ItineraryPreferences, value: string) => {
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!preferences.name && !!preferences.destination && !!preferences.travelFrom && !!preferences.travelRadius;
      case 2:
        return !!preferences.startDate && !!preferences.tripDuration;
      case 3:
         return preferences.tripPurpose.length > 0 && 
               !(preferences.tripPurpose.includes('Other') && !preferences.otherTripPurpose) &&
               preferences.mostExcitedAbout.length > 0 &&
               !(preferences.mostExcitedAbout.includes('Other') && !preferences.otherExcitement) &&
               !!preferences.budget && 
               !!preferences.pacing;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const isSubmitDisabled = isLoading || !isStepValid();

  return (
    <>
      <div className="text-center mb-12 animate-fade-in-up max-w-3xl mx-auto">
        <h2 className="text-5xl font-bold">Plan your adventure.</h2>
        <p className="mt-4 text-lg text-secondary">Just share your travel preferences, and our AI will craft your perfect, personalised itinerary.</p>
      </div>
      <div className="max-w-4xl mx-auto bg-surface p-6 md:p-10 rounded-2xl shadow-subtle border border-border">
        <ProgressBar currentStep={currentStep} />
        
        <form onSubmit={onSubmit}>

          {currentStep === 1 && (
            <div className="space-y-8 animate-fade-in-up">
               <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary">The Basics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary mb-1">What's your name?</label>
                    <input
                      type="text" id="name" name="name"
                      value={preferences.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Alex"
                      required
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition text-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-secondary mb-1">What's your destination?</label>
                    <input
                      type="text" id="destination" name="destination"
                      value={preferences.destination}
                      onChange={handleInputChange}
                      placeholder="e.g., Tokyo, Japan"
                      required
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition text-primary"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="travelFrom" className="block text-sm font-medium text-secondary mb-1">Where are you travelling from?</label>
                    <input
                      type="text" id="travelFrom" name="travelFrom"
                      value={preferences.travelFrom}
                      onChange={handleInputChange}
                      placeholder="e.g., London, UK"
                      required
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition text-primary"
                    />
                  </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-secondary mb-2">What's your preferred travel radius?</label>
                    <div className="flex flex-wrap gap-2">
                        {radiusOptions.map(opt => (
                          <ChipButton key={opt} onClick={() => handleOptionSelect('travelRadius', opt)} isSelected={preferences.travelRadius === opt}>{opt}</ChipButton>
                        ))}
                    </div>
                  </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary">Trip Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-secondary mb-1">Start Date</label>
                    <input
                      type="date" id="startDate" name="startDate"
                      value={preferences.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition text-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="tripDuration" className="block text-sm font-medium text-secondary mb-1">How long is the trip? (days)</label>
                    <NumberStepper
                        id="tripDuration"
                        value={preferences.tripDuration === '' ? 1 : preferences.tripDuration}
                        onChange={(value) => handleNumericChange('tripDuration', value)}
                        min={1}
                    />
                  </div>
                  <div>
                    <label htmlFor="numberOfTravelers" className="block text-sm font-medium text-secondary mb-1">How many people are travelling?</label>
                    <NumberStepper
                        id="numberOfTravelers"
                        value={preferences.numberOfTravelers}
                        onChange={(value) => handleNumericChange('numberOfTravelers', value)}
                        min={1}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-secondary">Is this your first time there?</label>
                    <ToggleSwitch 
                      enabled={preferences.firstTime === 'Yes'}
                      onChange={(enabled) => handleOptionSelect('firstTime', enabled ? 'Yes' : 'No')}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8 animate-fade-in-up">
              <h3 className="text-xl font-semibold text-primary">Your Style</h3>
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">What's the main purpose of your trip?</label>
                  <div className="flex flex-wrap gap-2">
                    {tripPurposeOptions.map(option => (
                      <ChipButton key={option} onClick={() => handleMultiSelectChange(option, 'tripPurpose')} isSelected={preferences.tripPurpose.includes(option)}>{option}</ChipButton>
                    ))}
                  </div>
                  {preferences.tripPurpose.includes('Other') && (
                    <div className="mt-4 animate-fade-in-up">
                      <label htmlFor="otherTripPurpose" className="block text-sm font-medium text-secondary mb-1">If other, please specify:</label>
                      <input type="text" id="otherTripPurpose" name="otherTripPurpose" value={preferences.otherTripPurpose} onChange={handleInputChange} placeholder="e.g., Attending a conference" className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition text-primary"/>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">What are you most excited about?</label>
                  <div className="flex flex-wrap gap-2">
                    {excitementOptions.map(option => (
                       <ChipButton key={option} onClick={() => handleMultiSelectChange(option, 'mostExcitedAbout')} isSelected={preferences.mostExcitedAbout.includes(option)}>{option}</ChipButton>
                    ))}
                  </div>
                  {preferences.mostExcitedAbout.includes('Other') && (
                    <div className="mt-4 animate-fade-in-up">
                      <label htmlFor="otherExcitement" className="block text-sm font-medium text-secondary mb-1">If other, please specify:</label>
                      <input type="text" id="otherExcitement" name="otherExcitement" value={preferences.otherExcitement} onChange={handleInputChange} placeholder="e.g., Photography spots" className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition text-primary"/>
                    </div>
                  )}
                   <div className="mt-4">
                      <button type="button" onClick={handleSurpriseMe} className="w-full sm:w-auto flex items-center justify-center gap-2 text-accent font-semibold py-2 px-4 rounded-lg border border-accent/50 hover:bg-accent/10 transition-all duration-300">
                        <SparklesIcon className="w-5 h-5 text-accent" />
                        Surprise Me!
                      </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                      <label className="block text-sm font-medium text-secondary mb-2">What's your preferred budget?</label>
                      <div className="flex flex-wrap gap-2">
                          {budgetOptions.map(opt => ( <ChipButton key={opt} onClick={() => handleOptionSelect('budget', opt)} isSelected={preferences.budget === opt}>{opt}</ChipButton> ))}
                      </div>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-secondary mb-2">What's your ideal trip rhythm?</label>
                      <div className="flex flex-wrap gap-2">
                          {pacingOptions.map(opt => ( <ChipButton key={opt} onClick={() => handleOptionSelect('pacing', opt)} isSelected={preferences.pacing === opt}>{opt}</ChipButton> ))}
                      </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="specificInclusions" className="block text-sm font-medium text-secondary mb-1">Anything specific to include? (Optional)</label>
                <textarea id="specificInclusions" name="specificInclusions" rows={3} value={preferences.specificInclusions} onChange={handleInputChange} placeholder="e.g., must-visit a specific restaurant, accessibility needs, dietary restrictions" className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition text-primary"/>
              </div>
            </div>
          )}

          <div className="mt-8 pt-4 flex justify-between items-center">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-surface border border-border text-secondary font-semibold py-2 px-5 rounded-lg hover:bg-background hover:text-primary transition-colors duration-300"
                >
                  Back
                </button>
              )}
            </div>
            
            <div>
              {currentStep < 3 && (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-accent text-white font-bold py-2 px-5 rounded-lg hover:bg-accent-hover transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              )}

              {currentStep === 3 && (
                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="w-full sm:w-auto flex items-center justify-center bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-accent-hover transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    'Generating...'
                  ) : (
                    <>
                      <SparklesIcon className="h-5 w-5 mr-2" />
                      Generate My Itinerary
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ItineraryForm;
