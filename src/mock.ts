import { Ionicons } from '@expo/vector-icons';

type Icon = keyof typeof Ionicons.glyphMap;

// TODO: replace all of this with API data
export const PROFILE = { name: 'Sarah Johnson', since: 'May 2024', quests: 12, co2: '24kg', badges: 8 };

export const REWARDS_BALANCE = { gbp: '£14.50', credits: 145 };

export const OFFERS: { id: string; title: string; place: string; note: string; badge: string; icon: Icon }[] = [
  { id: 'leaf-10', title: '10% off at', place: 'Green Leaf Café', note: 'Min spend £5', badge: '10% OFF', icon: 'cafe-outline' },
  { id: 'zw-5', title: '£5 off at', place: 'Zero Waste Shop', note: 'Min spend £20', badge: '£5 OFF', icon: 'basket-outline' },
  { id: 'refill', title: 'Free refill at', place: 'Refill Station', note: '1 per day', badge: 'FREE', icon: 'water-outline' },
];

export type Activity = {
  id: string;
  month: string;
  title: string;
  place: string;
  credits: string;
  status: 'Completed' | 'Redeemed';
  icon: Icon;
};

export const ACTIVITY: Activity[] = [
  { id: 'a1', month: 'May 2024', title: 'Bring your reusable cup', place: 'Green Leaf Café', credits: '+50', status: 'Completed', icon: 'cafe-outline' },
  { id: 'a2', month: 'May 2024', title: 'Zero Waste Challenge', place: 'Zero Waste Shop', credits: '+60', status: 'Completed', icon: 'basket-outline' },
  { id: 'a3', month: 'May 2024', title: 'Refill & Save', place: 'Refill Station', credits: '+30', status: 'Completed', icon: 'water-outline' },
  { id: 'a4', month: 'May 2024', title: 'Meatless Monday', place: 'Green Bites', credits: '+40', status: 'Completed', icon: 'restaurant-outline' },
  { id: 'a5', month: 'April 2024', title: 'Walk & Earn', place: 'CityFit', credits: '+25', status: 'Completed', icon: 'walk-outline' },
  { id: 'a6', month: 'April 2024', title: 'Free refill', place: 'Refill Station', credits: '−40', status: 'Redeemed', icon: 'gift-outline' },
];

export type Place = {
  id: string;
  name: string;
  kind: string;
  distance: string;
  rating: string;
  icon: Icon;
  about: string;
  address: string;
  hours: string;
  tags: string[];
  questId?: string;
  lat: number;
  lng: number;
};

export const PLACES: Place[] = [
  { id: 'green-leaf', name: 'Green Leaf Café', kind: 'Café', distance: '0.3 km', rating: '4.8', icon: 'cafe-outline', about: 'Cosy neighbourhood café serving delicious coffee with a sustainable mindset.', address: '12 Green St, London, UK', hours: 'Open · Closes 8:00 PM', tags: ['Reusable Cup Friendly', 'Local Business'], questId: 'reusable-cup', lat: 51.5081, lng: -0.1281 },
  { id: 'zero-waste', name: 'Zero Waste Shop', kind: 'Sustainable Store', distance: '0.4 km', rating: '4.7', icon: 'basket-outline', about: 'Package-free groceries and household basics. Bring your own containers.', address: '5 Mill Lane, London, UK', hours: 'Open · Closes 6:00 PM', tags: ['Package Free', 'Local Business'], questId: 'zero-waste-shop', lat: 51.5062, lng: -0.1243 },
  { id: 'refill-station', name: 'Refill Station', kind: 'Water Refill', distance: '0.5 km', rating: '4.6', icon: 'water-outline', about: 'Free water refills for anyone with a reusable bottle.', address: '1 Canal Walk, London, UK', hours: 'Open 24 hours', tags: ['Free Refills'], questId: 'refill-station', lat: 51.509, lng: -0.125 },
  { id: 'green-bites', name: 'Green Bites', kind: 'Healthy Food', distance: '0.7 km', rating: '4.5', icon: 'restaurant-outline', about: 'Plant-based plates made with seasonal, local produce.', address: '30 Park Rd, London, UK', hours: 'Open · Closes 9:00 PM', tags: ['Plant Based', 'Local Business'], lat: 51.5045, lng: -0.13 },
  { id: 'cityfit', name: 'CityFit Studio', kind: 'Fitness', distance: '1.2 km', rating: '4.4', icon: 'walk-outline', about: 'Neighbourhood gym with outdoor classes and walking groups.', address: '8 High St, London, UK', hours: 'Open · Closes 10:00 PM', tags: ['Active Travel'], lat: 51.511, lng: -0.133 },
];

export type PayMethod = { id: string; icon: Icon; title: string; sub: string; isDefault?: boolean };

// Display data only — never keep full card numbers or CVV in app state.
export const PAY_METHODS: PayMethod[] = [
  { id: 'visa', icon: 'card-outline', title: 'Visa •••• 4242', sub: 'Expires 12/27', isDefault: true },
  { id: 'mc', icon: 'card-outline', title: 'Mastercard •••• 8888', sub: 'Expires 09/28' },
  { id: 'paypal', icon: 'logo-paypal', title: 'PayPal', sub: 'sarah.johnson@email.com' },
  { id: 'apple', icon: 'logo-apple', title: 'Apple Pay', sub: 'Connected' },
];

export const FAQ_TABS = ['Popular', 'Quests', 'Rewards', 'Account'] as const;

// TODO: replace with CMS / API content
export const FAQS: { q: string; a: string; tags: string[] }[] = [
  { q: 'How do quests work?', a: 'Pick a quest, complete the steps at the partner venue, then scan the QR code there to finish it.', tags: ['Popular', 'Quests'] },
  { q: 'How do I earn rewards?', a: 'Every completed quest earns Green Credits. Spend them on offers in the Rewards tab.', tags: ['Popular', 'Rewards'] },
  { q: 'How do I submit proof?', a: 'Scan the QR code at the venue when you finish the quest. No photos needed.', tags: ['Popular', 'Quests'] },
  { q: 'When will I receive my reward?', a: 'Credits land in your wallet as soon as your scan is verified.', tags: ['Popular', 'Rewards'] },
  { q: 'What are Green Credits?', a: 'Green Credits are SideQuest points. 50 credits are worth £2.00 at partner venues.', tags: ['Popular', 'Rewards'] },
  { q: 'How do I invite a friend?', a: 'Open your profile and tap the share icon to send an invite.', tags: ['Popular', 'Account'] },
  { q: 'How do I change my email?', a: 'Go to Settings → Edit Profile.', tags: ['Account'] },
];
