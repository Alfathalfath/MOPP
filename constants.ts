
import type { Organization, Campaign } from './types';

export const ORGANIZATIONS: Organization[] = [
  {
    id: 'org001',
    name: 'Global Relief Foundation',
    logoUrl: 'https://picsum.photos/seed/grf/100',
    description: 'Providing humanitarian aid and disaster relief worldwide.',
    mission: 'To bring hope and support to communities affected by crisis, fostering resilience and sustainable recovery.',
    rating: 4.8,
    testimonials: [{ author: 'Jane D.', quote: 'Their response to the flood was incredible. A trustworthy organization.' }],
  },
  {
    id: 'org002',
    name: 'Clean Water Initiative',
    logoUrl: 'https://picsum.photos/seed/cwi/100',
    description: 'Dedicated to bringing clean and safe drinking water to every person on Earth.',
    mission: 'We build wells, install filtration systems, and educate communities on sanitation to create a healthier future.',
    rating: 4.9,
    testimonials: [{ author: 'Mark S.', quote: 'The impact on our village is immeasurable. Thank you, CWI!' }],
  },
  {
    id: 'org003',
    name: 'Future Coders',
    logoUrl: 'https://picsum.photos/seed/fc/100',
    description: 'Empowering underprivileged youth with technology education.',
    mission: 'To bridge the digital divide by providing coding bootcamps, mentorship, and career opportunities to young aspiring developers.',
    rating: 4.7,
    testimonials: [{ author: 'Priya K.', quote: 'Future Coders gave me the skills to land my dream job.' }],
  },
];

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'cmp001',
    title: 'Emergency Flood Relief for West Valley',
    description: 'A recent superstorm has devastated the West Valley, leaving thousands without homes, food, or clean water. Your donation provides immediate assistance.',
    imageUrl: 'https://picsum.photos/seed/flood/600/400',
    goal: 50000,
    raised: 42500,
    donors: 1245,
    category: 'Disaster Relief',
    isUrgent: true,
    organizationId: 'org001',
    updates: [
      { date: 'Yesterday', title: 'First Supply Trucks Arrived', description: 'Thanks to your donations, we delivered water, food, and blankets to 500 families.', imageUrl: 'https://picsum.photos/seed/truck/600/400' },
      { date: '3 days ago', title: 'Campaign Launched', description: 'We launched this campaign in response to the devastating floods.' }
    ]
  },
  {
    id: 'cmp002',
    title: 'Build a Well in the Sahel Region',
    description: 'Help us construct a deep-water well that will provide clean, safe drinking water for over 2,000 people in a drought-stricken village.',
    imageUrl: 'https://picsum.photos/seed/well/600/400',
    goal: 15000,
    raised: 7500,
    donors: 350,
    category: 'Water & Sanitation',
    isUrgent: false,
    organizationId: 'org002',
    updates: [
       { date: 'Last week', title: 'Site Survey Complete', description: 'Our engineering team has identified the optimal location for the new well.', imageUrl: 'https://picsum.photos/seed/survey/600/400' }
    ]
  },
  {
    id: 'cmp003',
    title: 'Coding Bootcamp for 100 Teens',
    description: 'Sponsor a student for our intensive 12-week coding bootcamp. Your support covers tuition, a laptop, and career services to help them launch a tech career.',
    imageUrl: 'https://picsum.photos/seed/code/600/400',
    goal: 75000,
    raised: 75000,
    donors: 480,
    category: 'Education',
    isUrgent: false,
    organizationId: 'org003',
    updates: [
       { date: 'This week', title: 'Graduation Day!', description: 'Congratulations to our latest cohort! 95% have already received job offers.', imageUrl: 'https://picsum.photos/seed/grad/600/400' }
    ]
  },
  {
    id: 'cmp004',
    title: 'Winter Kits for the Homeless',
    description: 'Provide a kit with a warm blanket, thermal socks, gloves, and a hot meal for someone experiencing homelessness this winter.',
    imageUrl: 'https://picsum.photos/seed/winter/600/400',
    goal: 20000,
    raised: 11300,
    donors: 890,
    category: 'Humanitarian Aid',
    isUrgent: true,
    organizationId: 'org001',
    updates: [
       { date: '2 days ago', title: 'Kit Assembly Event', description: 'Volunteers gathered to assemble over 500 winter kits. They are now being distributed.', imageUrl: 'https://picsum.photos/seed/kits/600/400' }
    ]
  },
];
