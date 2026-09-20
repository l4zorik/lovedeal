import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { LiteModeProvider } from './context/LiteModeContext';
import { FeedProvider } from './context/FeedContext';
import { DeviceProvider } from './context/DeviceContext';
import { SecurityProvider, useSecurity } from './context/SecurityContext';
import { EnigmaProvider } from './context/EnigmaContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import PinLockScreen from './components/PinLockScreen';
import LoginScreen from './components/LoginScreen';

function AuthGate() {
  const { isAuthenticated, pinEnabled, currentUser } = useSecurity();

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
              <LiteModeProvider>
                <FeedProvider>
                  <StatusBar style="light" />
                  <AuthGate />
                </FeedProvider>
              </LiteModeProvider>
            </EnigmaProvider>
          </AnalyticsProvider>
        </SecurityProvider>
      </DeviceProvider>
    </ErrorBoundary>
  );
}
