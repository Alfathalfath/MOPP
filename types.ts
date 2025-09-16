
export interface Organization {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  mission: string;
  rating: number;
  testimonials: { author: string; quote: string }[];
}

export interface CampaignUpdate {
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  goal: number;
  raised: number;
  donors: number;
  category: string;
  isUrgent: boolean;
  organizationId: string;
  updates: CampaignUpdate[];
}
