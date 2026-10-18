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
