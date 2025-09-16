
import { GoogleGenAI, Type } from "@google/genai";
import type { Campaign } from '../types';

if (!process.env.API_KEY) {
  // In a real app, this would be a fatal error.
  // For this environment, we can set a dummy key to allow the code to be structured.
  process.env.API_KEY = "YOUR_API_KEY_HERE";
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface RecommendationResponse {
    recommended_ids: string[];
}

export const getCampaignSuggestions = async (
  userInterest: string,
  campaigns: Campaign[]
): Promise<string[]> => {
  if (!process.env.API_KEY || process.env.API_KEY === "YOUR_API_KEY_HERE") {
    console.warn("Gemini API key is not set. Returning random suggestions.");
    // Fallback for when API key is not available
    return campaigns.map(c => c.id).sort(() => 0.5 - Math.random()).slice(0, 2);
  }

  const simplifiedCampaigns = campaigns.map(({ id, title, description, category }) => ({
    id,
    title,
    description,
    category,
  }));

  const prompt = `
    You are an intelligent assistant for a charity donation platform called "Hand of Giving". Your task is to match users with campaigns they are most likely to be interested in.

    Here is a list of available campaigns in JSON format:
    ${JSON.stringify(simplifiedCampaigns)}

    The user has expressed interest in the following: "${userInterest}"

    Based on the user's interest, please identify the most relevant campaigns from the list. 
  `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    recommended_ids: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        },
                        description: "An array of campaign IDs that are a strong match to the user's interest."
                    }
                },
            }
        }
    });
    
    const jsonStr = response.text.trim();
    const result: RecommendationResponse = JSON.parse(jsonStr);
    
    return result.recommended_ids || [];
  } catch (error) {
    console.error("Error fetching campaign suggestions from Gemini API:", error);
    return []; // Return empty array on error
  }
};
