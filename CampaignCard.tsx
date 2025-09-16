
import React from 'react';
import type { Campaign, Organization } from '../types';
import { ProgressBar } from './ProgressBar';
import { UsersIcon } from './IconComponents';

interface CampaignCardProps {
  campaign: Campaign;
  organization: Organization;
  onDonate: (campaign: Campaign) => void;
  onDetails: (campaign: Campaign) => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, organization, onDonate, onDetails }) => {
  const percentage = Math.round((campaign.raised / campaign.goal) * 100);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={campaign.imageUrl} alt={campaign.title} />
        {campaign.isUrgent && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">URGENT</span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center mb-2">
            <img src={organization.logoUrl} alt={organization.name} className="w-6 h-6 rounded-full mr-2"/>
            <span className="text-gray-500 text-sm">{organization.name}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 h-14">{campaign.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{campaign.description.substring(0, 100)}...</p>
        
        <div className="mb-4">
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="font-bold text-brand-blue-dark">${campaign.raised.toLocaleString()} raised</span>
            <span className="text-gray-500">{percentage}%</span>
          </div>
          <ProgressBar raised={campaign.raised} goal={campaign.goal} />
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <UsersIcon className="w-4 h-4 mr-2"/>
          <span>{campaign.donors.toLocaleString()} donors</span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2">
          <button 
            onClick={() => onDonate(campaign)}
            className="w-full bg-brand-gold hover:bg-brand-gold-dark text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Donate Now
          </button>
          <button 
            onClick={() => onDetails(campaign)}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
