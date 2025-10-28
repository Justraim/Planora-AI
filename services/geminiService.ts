
import { GoogleGenAI, Type } from "@google/genai";
import type { ItineraryPreferences, ItineraryPlan } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const itinerarySchema = {
  type: Type.OBJECT,
  properties: {
    tripTitle: { type: Type.STRING, description: "A creative and catchy title for the trip. e.g., 'An Epic Adventure in Tokyo'" },
    destination: { type: Type.STRING, description: "The primary destination city and country." },
    duration: { type: Type.INTEGER, description: "The total number of days for the trip, based on the user's input." },
    summary: { type: Type.STRING, description: "A brief, engaging 2-3 sentence summary of the overall trip experience. Address the user by their name." },
    weather: { type: Type.STRING, description: "A summary of the expected weather for the destination during the trip dates, including average temperature and conditions like 'sunny with occasional clouds'." },
    dailyPlan: {
      type: Type.ARRAY,
      description: "An array of objects, where each object represents a single day's plan.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER, description: "The day number (e.g., 1, 2, 3)." },
          title: { type: Type.STRING, description: "A short, thematic title for the day. e.g., 'Ancient Temples & Modern Marvels'" },
          theme: { type: Type.STRING, description: "A one-word theme for the day. e.g., 'History', 'Food', 'Adventure'." },
          activities: {
            type: Type.ARRAY,
            description: "An array of activities for the day.",
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: "Suggested time for the activity (e.g., 'Morning', '9:00 AM', 'Afternoon', 'Evening')." },
                description: { type: Type.STRING, description: "A concise description of the activity." },
                details: { type: Type.STRING, description: "Optional: A brief sentence with extra detail about the experience." },
                distanceFromCenter: { type: Type.STRING, description: "Estimated distance from the city center, e.g., '5km' or 'In City Center'." },
                tradingHours: { type: Type.STRING, description: "Operating hours, e.g., '9:00 AM - 5:00 PM' or '24/7'." },
                estimatedCost: { type: Type.STRING, description: "Estimated cost per person, e.g., '$25 USD' or 'Free'." },
                tip: { type: Type.STRING, description: "A single, helpful tip for the activity, e.g., 'Book tickets online to avoid queues.'" },
              },
              required: ['time', 'description'],
            },
          },
        },
        required: ['day', 'title', 'theme', 'activities'],
      },
    },
  },
  required: ['tripTitle', 'destination', 'duration', 'summary', 'weather', 'dailyPlan'],
};


export const generateItinerary = async (preferences: ItineraryPreferences): Promise<ItineraryPlan> => {
  const tripPurposes = preferences.tripPurpose
    .map(purpose => {
      if (purpose === 'Other' && preferences.otherTripPurpose) {
        return `Other: ${preferences.otherTripPurpose}`;
      }
      return purpose;
    })
    .join(', ');

  const prompt = `
    Create a personalized travel itinerary for ${preferences.name}.
    Act as an expert travel planner with a knack for creating memorable and well-structured trips.

    **Core Details:**
    - **Destination:** ${preferences.destination}
    - **Travel Radius:** ${preferences.travelRadius}. Interpret this as follows:
        - 'City Center': Focus on walkable areas, central districts, and attractions easily reachable by main public transport hubs.
        - 'Within 15km': Include the city center and nearby suburbs or points of interest that are a short drive or train ride away.
        - 'Within 30km': Allows for half-day or full-day trips to nearby towns, natural parks, or significant landmarks outside the main city.
        - 'No preference': You have the freedom to suggest the best combination of central and further-afield activities.
    - **Start Date:** ${preferences.startDate}
    - **Trip Duration:** ${preferences.tripDuration} days.
    - **Number of Travelers:** ${preferences.numberOfTravelers}
    - **First Time Visitor?:** ${preferences.firstTime}
    - **Purpose of Trip:** ${tripPurposes}

    **User Preferences:**
    - **Preferred Budget Level:** ${preferences.budget} (Suggest activities and dining that align with this budget: Budget, Mid-range, or Luxury. "Mix" means a combination.)
    - **Daily Rhythm:** ${preferences.pacing}. Interpret this as follows:
        - 'Maximize Every Moment': Schedule a full day with multiple activities from morning to night, minimizing downtime.
        - 'Explore and Unwind': A good balance of 2-3 main activities with some leisure time in between for relaxation or spontaneous discoveries.
        - 'Go with the Flow': Focus on 1-2 key activities per day with ample time for spontaneous exploration, relaxation, and unhurried experiences.
    - **Top Interests:** ${preferences.mostExcitedAbout.join(', ')}
    - **Specific Inclusions/Requests:** ${preferences.specificInclusions || 'None'}

    **Generation Instructions:**
    1.  Generate a detailed, day-by-day itinerary for the specified duration. The output must follow the provided JSON schema precisely.
    2.  Provide a 'weather' summary for the destination based on the start date and time of year.
    3.  For **each activity**, you must provide the following details where applicable and available:
        - \`estimatedCost\`: e.g., "$20 USD", "Free".
        - \`tradingHours\`: e.g., "10:00 AM - 6:00 PM".
        - \`distanceFromCenter\`: e.g., "3km from city center".
        - \`tip\`: A single, practical tip. e.g., "Buy tickets online to skip the line."
    4.  The itinerary must flow logically, be geographically sensible based on the travel radius, and align perfectly with all the user's stated preferences, especially the daily rhythm.
    5.  Tailor recommendations to the number of travelers and the trip's purpose (e.g., family-friendly spots for a 'Family Trip', romantic settings for a 'Romantic Getaway').
    6.  If it's their first time, include must-see landmarks. If not, suggest more local or off-the-beaten-path experiences.
    7.  Address the user by their name, ${preferences.name}, in the summary.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: itinerarySchema,
        temperature: 0.8,
        topP: 0.9,
      }
    });

    const jsonText = response.text.trim();
    const itineraryData = JSON.parse(jsonText);
    
    if (!itineraryData.dailyPlan || !Array.isArray(itineraryData.dailyPlan)) {
      throw new Error("Invalid itinerary structure received from API.");
    }
    
    return itineraryData as ItineraryPlan;
  } catch (error) {
    console.error("Error generating itinerary with Gemini:", error);
    throw new Error("Failed to generate itinerary. The AI model might be unavailable or the request was invalid.");
  }
};

export const refineItinerary = async (currentItinerary: ItineraryPlan, refinementPrompt: string): Promise<ItineraryPlan> => {
  const prompt = `
    You are an expert travel planner. A user has an existing itinerary and has requested a change.
    Your task is to modify the itinerary based on their request and provide the full, updated itinerary.
    The output structure must be the same JSON format as the original itinerary. Do not just provide the changed parts.

    **Original Itinerary (JSON):**
    ${JSON.stringify(currentItinerary)}

    **User's Refinement Request:**
    "${refinementPrompt}"

    **Instructions:**
    1.  Read the original itinerary and the user's request carefully.
    2.  Intelligently modify the \`dailyPlan\` and any other relevant fields (like \`summary\`) to reflect the user's request.
    3.  Ensure the updated plan remains logical, geographically sensible, and consistent.
    4.  Return the **complete and updated** itinerary object, conforming strictly to the provided JSON schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: itinerarySchema,
        temperature: 0.7,
      }
    });

    const jsonText = response.text.trim();
    const refinedData = JSON.parse(jsonText);
    
    if (!refinedData.dailyPlan || !Array.isArray(refinedData.dailyPlan)) {
      throw new Error("Invalid refined itinerary structure received from API.");
    }

    return refinedData as ItineraryPlan;
  } catch (error) {
    console.error("Error refining itinerary with Gemini:", error);
    throw new Error("Failed to refine itinerary.");
  }
};
