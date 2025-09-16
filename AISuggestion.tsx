
import React, { useState } from 'react';
import { getCampaignSuggestions } from '../services/geminiService';
import type { Campaign } from '../types';

interface AISuggestionProps {
  campaigns: Campaign[];
  onSuggestion: (ids: string[]) => void;
  onReset: () => void;
}

export const AISuggestion: React.FC<AISuggestionProps> = ({ campaigns, onSuggestion, onReset }) => {
  const [interest, setInterest] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!interest.trim()) {
      setError('Please enter a cause you care about.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const suggestedIds = await getCampaignSuggestions(interest, campaigns);
      if (suggestedIds.length === 0) {
        setError('No matching campaigns found. Try a broader search term.');
      }
      onSuggestion(suggestedIds);
    } catch (err) {
      setError('Failed to fetch suggestions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setInterest('');
    setError('');
    onReset();
  }

  return (
    <div className="bg-brand-blue-light p-8 rounded-2xl my-12 text-center shadow-lg">
      <h2 className="text-3xl font-bold text-brand-blue-dark mb-2">Find a Cause That Inspires You</h2>
      <p className="text-blue-800 mb-6">Describe what you care about, and our AI will find the perfect campaign for you.</p>
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          placeholder="e.g., 'helping children learn' or 'clean water access'"
          className="flex-grow p-4 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-brand-gold focus:outline-none"
          disabled={isLoading}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-brand-gold hover:bg-brand-gold-dark text-white font-bold py-4 px-8 rounded-lg transition duration-300 disabled:bg-gray-400"
        >
          {isLoading ? (
             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
          ) : (
            'Ask AI'
          )}
        </button>
        <button 
          onClick={handleReset}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded-lg transition duration-300"
        >
          Reset
        </button>
      </div>
      {error && <p className="text-red-700 bg-red-100 p-2 rounded-lg mt-4 max-w-2xl mx-auto">{error}</p>}
    </div>
  );
};
