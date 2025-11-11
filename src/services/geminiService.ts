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
          note: { type: Type.STRING, description: "Optional: If there is a public holiday or significant local event on this day, add a note explaining what it is and how it might impact the plan (e.g., 'Public Holiday: Bastille Day - expect large crowds and fireworks.'). Omit this field if there are no relevant events." },
          activities: {
            type: Type.ARRAY,
            description: "An array of activities for the day.",
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: "Suggested time for the activity (e.g., 'Morning', '9:00 AM', 'Afternoon', 'Evening')." },
                description: { type: Type.STRING, description: "A concise description of the activity." },
                details: { type: Type.STRING, description: "Optional: A brief sentence with extra detail about the experience." },
                distanceFromCenter: { type: Type.STRING, description: "Estimated distance from the city center, e.g., '5km' or 'In City Centre'." },
                tradingHours: { type: Type.STRING, description: "Operating hours, e.g., '9:00 AM - 5:00 PM' or '24/7'." },
                estimatedCost: { type: Type.STRING, description: "Estimated cost per person. This MUST follow the currency conversion rules." },
                tip: { type: Type.STRING, description: "A single, helpful tip for the activity, e.g., 'Book tickets online to avoid queues.'" },
                reservationLink: { type: Type.STRING, description: "If the activity is a restaurant, provide a direct, valid, and working reservation link if available. Prioritize official websites, Google Maps, or major booking platforms. If a valid link cannot be found, omit this field." },
              },
              required: ['time', 'description'],
            },
          },
        },
        required: ['day', 'title', 'theme', 'activities'],
      },
    },
    alternativeSuggestions: {
      type: Type.OBJECT,
      description: "A list of alternative suggestions for activities and places that were not included in the main itinerary but are highly recommended.",
      properties: {
        topRestaurants: {
          type: Type.ARRAY,
          description: "A list of 3-5 top restaurants not included in the itinerary.",
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Name of the restaurant." },
              description: { type: Type.STRING, description: "A brief, one-sentence description of the restaurant (e.g., cuisine, specialty, ambiance)." }
            },
            required: ['name', 'description']
          }
        },
        topExperiences: {
          type: Type.ARRAY,
          description: "A list of 3-5 top experiences or attractions not included in the itinerary.",
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Name of the experience." },
              description: { type: Type.STRING, description: "A brief, one-sentence description of the experience." }
            },
            required: ['name', 'description']
          }
        },
        topBeaches: {
          type: Type.ARRAY,
          description: "If the destination is coastal, provide a list of 3-5 top beaches. If not applicable, return an empty array.",
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Name of the beach." },
              description: { type: Type.STRING, description: "A brief, one-sentence description of the beach." }
            },
            required: ['name', 'description']
          }
        },
        otherIdeas: {
          type: Type.ARRAY,
          description: "A list of 2-3 other interesting ideas, like a unique shop, a scenic walk, or a local market.",
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Name of the idea/place." },
              description: { type: Type.STRING, description: "A brief, one-sentence description." }
            },
            required: ['name', 'description']
          }
        }
      }
    }
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
    
  const topInterests = preferences.mostExcitedAbout
    .map(interest => {
      if (interest === 'Other' && preferences.otherExcitement) {
        return `Other: ${preferences.otherExcitement}`;
      }
      return interest;
    })
    .join(', ');

  const prompt = `
    Create a personalised travel itinerary for ${preferences.name}.
    Act as an expert travel planner with a knack for creating memorable, practical, and well-structured trips.

    **Core Details:**
    - **Travelling From:** ${preferences.travelFrom} (User's home country/city)
    - **Destination:** ${preferences.destination}
    - **Travel Radius:** ${preferences.travelRadius}. Interpret this as follows:
        - 'City Centre': Focus on walkable areas, central districts, and attractions easily reachable by main public transport hubs.
        - 'Within 15km': Include the city centre and nearby suburbs or points of interest that are a short drive or train ride away.
        - 'Within 30km': Allows for half-day or full-day trips to nearby towns, natural parks, or significant landmarks outside the main city.
        - 'No preference': You have the freedom to suggest the best combination of central and further-afield activities.
    - **Start Date:** ${preferences.startDate}
    - **Trip Duration:** ${preferences.tripDuration} days.
    - **Number of Travellers:** ${preferences.numberOfTravelers}
    - **First Time Visitor?:** ${preferences.firstTime}
    - **Purpose of Trip:** ${tripPurposes}

    **User Preferences:**
    - **Preferred Budget Level:** ${preferences.budget} (Suggest activities and dining that align with this budget: Budget, Mid-range, or Luxury. "Mix" means a combination.)
    - **Daily Rhythm:** ${preferences.pacing}. Interpret this as follows:
        - 'Maximize Every Moment': Schedule a full day with multiple activities from morning to night, minimizing downtime.
        - 'Explore and Unwind': A good balance of 2-3 main activities with some leisure time in between for relaxation or spontaneous discoveries.
        - 'Go with the Flow': Focus on 1-2 key activities per day with ample time for spontaneous exploration, relaxation, and unhurried experiences.
    - **Top Interests:** ${topInterests}
    - **Specific Inclusions/Requests:** ${preferences.specificInclusions || 'None'}

    **CRITICAL Generation Instructions:**
    1.  **Smart Currency Conversion:** You MUST compare the 'Travelling From' location with the 'Destination'.
        - If the trip is **international** (e.g., UK to Japan), all costs in \`estimatedCost\` MUST be in the destination's local currency, followed by an approximate conversion to the user's home currency in parentheses. Example: "¥3,000 (approx. £15 GBP)".
        - If the trip is **domestic** (e.g., UK to UK), just use the local currency. Example: "£20 GBP".
    2.  **Venue & Holiday Awareness (VERY IMPORTANT):**
        - **Check Operating Days:** Before suggesting an activity like a museum or gallery, verify its typical operating days. For example, many European museums are closed on Mondays. If a venue is likely to be closed on the planned day, DO NOT include it. Suggest a suitable alternative instead.
        - **Research Events & Holidays:** Check for any public holidays, major festivals, or significant events in the destination that coincide with the trip dates. If an event exists, add a concise \`note\` to that day's plan explaining the event and its potential impact (e.g., "Public Holiday: Expect many closures and parades."). If there are no events, omit the \`note\` field.
    3.  **Reliable Restaurant Reservations:** For any restaurant or dining activity, you MUST search for a valid, working reservation link. Prioritize official websites, Google Maps links, or major reservation platforms like OpenTable. **DO NOT invent or provide a non-working URL.** If you cannot find a valid link, omit the \`reservationLink\` field entirely.
    4.  **Detailed Activities:** For **each activity**, provide all applicable details: \`estimatedCost\` (following currency rules), \`tradingHours\`, \`distanceFromCenter\`, and a practical \`tip\`.
    5.  The output must follow the provided JSON schema precisely.
    6.  The itinerary must be logical, geographically sensible, and perfectly aligned with all user preferences.
    7.  Address the user by their name, ${preferences.name}, in the summary.
    8.  **Provide Alternative Suggestions:** After creating the daily plan, add an optional section called \`alternativeSuggestions\`. This section should list top-rated places that didn't fit into the main itinerary but are worth considering.
        -   Include 3-5 \`topRestaurants\`.
        -   Include 3-5 \`topExperiences\` (e.g., museums, tours, viewpoints).
        -   If the destination is coastal, include 3-5 \`topBeaches\`. If not, this MUST be an empty array.
        -   Include 2-3 \`otherIdeas\` (e.g., unique shops, parks, local markets).
        -   For each item, provide a \`name\` and a brief \`description\`.
        -   If no suitable suggestions can be found for a category, return an empty array for it.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: itinerarySchema,
        temperature: 0.8,
        topP: 0.9,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Received an empty response from the AI model.");
    }
    const jsonText = text.trim();
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
    3.  Remember to adhere to all original constraints like currency conversion, venue closures, holiday checks, and reliable reservation links if you add new activities.
    4.  Ensure the updated plan remains logical, geographically sensible, and consistent.
    5.  Return the **complete and updated** itinerary object, conforming strictly to the provided JSON schema.
    6.  **Maintain Alternative Suggestions:** Ensure the \`alternativeSuggestions\` section is preserved in the final output. If the user's request involves one of the suggestions (e.g., "replace the museum with that alternative restaurant you suggested"), update both the daily plan and the suggestions list accordingly. If the user's request is unrelated to the suggestions, return the original \`alternativeSuggestions\` object unmodified.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: itinerarySchema,
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error("Received an empty refined response from the AI model.");
    }
    const jsonText = text.trim();
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