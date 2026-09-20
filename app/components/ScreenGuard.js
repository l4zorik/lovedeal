import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ScreenCapture from 'expo-screen-capture';
import * as NavigationBar from 'expo-navigation-bar';

const INSECURE_SCREENS = ['profile', 'settings', 'payment', 'wallet', 'pin', 'biometric'];

export function ScreenGuard({ screenName, children }) {
  const isSecureScreen = INSECURE_SCREENS.includes(screenName);

  useEffect(() => {
    let subscription;
    if (isSecureScreen && Platform.OS === 'android') {
      subscription = ScreenCapture.addScreenshotListener(() => {
        NavigationBar.setVisibilityAsync('hidden');
        setTimeout(() => {
          NavigationBar.setVisibilityAsync('visible');
        }, 2000);
      });
    }
    return () => subscription?.remove();
  }, [isSecureScreen]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('#1A1410');
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={false} backgroundColor="transparent" />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1410',
  },
});

export default ScreenGuard;
