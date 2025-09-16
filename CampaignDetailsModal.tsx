
import React from 'react';
import type { Campaign, Organization } from '../types';
import { ProgressBar } from './ProgressBar';
import { UsersIcon, CloseIcon, ShareIcon } from './IconComponents';

interface CampaignDetailsModalProps {
  campaign: Campaign | null;
  organization: Organization | null;
  onClose: () => void;
  onDonate: (campaign: Campaign) => void;
}

export const CampaignDetailsModal: React.FC<CampaignDetailsModalProps> = ({ campaign, organization, onClose, onDonate }) => {
  if (!campaign || !organization) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="relative">
          <img src={campaign.imageUrl} alt={campaign.title} className="w-full h-64 object-cover" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <span className="text-sm font-semibold bg-brand-blue-light text-brand-blue-dark py-1 px-3 rounded-full">{campaign.category}</span>
          <h2 className="text-3xl font-bold text-gray-800 my-2">{campaign.title}</h2>
          
          <div className="flex items-center mb-4">
            <img src={organization.logoUrl} alt={organization.name} className="w-8 h-8 rounded-full mr-2"/>
            <span className="text-gray-600 font-semibold">{organization.name}</span>
          </div>

          <p className="text-gray-700 mb-6">{campaign.description}</p>
          
          <div className="mb-6">
            <div className="flex justify-between items-center text-lg mb-1">
              <span className="font-bold text-brand-blue-dark">${campaign.raised.toLocaleString()} raised</span>
              <span className="text-gray-500 font-semibold">${campaign.goal.toLocaleString()} goal</span>
            </div>
            <ProgressBar raised={campaign.raised} goal={campaign.goal} />
             <div className="flex items-center text-sm text-gray-500 mt-2">
                <UsersIcon className="w-4 h-4 mr-2"/>
                <span>{campaign.donors.toLocaleString()} donors have contributed.</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
             <h3 className="text-xl font-bold text-gray-800 mb-4">Impact Updates</h3>
             <div className="space-y-4">
                {campaign.updates.map((update, index) => (
                    <div key={index} className="flex gap-4">
                        {update.imageUrl && <img src={update.imageUrl} alt={update.title} className="w-24 h-24 rounded-lg object-cover"/>}
                        <div>
                            <p className="text-sm text-gray-500">{update.date}</p>
                            <p className="font-semibold text-gray-800">{update.title}</p>
                            <p className="text-sm text-gray-600">{update.description}</p>
                        </div>
                    </div>
                ))}
             </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
             <h3 className="text-xl font-bold text-gray-800 mb-2">About {organization.name}</h3>
             <p className="text-sm text-gray-600 mb-2"><strong>Mission:</strong> {organization.mission}</p>
             <div className="text-sm text-gray-600 italic">"{organization.testimonials[0].quote}" - {organization.testimonials[0].author}</div>
          </div>
          
        </div>

        <div className="mt-auto bg-white p-4 border-t grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-300">
            <ShareIcon className="w-5 h-5 mr-2" /> Share
          </button>
          <button 
            onClick={() => onDonate(campaign)}
            className="w-full bg-brand-gold hover:bg-brand-gold-dark text-white font-bold py-3 px-4 rounded-lg transition duration-300">
            Donate to this Campaign
          </button>
        </div>
      </div>
    </div>
  );
};
