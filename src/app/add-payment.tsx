import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Button } from '../components/Button';
import { Chips } from '../components/Chips';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Screen } from '../components/Screen';
import { colors, spacing } from '../constants/theme';

const TABS = ['Card', 'PayPal', 'Other'] as const;

const luhn = (n: string) => {
  let sum = 0;
  [...n].reverse().forEach((d, i) => {
    let x = Number(d);
    if (i % 2) x = x * 2 > 9 ? x * 2 - 9 : x * 2;
    sum += x;
  });
  return sum % 10 === 0;
};

// Valid through the end of the printed month.
const notExpired = (exp: string) => {
  const [mm, yy] = exp.split('/').map(Number);
  return exp.length === 5 && mm >= 1 && mm <= 12 && new Date(2000 + yy, mm) > new Date();
};

export default function AddPayment() {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]>('Card');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [isDefault, setDefault] = useState(true);
  const [tried, setTried] = useState(false);

  const digits = number.replace(/\s/g, '');
  const errors = {
    number: digits.length < 13 || !luhn(digits) ? 'Enter a valid card number' : '',
    name: name.trim() ? '' : 'Enter the name on the card',
    expiry: notExpired(expiry) ? '' : 'Enter a valid expiry (MM/YY)',
    cvv: /^\d{3,4}$/.test(cvv) ? '' : 'Enter the 3 or 4 digit code',
  };
  const err = (k: keyof typeof errors) => (tried ? errors[k] : '');

  const save = () => {
    setTried(true);
    if (Object.values(errors).some(Boolean)) return;
    // TODO: send to the payment provider (e.g. Stripe) and keep only its token. Never store card data here.
    router.back();
  };

  return (
    <Screen footer={tab === 'Card' ? <Button title="Save Card" onPress={save} /> : undefined}>
      <Header title="Add Payment Method" />
      <Chips options={TABS} value={tab} onChange={setTab} />

      {tab === 'Card' ? (
        <View style={styles.form}>
          <Field label="Card Number" error={err('number')}>
            <Input
              value={number}
              onChangeText={(t) => setNumber(t.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim())}
              placeholder="1234 5678 9012 3456"
              keyboardType="number-pad"
              autoComplete="cc-number"
              error={err('number')}
            />
          </Field>
          <Field label="Name on Card">
            <Input value={name} onChangeText={setName} placeholder="Sarah Johnson" autoComplete="cc-name" error={err('name')} />
          </Field>
          <View style={styles.pair}>
            <View style={styles.flex}>
              <Field label="Expiry Date">
                <Input
                  value={expiry}
                  onChangeText={(t) => {
                    const d = t.replace(/\D/g, '').slice(0, 4);
                    setExpiry(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
                  }}
                  placeholder="MM/YY"
                  keyboardType="number-pad"
                  autoComplete="cc-exp"
                  error={err('expiry')}
                />
              </Field>
            </View>
            <View style={styles.flex}>
              <Field label="CVV">
                <Input
                  value={cvv}
                  onChangeText={(t) => setCvv(t.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  keyboardType="number-pad"
                  secureTextEntry
                  autoComplete="cc-csc"
                  error={err('cvv')}
                />
              </Field>
            </View>
          </View>
          <Field label="Country">
            <Input value={country} onChangeText={setCountry} autoComplete="country" />
          </Field>
          <View style={styles.toggle}>
            <AppText>Set as default payment method</AppText>
            <Switch
              value={isDefault}
              onValueChange={setDefault}
              trackColor={{ true: colors.primary, false: colors.border }}
              accessibilityLabel="Set as default payment method"
            />
          </View>
        </View>
      ) : (
        <AppText color={colors.textSecondary}>{tab} is coming soon.</AppText>
      )}
    </Screen>
  );
}

function Field({ label, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <View style={styles.field}>
      <AppText variant="caption" color={colors.textSecondary}>
        {label}
      </AppText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  form: { gap: spacing.lg },
  field: { gap: spacing.xs },
  pair: { flexDirection: 'row', gap: spacing.md },
  toggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
