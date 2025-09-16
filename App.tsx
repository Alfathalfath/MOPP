
import React, { useState, useMemo } from 'react';
import type { Campaign } from './types';
import { CAMPAIGNS, ORGANIZATIONS } from './constants';
import { CampaignCard } from './components/CampaignCard';
import { DonationModal } from './components/DonationModal';
import { CampaignDetailsModal } from './components/CampaignDetailsModal';
import { AISuggestion } from './components/AISuggestion';
import { HeartIcon, GiftIcon, UsersIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [selectedCampaignForDonation, setSelectedCampaignForDonation] = useState<Campaign | null>(null);
  const [selectedCampaignForDetails, setSelectedCampaignForDetails] = useState<Campaign | null>(null);
  const [filteredCampaignIds, setFilteredCampaignIds] = useState<string[] | null>(null);

  const organizationsMap = useMemo(() => {
    return ORGANIZATIONS.reduce((acc, org) => {
      acc[org.id] = org;
      return acc;
    }, {} as Record<string, typeof ORGANIZATIONS[0]>);
  }, []);

  const handleDonateClick = (campaign: Campaign) => {
    setSelectedCampaignForDetails(null);
    setSelectedCampaignForDonation(campaign);
  };
  
  const handleDetailsClick = (campaign: Campaign) => {
    setSelectedCampaignForDonation(null);
    setSelectedCampaignForDetails(campaign);
  };

  const closeModal = () => {
    setSelectedCampaignForDonation(null);
    setSelectedCampaignForDetails(null);
  };

  const handleSuggestions = (ids: string[]) => {
    setFilteredCampaignIds(ids);
  };
  
  const handleResetSuggestions = () => {
    setFilteredCampaignIds(null);
  }

  const urgentCampaigns = CAMPAIGNS.filter(c => c.isUrgent);
  const popularCampaigns = CAMPAIGNS.filter(c => !c.isUrgent);
  
  const displayedCampaigns = useMemo(() => {
    if (filteredCampaignIds === null) {
      return CAMPAIGNS;
    }
    return CAMPAIGNS.filter(c => filteredCampaignIds.includes(c.id));
  }, [filteredCampaignIds]);

  const totalDonations = CAMPAIGNS.reduce((sum, camp) => sum + camp.raised, 0);
  const totalDonors = CAMPAIGNS.reduce((sum, camp) => sum + camp.donors, 0);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-white shadow-md sticky top-0 z-40">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <GiftIcon className="w-8 h-8 text-brand-blue" />
            <h1 className="text-2xl font-bold text-gray-800 ml-2">Hand of Giving</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-brand-blue">Campaigns</a>
            <a href="#" className="text-gray-600 hover:text-brand-blue">About Us</a>
            <button className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-2 px-4 rounded-lg transition duration-300">
              Log In
            </button>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto px-6 py-8">
        <section className="text-center py-12 bg-white rounded-2xl shadow-sm">
          <h2 className="text-4xl font-extrabold text-gray-800">Join a Movement of Kindness</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">Your contribution, no matter the size, creates a ripple of positive change across the globe.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-brand-gold-light p-6 rounded-xl">
              <HeartIcon className="w-10 h-10 text-brand-gold-dark mx-auto mb-2" />
              <p className="text-3xl font-bold text-brand-gold-dark">${totalDonations.toLocaleString()}</p>
              <p className="text-yellow-800">Total Raised</p>
            </div>
            <div className="bg-brand-blue-light p-6 rounded-xl">
              <UsersIcon className="w-10 h-10 text-brand-blue-dark mx-auto mb-2" />
              <p className="text-3xl font-bold text-brand-blue-dark">{totalDonors.toLocaleString()}</p>
              <p className="text-blue-800">Donors Worldwide</p>
            </div>
             <div className="bg-green-100 p-6 rounded-xl">
              <GiftIcon className="w-10 h-10 text-green-700 mx-auto mb-2" />
              <p className="text-3xl font-bold text-green-700">{CAMPAIGNS.length}</p>
              <p className="text-green-800">Active Campaigns</p>
            </div>
          </div>
        </section>

        <AISuggestion campaigns={CAMPAIGNS} onSuggestion={handleSuggestions} onReset={handleResetSuggestions}/>

        {filteredCampaignIds !== null ? (
          <section id="ai-results" className="my-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">AI-Powered Suggestions</h2>
            {displayedCampaigns.length > 0 ? (
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedCampaigns.map(campaign => (
                      <CampaignCard 
                        key={campaign.id} 
                        campaign={campaign}
                        organization={organizationsMap[campaign.organizationId]}
                        onDonate={handleDonateClick}
                        onDetails={handleDetailsClick}
                      />
                    ))}
                  </div>
            ) : (
                <div className="text-center bg-white p-8 rounded-lg shadow">
                    <p className="text-gray-600">No campaigns match your search. Please try a different query or browse all campaigns below.</p>
                </div>
            )}
          </section>
        ) : (
          <>
            <section id="urgent-campaigns" className="my-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Urgent Needs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {urgentCampaigns.map(campaign => (
                  <CampaignCard 
                    key={campaign.id} 
                    campaign={campaign}
                    organization={organizationsMap[campaign.organizationId]}
                    onDonate={handleDonateClick}
                    onDetails={handleDetailsClick}
                  />
                ))}
              </div>
            </section>

            <section id="popular-campaigns" className="my-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Campaigns</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularCampaigns.map(campaign => (
                  <CampaignCard 
                    key={campaign.id} 
                    campaign={campaign}
                    organization={organizationsMap[campaign.organizationId]}
                    onDonate={handleDonateClick}
                    onDetails={handleDetailsClick}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-gray-800 text-white mt-12">
          <div className="container mx-auto px-6 py-8 text-center">
              <p>&copy; {new Date().getFullYear()} Hand of Giving. All Rights Reserved.</p>
              <p className="text-sm text-gray-400 mt-2">Making the world a better place, one donation at a time.</p>
          </div>
      </footer>

      {selectedCampaignForDonation && (
        <DonationModal
          campaign={selectedCampaignForDonation}
          onClose={closeModal}
        />
      )}
      
      {selectedCampaignForDetails && (
        <CampaignDetailsModal
          campaign={selectedCampaignForDetails}
          organization={organizationsMap[selectedCampaignForDetails.organizationId]}
          onClose={closeModal}
          onDonate={handleDonateClick}
        />
      )}

    </div>
  );
};

export default App;
