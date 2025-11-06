import React, { useState } from 'react';
import type { ItineraryPlan, SuggestionItem } from '../types';
import { WeatherIcon } from './icons/WeatherIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { ClockIcon } from './icons/ClockIcon';
import { CurrencyDollarIcon } from './icons/CurrencyDollarIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { ShareIcon } from './icons/ShareIcon';
import { PrinterIcon } from './icons/PrinterIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { InformationCircleIcon } from './icons/InformationCircleIcon';
import { ArrowPathIcon } from './icons/ArrowPathIcon';
import { RestaurantIcon } from './icons/RestaurantIcon';
import { CameraIcon } from './icons/CameraIcon';
import { SunIcon } from './icons/SunIcon';

interface Props {
  itinerary: ItineraryPlan;
  startDate: string;
  onReset: () => void;
  onRefine: (prompt: string) => Promise<void>;
  isRefining: boolean;
}

const ActivityDetail: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start text-sm">
    <div className="flex-shrink-0 w-5 h-5 mr-2 text-secondary">{icon}</div>
    <div className="text-secondary">
      <span className="font-semibold text-primary">{label}:</span> {value}
    </div>
  </div>
);

const ActionButton: React.FC<{ onClick: () => void; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ onClick, icon, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`w-full sm:w-auto flex items-center justify-center bg-surface border border-border text-secondary font-semibold py-2 px-5 rounded-lg hover:bg-background hover:text-primary transition-colors duration-300 ${className}`}
  >
    {icon}
    {children}
  </button>
);

const SuggestionSection: React.FC<{ title: string; items: SuggestionItem[]; icon: React.ReactNode }> = ({ title, items, icon }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-background p-6 rounded-xl border border-border">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 w-8 h-8 mr-3 text-secondary">{icon}</div>
        <h4 className="text-xl font-bold">{title}</h4>
      </div>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="border-t border-border pt-3 first:pt-0 first:border-none">
            <p className="font-semibold text-primary">{item.name}</p>
            <p className="text-sm text-secondary">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


const ItineraryDisplay: React.FC<Props> = ({ itinerary, startDate, onReset, onRefine, isRefining }) => {
  const [refinementPrompt, setRefinementPrompt] = useState('');

  const getDayDate = (dayNumber: number): string => {
    if (!startDate) return '';
    try {
      const date = new Date(startDate);
      // Adjust for timezone offset by working with UTC dates
      date.setUTCDate(date.getUTCDate() + dayNumber - 1);
      return date.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC', // Ensure consistent date calculation
      });
    } catch (e) {
      console.error("Invalid start date:", startDate);
      return '';
    }
  };


  const handleShare = async () => {
    const shareData = {
      title: `My Trip to ${itinerary.destination}`,
      text: `${itinerary.summary}\n\nCheck out my travel plan!`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert('Sharing is not supported on this browser.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };
  
  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (refinementPrompt.trim()) {
      onRefine(refinementPrompt.trim());
      setRefinementPrompt('');
    }
  };

  const hasSuggestions = itinerary.alternativeSuggestions && (Object.values(itinerary.alternativeSuggestions).some(arr => Array.isArray(arr) && arr.length > 0));

  return (
    <div className="animate-fade-in-up">
      <div id="printable-area">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">{itinerary.tripTitle}</h2>
          <p className="mt-2 text-lg text-secondary max-w-2xl mx-auto">{itinerary.summary}</p>
        </div>
        
        {itinerary.weather && (
          <div className="mb-8 bg-background border border-border rounded-xl p-5 flex items-center">
            <WeatherIcon className="h-8 w-8 text-secondary mr-4 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-primary text-lg">Weather Outlook</h4>
              <p className="text-secondary">{itinerary.weather}</p>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {itinerary.dailyPlan.map(day => {
            const dayDate = getDayDate(day.day);
            return (
            <div key={day.day} className="daily-plan-card bg-background p-6 rounded-xl border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center mb-2 sm:mb-0">
                  <div className="bg-accent text-white rounded-full h-10 w-10 flex-shrink-0 flex items-center justify-center font-bold text-lg mr-4">
                    {day.day}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{day.title}</h3>
                    <span className="text-sm font-medium bg-accent/10 text-accent px-2.5 py-0.5 rounded-full">{day.theme}</span>
                  </div>
                </div>
                 {dayDate && <p className="text-sm font-semibold text-secondary sm:text-right">{dayDate}</p>}
              </div>

              {day.note && (
                <div className="mb-4 bg-yellow-400/10 border-l-4 border-yellow-500/40 rounded-r-lg p-4 flex items-start">
                  <InformationCircleIcon className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-yellow-800">Heads Up!</h5>
                    <p className="text-sm text-yellow-700">{day.note}</p>
                  </div>
                </div>
              )}

              <div className="border-l-2 border-border/50 ml-5 pl-10 py-2 space-y-6">
                {day.activities.map((activity, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[30px] top-1.5 h-4 w-4 bg-surface border-2 border-accent rounded-full"></div>
                    <p className="font-semibold text-accent text-lg">{activity.time}</p>
                    <p className="text-primary font-bold text-lg">{activity.description}</p>
                    {activity.details && <p className="text-sm text-secondary italic mt-1 mb-3">{activity.details}</p>}
                    
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-3 border-t border-border/50">
                      {activity.distanceFromCenter && <ActivityDetail icon={<MapPinIcon />} label="Distance" value={activity.distanceFromCenter} />}
                      {activity.tradingHours && <ActivityDetail icon={<ClockIcon />} label="Hours" value={activity.tradingHours} />}
                      {activity.estimatedCost && <ActivityDetail icon={<CurrencyDollarIcon />} label="Cost" value={activity.estimatedCost} />}
                      {activity.tip && <ActivityDetail icon={<LightBulbIcon />} label="Tip" value={activity.tip} />}
                    </div>
                    
                    {activity.reservationLink && (
                      <div className="mt-4">
                        <a 
                          href={activity.reservationLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-gray-100 text-primary font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 text-sm"
                        >
                          <CalendarIcon className="h-5 w-5 mr-2" />
                          Book a Table
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )})}
        </div>

        {hasSuggestions && itinerary.alternativeSuggestions && (
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-3xl font-bold text-center mb-2">More to Explore</h3>
            <p className="text-center text-secondary mb-8">Consider these other great options in {itinerary.destination.split(',')[0]}.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SuggestionSection 
                title="Top Restaurants" 
                items={itinerary.alternativeSuggestions.topRestaurants}
                icon={<RestaurantIcon />}
              />
              <SuggestionSection 
                title="Top Experiences" 
                items={itinerary.alternativeSuggestions.topExperiences}
                icon={<CameraIcon />}
              />
              <SuggestionSection 
                title="Top Beaches" 
                items={itinerary.alternativeSuggestions.topBeaches}
                icon={<SunIcon />}
              />
              <SuggestionSection 
                title="Other Ideas" 
                items={itinerary.alternativeSuggestions.otherIdeas}
                icon={<LightBulbIcon />}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 pt-8 border-t border-border space-y-8 no-print">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ActionButton onClick={handleShare} icon={<ShareIcon className="h-5 w-5 mr-2"/>}>Share</ActionButton>
            <ActionButton onClick={handlePrint} icon={<PrinterIcon className="h-5 w-5 mr-2"/>}>Print</ActionButton>
            <ActionButton 
                onClick={onReset} 
                icon={<ArrowPathIcon className="h-5 w-5 mr-2"/>}
                className="text-accent border-accent/50 hover:bg-accent/10"
            >
                Create New Plan
            </ActionButton>
        </div>

        <div className="bg-background p-6 rounded-xl border border-border">
           <h4 className="text-lg font-semibold text-primary text-center">Want to change something?</h4>
           <p className="text-center text-sm text-secondary mb-4">Ask the AI to refine your plan. e.g., "Swap the museum on Day 2 for a park."</p>
           <form onSubmit={handleRefineSubmit} className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text"
              value={refinementPrompt}
              onChange={(e) => setRefinementPrompt(e.target.value)}
              placeholder="Your request..."
              disabled={isRefining}
              className="flex-grow w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition text-primary disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isRefining || !refinementPrompt.trim()}
              className="flex items-center justify-center bg-accent text-white font-bold py-2 px-5 rounded-lg hover:bg-accent-hover transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isRefining ? 'Refining...' : <><SparklesIcon className="h-5 w-5 mr-2" />Refine</>}
            </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDisplay;
