import { Platform, Alert, Linking } from 'react-native';
import * as Application from 'expo-application';
import * as IntentLauncher from 'expo-intent-launcher';

const PERMISSIONS = {
  CAMERA: 'camera',
  LOCATION: 'location',
  NOTIFICATIONS: 'notifications',
  STORAGE: 'storage',
  MEDIA_LIBRARY: 'mediaLibrary',
};

async function checkCameraPermission() {
  if (Platform.OS !== 'android') return true;
  try {
    const { Camera } = await import('expo-camera');
    const { status } = await Camera.getCameraPermissionsAsync();
    return status === 'granted';
  } catch {
    return false;
  }
}

async function requestCameraPermission() {
  if (Platform.OS !== 'android') return true;
  try {
    const { Camera } = await import('expo-camera');
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === 'granted';
  } catch {
    return false;
  }
}

async function checkLocationPermission() {
  try {
    const { Location } = await import('expo-location');
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === 'granted';
  } catch {
    return false;
  }
}

async function requestLocationPermission() {
  try {
    const { Location } = await import('expo-location');
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch {
    return false;
  }
}

async function checkNotificationPermission() {
  if (Platform.OS !== 'android') return true;
  try {
    const { Notifications } = await import('expo-notifications');
    const { status } = await Notifications.getPermissionsAsync();
    return status === 'granted';
  } catch {
    return false;
  }
}

async function requestNotificationPermission() {
  if (Platform.OS !== 'android') return true;
  try {
    const { Notifications } = await import('expo-notifications');
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  } catch {
    return false;
  }
}

function openAppSettings() {
  if (Platform.OS === 'android') {
    IntentLauncher.startActivityAsync('android.settings.APPLICATION_DETAILS_SETTINGS', {
      data: `package:${Application.applicationId}`,
    });
  } else {
    Linking.openSettings();
  }
}

function showPermissionDeniedAlert(permission) {
  const messages = {
    [PERMISSIONS.CAMERA]: 'Potřebujeme přístup k foťáku pro vyfocení dealů.',
    [PERMISSIONS.LOCATION]: 'Potřebujeme přístup k poloze pro zobrazení deals poblíž.',
    [PERMISSIONS.NOTIFICATIONS]: 'Potřebujeme přístup k notifikacím pro upozornění na nové deals.',
    [PERMISSIONS.STORAGE]: 'Potřebujeme přístup k úložišti pro ukládání obrázků.',
    [PERMISSIONS.MEDIA_LIBRARY]: 'Potřebujeme přístup k galerii pro výběr obrázků.',
  };
  Alert.alert(
    'Oprávnění',
    messages[permission] || 'Potřebujeme přístup k této funkci.',
    [
      { text: 'Zrušit', style: 'cancel' },
      { text: 'Nastavení', onPress: openAppSettings },
    ]
  );
}

export const Permissions = {
  check: async (permission) => {
    switch (permission) {
      case PERMISSIONS.CAMERA:
        return checkCameraPermission();
      case PERMISSIONS.LOCATION:
        return checkLocationPermission();
      case PERMISSIONS.NOTIFICATIONS:
        return checkNotificationPermission();
      default:
        return true;
    }
  },

  request: async (permission) => {
    let granted = false;
    switch (permission) {
      case PERMISSIONS.CAMERA:
        granted = await requestCameraPermission();
        break;
      case PERMISSIONS.LOCATION:
        granted = await requestLocationPermission();
        break;
      case PERMISSIONS.NOTIFICATIONS:
        granted = await requestNotificationPermission();
        break;
      default:
        granted = true;
    }
    if (!granted) {
      showPermissionDeniedAlert(permission);
    }
    return granted;
  },

  checkAndRequest: async (permission) => {
    const isGranted = await Permissions.check(permission);
    if (isGranted) return true;
    return Permissions.request(permission);
  },

  openSettings: openAppSettings,

  getAllStatus: async () => {
    const [camera, location, notifications] = await Promise.all([
      Permissions.check(PERMISSIONS.CAMERA),
      Permissions.check(PERMISSIONS.LOCATION),
      Permissions.check(PERMISSIONS.NOTIFICATIONS),
    ]);
    return { camera, location, notifications };
  },
};

export { PERMISSIONS };
export default Permissions;
