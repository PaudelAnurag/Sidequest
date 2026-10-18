import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Credits } from '../components/Credits';
import { Header } from '../components/Header';
import { Card, Rows } from '../components/ListRow';
import { Screen } from '../components/Screen';
import { colors, spacing } from '../constants/theme';
import { PAY_METHODS, REWARDS_BALANCE } from '../mock';

export default function PaymentMethods() {
  const router = useRouter();
  return (
    <Screen>
      <Header title="Payment Methods" />

      <Card>
        <View style={styles.wallet}>
          <View style={styles.flex}>
            <AppText variant="caption" color={colors.textSecondary}>
              Wallet Balance
            </AppText>
            <AppText variant="h1">{REWARDS_BALANCE.gbp}</AppText>
            <Credits text={`${REWARDS_BALANCE.credits} Green Credits`} />
          </View>
          <Ionicons name="wallet-outline" size={32} color={colors.primary} />
        </View>
      </Card>

      <Rows
        rows={[
          ...PAY_METHODS.map((m) => ({
            icon: m.icon,
            label: m.title,
            sub: m.isDefault ? `${m.sub} · Default` : m.sub,
          })),
          { icon: 'add-circle-outline', label: 'Add Payment Method', onPress: () => router.push('/add-payment') },
        ]}
      />

      <View style={styles.secure}>
        <Ionicons name="lock-closed-outline" size={14} color={colors.textSecondary} />
        <AppText variant="small" color={colors.textSecondary}>
          Your payment information is secure
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, gap: spacing.xs },
  wallet: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.lg },
  secure: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs },
});
