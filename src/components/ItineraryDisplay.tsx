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
import { ArrowPathIcon } from './icons/ArrowPathIcon';

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
          <h2 className="text-5xl font-serif font-bold text-primary">{itinerary.tripTitle}</h2>
          <p className="mt-4 text-lg text-secondary max-w-3xl mx-auto">{itinerary.summary}</p>
        </div>
        
        {itinerary.weather && (
          <div className="mb-10 py-6 border-y border-border flex items-center justify-center gap-4 text-center">
            <WeatherIcon className="h-8 w-8 text-secondary flex-shrink-0" />
            <div>
              <h4 className="font-bold text-primary">Weather Outlook</h4>
              <p className="text-secondary text-sm">{itinerary.weather}</p>
            </div>
          </div>
        )}

        <div className="space-y-12">
          {itinerary.dailyPlan.map(day => {
            const dayDate = getDayDate(day.day);
            return (
            <div key={day.day} className="border-t border-border pt-8 first:border-t-0 first:pt-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                <div>
                  <p className="text-sm font-semibold text-secondary tracking-widest uppercase mb-1">Day {day.day}</p>
                  <h3 className="text-3xl font-bold">{day.title}</h3>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0 text-right">
                  <span className="text-sm font-medium bg-accent/10 text-accent px-2.5 py-0.5 rounded-full">{day.theme}</span>
                  {dayDate && <p className="text-sm font-semibold text-secondary flex-shrink-0">{dayDate}</p>}
                </div>
              </div>


              {day.note && (
                <div className="mb-6 bg-yellow-400/10 border-l-4 border-yellow-500/40 rounded-r-lg p-4 flex items-start">
                  <InformationCircleIcon className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-yellow-800">Heads Up!</h5>
                    <p className="text-sm text-yellow-700">{day.note}</p>
                  </div>
                </div>
              )}

              <div className="relative border-l border-border ml-4 mt-4">
                {day.activities.map((activity, index) => (
                  <div key={index} className={`relative pl-8 ${index === day.activities.length - 1 ? 'pb-1' : 'pb-10'}`}>
                    <div className="absolute -left-[6.5px] top-1 h-3 w-3 bg-accent rounded-full ring-4 ring-surface"></div>
                    <p className="font-semibold text-accent text-base mb-1">{activity.time}</p>
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
                          className="inline-flex items-center bg-accent/10 text-accent font-semibold py-2 px-4 rounded-lg hover:bg-accent/20 transition-colors duration-300 text-sm"
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