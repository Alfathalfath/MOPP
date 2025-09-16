
import React from 'react';

interface ProgressBarProps {
  raised: number;
  goal: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ raised, goal }) => {
  const percentage = Math.min((raised / goal) * 100, 100);
  const isComplete = percentage >= 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className={`bg-brand-gold h-2.5 rounded-full transition-all duration-500 ease-out ${isComplete ? 'animate-glow' : ''}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
