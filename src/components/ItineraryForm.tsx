import React from 'react';
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
const excitementOptions = ["Restaurants and Food", "Cocktails and Nightlife", "Beaches and Scenic Views", "Wine Farms", "Art Galleries and Museums", "Local Markets and Shopping", "Nature and adventures"];
const budgetOptions: Exclude<ItineraryPreferences['budget'], ''>[] = ['Budget', 'Mid range', 'Lux', 'Mix'];
const radiusOptions: Exclude<ItineraryPreferences['travelRadius'], ''>[] = ['City Center', 'Within 15km', 'Within 30km', 'No preference'];
const pacingOptions: Exclude<ItineraryPreferences['pacing'], ''>[] = ['Maximize Every Moment', 'Explore and Unwind', 'Go with the Flow'];

const FormSection: React.FC<{ title: string, children: React.ReactNode, delay?: string }> = ({ title, children, delay = '0s' }) => (
  <div className="space-y-6 pt-6 border-t border-gray-200 first:pt-0 first:border-none animate-fade-in-up" style={{ animationDelay: delay }}>
    <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
    {children}
  </div>
);

const ChipButton: React.FC<{ onClick: () => void, isSelected: boolean, children: React.ReactNode}> = ({ onClick, isSelected, children }) => (
    <button type="button" onClick={onClick}
      className={`relative px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 flex items-center gap-2 ${
        isSelected
          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/30'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
      }`}
    >
      {isSelected && <CheckIcon className="w-4 h-4" />}
      {children}
    </button>
);


const ItineraryForm: React.FC<Props> = ({ preferences, setPreferences, onSubmit, isLoading }) => {
  
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

      return { ...prev, ...updates };
    });
  };

  const handleSurpriseMe = () => {
    const shuffled = [...excitementOptions].sort(() => 0.5 - Math.random());
    const selectionCount = Math.floor(Math.random() * 3) + 2;
    const selectedOptions = shuffled.slice(0, selectionCount);
    
    setPreferences(prev => ({
      ...prev,
      mostExcitedAbout: selectedOptions
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
  
  return (
    <>
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-5xl font-bold text-gray-800">Intelligent Trip Planning, Instantly</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Just share your travel preferences, and Itinerae AI will craft your perfect, personalized itinerary.</p>
      </div>
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl p-6 md:p-10 rounded-2xl shadow-xl shadow-blue-500/10 border border-gray-200/50">
        <form onSubmit={onSubmit} className="space-y-8">

          <FormSection title="The Basics" delay="0.1s">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">What's your name?</label>
                <input
                  type="text" id="name" name="name"
                  value={preferences.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Alex"
                  required
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">What's your destination?</label>
                <input
                  type="text" id="destination" name="destination"
                  value={preferences.destination}
                  onChange={handleInputChange}
                  placeholder="e.g., Tokyo, Japan"
                  required
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="travelFrom" className="block text-sm font-medium text-gray-700 mb-1">Where are you travelling from?</label>
                <input
                  type="text" id="travelFrom" name="travelFrom"
                  value={preferences.travelFrom}
                  onChange={handleInputChange}
                  placeholder="e.g., California, USA"
                  required
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What's your preferred travel radius?</label>
                <div className="flex flex-wrap gap-2">
                    {radiusOptions.map(opt => (
                      <ChipButton key={opt} onClick={() => handleOptionSelect('travelRadius', opt)} isSelected={preferences.travelRadius === opt}>{opt}</ChipButton>
                    ))}
                </div>
              </div>
          </FormSection>

          <FormSection title="Trip Details" delay="0.2s">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date" id="startDate" name="startDate"
                  value={preferences.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label htmlFor="tripDuration" className="block text-sm font-medium text-gray-700 mb-1">How long is the trip? (days)</label>
                 <NumberStepper
                    id="tripDuration"
                    value={preferences.tripDuration === '' ? 1 : preferences.tripDuration}
                    onChange={(value) => handleNumericChange('tripDuration', value)}
                    min={1}
                 />
              </div>
              <div>
                <label htmlFor="numberOfTravelers" className="block text-sm font-medium text-gray-700 mb-1">How many people are traveling?</label>
                <NumberStepper
                    id="numberOfTravelers"
                    value={preferences.numberOfTravelers}
                    onChange={(value) => handleNumericChange('numberOfTravelers', value)}
                    min={1}
                 />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Is this your first time there?</label>
                <ToggleSwitch 
                  enabled={preferences.firstTime === 'Yes'}
                  onChange={(enabled) => handleOptionSelect('firstTime', enabled ? 'Yes' : 'No')}
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Your Style" delay="0.3s">
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What's the main purpose of your trip? (Select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {tripPurposeOptions.map(option => (
                    <ChipButton
                      key={option}
                      onClick={() => handleMultiSelectChange(option, 'tripPurpose')}
                      isSelected={preferences.tripPurpose.includes(option)}
                    >
                      {option}
                    </ChipButton>
                  ))}
                </div>
                {preferences.tripPurpose.includes('Other') && (
                  <div className="mt-4 animate-fade-in-up">
                    <label htmlFor="otherTripPurpose" className="block text-sm font-medium text-gray-700 mb-1">If other, please specify:</label>
                    <input
                      type="text"
                      id="otherTripPurpose"
                      name="otherTripPurpose"
                      value={preferences.otherTripPurpose}
                      onChange={handleInputChange}
                      placeholder="e.g., Attending a conference"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What are you most excited about? (Select at least one)</label>
                <div className="flex flex-wrap gap-2">
                  {excitementOptions.map(option => (
                     <ChipButton
                        key={option}
                        onClick={() => handleMultiSelectChange(option, 'mostExcitedAbout')}
                        isSelected={preferences.mostExcitedAbout.includes(option)}
                      >
                        {option}
                      </ChipButton>
                  ))}
                </div>
                 <div className="mt-4">
                    <button
                      type="button"
                      onClick={handleSurpriseMe}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg border-2 border-dashed border-blue-400 hover:bg-blue-50 hover:border-blue-600 transition-all duration-300"
                    >
                      <SparklesIcon className="w-5 h-5 text-yellow-500" />
                      Surprise Me!
                    </button>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">What's your preferred budget?</label>
                    <div className="flex flex-wrap gap-2">
                        {budgetOptions.map(opt => (
                          <ChipButton key={opt} onClick={() => handleOptionSelect('budget', opt)} isSelected={preferences.budget === opt}>{opt}</ChipButton>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">What's your ideal trip rhythm?</label>
                    <div className="flex flex-wrap gap-2">
                        {pacingOptions.map(opt => (
                          <ChipButton key={opt} onClick={() => handleOptionSelect('pacing', opt)} isSelected={preferences.pacing === opt}>{opt}</ChipButton>
                        ))}
                    </div>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="specificInclusions" className="block text-sm font-medium text-gray-700 mb-1">Anything specific to include? (Optional)</label>
              <textarea
                id="specificInclusions" name="specificInclusions" rows={3}
                value={preferences.specificInclusions}
                onChange={handleInputChange}
                placeholder="e.g., must-visit a specific restaurant, accessibility needs, dietary restrictions"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </FormSection>

          <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button
              type="submit"
              disabled={isLoading || !preferences.name || !preferences.destination || !preferences.travelFrom || !preferences.startDate || !preferences.tripDuration || preferences.tripPurpose.length === 0 || !preferences.travelRadius || !preferences.firstTime || !preferences.budget || !preferences.pacing || preferences.mostExcitedAbout.length === 0}
              className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
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
          </div>
        </form>
      </div>
    </>
  );
};

export default ItineraryForm;