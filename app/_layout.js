import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LiteModeProvider } from './context/LiteModeContext';
import { FeedProvider } from './context/FeedContext';
import { DeviceProvider } from './context/DeviceContext';
import { SecurityProvider } from './context/SecurityContext';
import { EnigmaProvider } from './context/EnigmaContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { ErrorBoundary } from './components/ErrorBoundary';

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
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" />
                  </Stack>
                </FeedProvider>
              </LiteModeProvider>
            </EnigmaProvider>
          </AnalyticsProvider>
        </SecurityProvider>
      </DeviceProvider>
    </ErrorBoundary>
  );
}
