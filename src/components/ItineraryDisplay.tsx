import React, { useState } from 'react';
import type { ItineraryPlan } from '../types';
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

  return (
    <div className="animate-fade-in-up">
      <div id="printable-area">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">{itinerary.tripTitle}</h2>
          <p className="mt-2 text-lg text-secondary max-w-2xl mx-auto">{itinerary.summary}</p>
        </div>
        
        {itinerary.weather && (
          <div className="mb-8 bg-surface border border-border rounded-xl p-5 flex items-center">
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
            <div key={day.day} className="daily-plan-card bg-background/50 p-6 rounded-xl border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center mb-2 sm:mb-0">
                  <div className="bg-accent text-white rounded-full h-10 w-10 flex-shrink-0 flex items-center justify-center font-bold text-lg mr-4">
                    {day.day}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{day.title}</h3>
                    <span className="text-sm font-medium bg-accent/20 text-accent px-2.5 py-0.5 rounded-full">{day.theme}</span>
                  </div>
                </div>
                 {dayDate && <p className="text-sm font-semibold text-secondary sm:text-right">{dayDate}</p>}
              </div>

              {day.note && (
                <div className="mb-4 bg-yellow-500/10 border-l-4 border-yellow-500/40 rounded-r-lg p-4 flex items-start">
                  <InformationCircleIcon className="h-6 w-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-yellow-300">Heads Up!</h5>
                    <p className="text-sm text-yellow-400">{day.note}</p>
                  </div>
                </div>
              )}

              <div className="border-l-2 border-border ml-5 pl-10 py-2 space-y-6">
                {day.activities.map((activity, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[29px] top-1.5 h-4 w-4 bg-background border-2 border-accent rounded-full"></div>
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
                          className="inline-flex items-center bg-border text-primary font-semibold py-2 px-4 rounded-lg hover:bg-border/80 transition-colors duration-300 text-sm"
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
      </div>

      <div className="mt-12 pt-8 border-t border-border space-y-8 no-print">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={handleShare} className="w-full sm:w-auto flex items-center justify-center bg-border text-primary font-bold py-2 px-5 rounded-lg hover:bg-border/80 transition-colors duration-300"><ShareIcon className="h-5 w-5 mr-2"/>Share</button>
          <button onClick={handlePrint} className="w-full sm:w-auto flex items-center justify-center bg-border text-primary font-bold py-2 px-5 rounded-lg hover:bg-border/80 transition-colors duration-300"><PrinterIcon className="h-5 w-5 mr-2"/>Print</button>
          <button onClick={onReset} className="w-full sm:w-auto border border-border text-primary font-bold py-2 px-5 rounded-lg hover:bg-surface transition-colors duration-300">Create New Plan</button>
        </div>

        <div className="bg-background/50 p-6 rounded-xl border border-border">
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
              className="flex items-center justify-center bg-accent text-white font-bold py-2 px-5 rounded-lg hover:bg-accent-hover transition-colors duration-300 disabled:bg-accent/60 disabled:cursor-not-allowed"
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
