
import React, { useState } from 'react';
import type { Campaign } from '../types';
import { GiftIcon, CloseIcon, CheckCircleIcon, HeartIcon } from './IconComponents';

interface DonationModalProps {
  campaign: Campaign | null;
  onClose: () => void;
}

const presetAmounts = [25, 50, 100, 250];
const paymentMethods = [
    { id: 'visa', name: 'Visa/MasterCard', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'applepay', name: 'Apple Pay', icon: '' }
];

export const DonationModal: React.FC<DonationModalProps> = ({ campaign, onClose }) => {
  const [amount, setAmount] = useState<number | string>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const [isRecurring, setIsRecurring] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [donationState, setDonationState] = useState<'form' | 'processing' | 'success'>('form');

  if (!campaign) return null;

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    if(value) {
        setAmount(Number(value));
    } else {
        setAmount('');
    }
  };
  
  const handleDonate = () => {
    if(!amount || Number(amount) <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }
    setDonationState('processing');
    setTimeout(() => {
        setDonationState('success');
    }, 1500); // Simulate processing
  };

  const finalAmount = customAmount ? Number(customAmount) : amount;

  const renderForm = () => (
    <>
      <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-700">Select Amount</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {presetAmounts.map(preset => (
                  <button key={preset} onClick={() => handleAmountSelect(preset)} className={`p-3 border-2 rounded-lg font-bold text-center transition ${amount === preset && !customAmount ? 'bg-brand-blue text-white border-brand-blue' : 'text-gray-700 border-gray-300 hover:border-brand-blue'}`}>
                      ${preset}
                  </button>
              ))}
          </div>
          <input type="text" value={customAmount} onChange={handleCustomAmountChange} placeholder="Or enter custom amount" className="mt-3 w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue"/>

          <h3 className="text-lg font-semibold text-gray-700 mt-6">Payment Method</h3>
          <div className="space-y-2 mt-2">
            {paymentMethods.map(method => (
                <button key={method.id} onClick={() => setPaymentMethod(method.id)} className={`w-full p-3 border-2 rounded-lg text-left flex items-center transition ${paymentMethod === method.id ? 'bg-brand-blue text-white border-brand-blue' : 'text-gray-700 border-gray-300 hover:border-brand-blue'}`}>
                    <span className="text-2xl mr-3">{method.icon}</span>
                    <span className="font-semibold">{method.name}</span>
                </button>
            ))}
          </div>

          <div className="mt-6 space-y-3">
              <label className="flex items-center">
                  <input type="checkbox" checked={isRecurring} onChange={e => setIsRecurring(e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue-light" />
                  <span className="ml-2 text-gray-700">Make this a monthly donation</span>
              </label>
              <label className="flex items-center">
                  <input type="checkbox" checked={isGift} onChange={e => setIsGift(e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue-light" />
                  <span className="ml-2 text-gray-700">Donate as a gift in someone's name <GiftIcon className="w-5 h-5 inline-block ml-1"/></span>
              </label>
          </div>
      </div>
      <div className="bg-gray-100 p-4 flex justify-end">
          <button onClick={handleDonate} className="bg-brand-gold hover:bg-brand-gold-dark text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Donate ${finalAmount > 0 ? finalAmount : '...'}
          </button>
      </div>
    </>
  );

  const renderProcessing = () => (
    <div className="p-10 flex flex-col items-center justify-center text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-blue"></div>
        <h3 className="text-2xl font-bold text-gray-800 mt-6">Processing your donation...</h3>
        <p className="text-gray-600 mt-2">Thank you for your generosity!</p>
    </div>
  );

  const renderSuccess = () => (
    <div className="p-10 flex flex-col items-center justify-center text-center">
        <HeartIcon className="w-20 h-20 text-red-500 animate-pulse-heart" />
        <h3 className="text-2xl font-bold text-green-600 mt-4">Thank You!</h3>
        <p className="text-gray-700 mt-2">Your generous donation of <span className="font-bold">${finalAmount}</span> to "{campaign.title}" has been successfully processed.</p>
        <p className="text-gray-600 mt-4">A digital "Thank You" certificate has been sent to your email.</p>
        <button onClick={onClose} className="mt-8 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-2 px-6 rounded-lg transition duration-300">
            Close
        </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Donate to: {campaign.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <CloseIcon className="w-6 h-6"/>
          </button>
        </div>
        {donationState === 'form' && renderForm()}
        {donationState === 'processing' && renderProcessing()}
        {donationState === 'success' && renderSuccess()}
      </div>
    </div>
  );
};
