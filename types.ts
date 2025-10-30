export interface ItineraryPreferences {
  name: string;
  destination: string;
  travelFrom: string;
  travelRadius: 'City Center' | 'Within 15km' | 'Within 30km' | 'No preference' | '';
  startDate: string;
  tripDuration: number | '';
  numberOfTravelers: number;
  firstTime: 'Yes' | 'No';
  tripPurpose: string[];
  otherTripPurpose?: string;
  mostExcitedAbout: string[];
  otherExcitement?: string;
  specificInclusions?: string;
  budget: 'Budget' | 'Mid range' | 'Lux' | 'Mix' | '';
  pacing: 'Maximize Every Moment' | 'Explore and Unwind' | 'Go with the Flow' | '';
}

export interface Activity {
  time: string;
  description: string;
  details?: string;
  distanceFromCenter?: string;
  tradingHours?: string;
  estimatedCost?: string;
  tip?: string;
  reservationLink?: string;
}

export interface DailyPlan {
  day: number;
  title: string;
  theme: string;
  activities: Activity[];
  note?: string;
}

export interface ItineraryPlan {
  tripTitle: string;
  destination: string;
  duration: number;
  summary: string;
  weather: string;
  dailyPlan: DailyPlan[];
  refinementPrompt?: string;
}