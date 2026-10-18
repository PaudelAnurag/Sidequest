import { useState } from 'react';
import { Header } from '../components/Header';
import { Rows, Section } from '../components/ListRow';
import { Screen } from '../components/Screen';

// TODO: load/save with the backend and request OS permission via expo-notifications
const useFlag = (initial = true) => useState(initial);

export default function Notifications() {
  const push = useFlag();
  const reminders = useFlag();
  const quests = useFlag();
  const offers = useFlag();
  const messages = useFlag();
  const marketing = useFlag(false);

  return (
    <Screen>
      <Header title="Notifications" />
      <Rows rows={[{ icon: 'notifications-outline', label: 'Push Notifications', sub: 'Receive updates about quests, rewards and offers', toggle: push }]} />
      <Section title="What you want to receive">
        <Rows
          rows={[
            { icon: 'alarm-outline', label: 'Quest Reminders', sub: 'Reminders for ongoing quests', toggle: reminders },
            { icon: 'compass-outline', label: 'New Quests', sub: 'Get notified about new quests', toggle: quests },
            { icon: 'gift-outline', label: 'Rewards & Offers', sub: 'Exclusive deals and discounts', toggle: offers },
            { icon: 'chatbubble-outline', label: 'Messages', sub: 'Important updates and messages', toggle: messages },
            { icon: 'megaphone-outline', label: 'Marketing', sub: 'News and promotions', toggle: marketing },
          ]}
        />
      </Section>
    </Screen>
  );
}
