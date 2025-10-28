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

interface Props {
  itinerary: ItineraryPlan;
  startDate: string;
  onReset: () => void;
  onRefine: (prompt: string) => Promise<void>;
  isRefining: boolean;
}

const ActivityDetail: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start text-sm">
    <div className="flex-shrink-0 w-5 h-5 mr-2 text-gray-500">{icon}</div>
    <div className="text-gray-700">
      <span className="font-semibold">{label}:</span> {value}
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
    <div className="animate-fade-in">
      <div id="printable-area">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">{itinerary.tripTitle}</h2>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">{itinerary.summary}</p>
        </div>
        
        {itinerary.weather && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-center">
            <WeatherIcon className="h-10 w-10 text-blue-500 mr-4 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-blue-800 text-lg">Weather Outlook</h4>
              <p className="text-blue-700">{itinerary.weather}</p>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {itinerary.dailyPlan.map(day => {
            const dayDate = getDayDate(day.day);
            return (
            <div key={day.day} className="daily-plan-card bg-white/80 p-6 rounded-xl shadow-lg shadow-blue-500/10 border border-gray-200/60 transition-shadow hover:shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center mb-2 sm:mb-0">
                  <div className="bg-blue-100 text-blue-700 rounded-full h-12 w-12 flex-shrink-0 flex items-center justify-center font-bold text-xl mr-4">
                    {day.day}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{day.title}</h3>
                    <span className="text-sm font-medium bg-blue-200 text-blue-800 px-2.5 py-0.5 rounded-full">{day.theme}</span>
                  </div>
                </div>
                 {dayDate && <p className="text-sm font-semibold text-gray-600 sm:text-right">{dayDate}</p>}
              </div>
              <div className="border-l-2 border-blue-200 ml-6 pl-10 py-2 space-y-6">
                {day.activities.map((activity, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[49px] top-1.5 h-4 w-4 bg-white border-2 border-blue-500 rounded-full"></div>
                    <p className="font-semibold text-blue-800 text-lg">{activity.time}</p>
                    <p className="text-gray-800 font-bold text-lg">{activity.description}</p>
                    {activity.details && <p className="text-sm text-gray-600 italic mt-1 mb-3">{activity.details}</p>}
                    
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-3 border-t border-gray-200/80">
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
                          className="inline-flex items-center bg-green-100 text-green-800 font-bold py-2 px-4 rounded-lg hover:bg-green-200 transition-colors duration-300 text-sm"
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

      <div className="mt-12 pt-8 border-t border-gray-200 space-y-8 no-print">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={handleShare} className="w-full sm:w-auto flex items-center justify-center bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 transition-colors duration-300"><ShareIcon className="h-5 w-5 mr-2"/>Share</button>
          <button onClick={handlePrint} className="w-full sm:w-auto flex items-center justify-center bg-gray-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-600 transition-colors duration-300"><PrinterIcon className="h-5 w-5 mr-2"/>Print</button>
          <button onClick={onReset} className="w-full sm:w-auto bg-gray-700 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-800 transition-colors duration-300">Create New Plan</button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
           <h4 className="text-lg font-semibold text-gray-800 text-center">Want to change something?</h4>
           <p className="text-center text-sm text-gray-600 mb-4">Ask the AI to refine your plan. e.g., "Swap the museum on Day 2 for a park."</p>
           <form onSubmit={handleRefineSubmit} className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text"
              value={refinementPrompt}
              onChange={(e) => setRefinementPrompt(e.target.value)}
              placeholder="Your request..."
              disabled={isRefining}
              className="flex-grow w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100"
            />
            <button
              type="submit"
              disabled={isRefining || !refinementPrompt.trim()}
              className="flex items-center justify-center bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
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