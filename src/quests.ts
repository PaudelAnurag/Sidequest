import { Ionicons } from '@expo/vector-icons';

type Icon = keyof typeof Ionicons.glyphMap;

export type Quest = {
  id: string;
  title: string;
  sponsor: string;
  subtitle: string;
  description: string;
  icon: Icon;
  credits: number;
  steps: [Icon, string][];
};

// TODO: replace with API data
export const quests: Quest[] = [
  {
    id: 'reusable-cup',
    title: 'Bring your reusable cup',
    sponsor: 'Green Leaf Café',
    subtitle: 'Green Leaf Café',
    description: 'Help reduce waste by bringing your own cup for any hot drink.',
    icon: 'cafe',
    credits: 50,
    steps: [
      ['cafe-outline', 'Bring your reusable cup'],
      ['cafe-outline', 'Order any hot drink'],
      ['qr-code-outline', 'Scan the QR code at the counter'],
    ],
  },
  {
    id: 'zero-waste-shop',
    title: 'Zero Waste Shop',
    sponsor: 'Zero Waste Shop',
    subtitle: 'Spend £10 or more',
    description: 'Shop package-free and cut down on single-use plastic.',
    icon: 'basket-outline',
    credits: 60,
    steps: [
      ['basket-outline', 'Bring your own containers'],
      ['cart-outline', 'Spend £10 or more'],
      ['qr-code-outline', 'Scan the QR code at the till'],
    ],
  },
  {
    id: 'refill-station',
    title: 'Refill Station',
    sponsor: 'Refill Station',
    subtitle: 'Refill any bottle',
    description: 'Refill your bottle instead of buying a new one.',
    icon: 'water-outline',
    credits: 30,
    steps: [
      ['water-outline', 'Bring a reusable bottle'],
      ['water-outline', 'Refill it at the station'],
      ['qr-code-outline', 'Scan the QR code on the station'],
    ],
  },
];

export const getQuest = (id?: string) => quests.find((q) => q.id === id) ?? quests[0];

/** 50 credits = £2.00 */
export const gbp = (credits: number) => `£${(credits * 0.04).toFixed(2)}`;
