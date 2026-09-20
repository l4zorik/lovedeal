import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import { LiteModeProvider } from './context/LiteModeContext';
import { FeedProvider } from './context/FeedContext';
import { DeviceProvider } from './context/DeviceContext';
import { SecurityProvider, useSecurity } from './context/SecurityContext';
import { EnigmaProvider } from './context/EnigmaContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { LoveCoinsProvider } from './context/LoveCoinsContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import PinLockScreen from './components/PinLockScreen';
import LoginScreen from './components/LoginScreen';
import OnboardingQuiz from './components/OnboardingQuiz';

const ONBOARDING_KEY = '@lovedeal_onboarded';

function AuthGate() {
  const { isAuthenticated, pinEnabled, currentUser } = useSecurity();
  const [onboarded, setOnboarded] = useState(null);

  useEffect(() => {
    import('@react-native-async-storage/async-storage').then(({ default: AS }) => {
      AS.getItem(ONBOARDING_KEY).then((v) => setOnboarded(v === 'true'));
    });
  }, []);

  if (onboarded === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    );
  }

  if (!onboarded) {
    return (
      <OnboardingQuiz onComplete={(selections) => {
        import('@react-native-async-storage/async-storage').then(({ default: AS }) => {
          AS.setItem(ONBOARDING_KEY, 'true');
          setOnboarded(true);
        });
      }} />
    );
  }

  if (!currentUser) {
    return <LoginScreen />;
  }

  if (!isAuthenticated && pinEnabled) {
    return <PinLockScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <DeviceProvider>
        <SecurityProvider>
          <AnalyticsProvider>
            <EnigmaProvider>
              <LoveCoinsProvider>
                <LiteModeProvider>
                  <FeedProvider>
                    <StatusBar style="light" />
                    <AuthGate />
                  </FeedProvider>
                </LiteModeProvider>
              </LoveCoinsProvider>
            </EnigmaProvider>
          </AnalyticsProvider>
        </SecurityProvider>
      </DeviceProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: '#1a1410', alignItems: 'center', justifyContent: 'center' },
});
