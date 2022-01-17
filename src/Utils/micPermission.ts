import { Alert, AlertButton, Linking, Platform } from 'react-native';
import {
  checkMultiple,
  PERMISSIONS,
  PermissionStatus,
  requestMultiple,
} from 'react-native-permissions';
import { navigationProp } from '../Pages/Permission';
import { getLocationPermission } from './locationPermission';

const iosMicRationale: {
  title: string;
  message?: string;
  buttons: AlertButton[];
} = {
  title: '마이크',
  message: 'Maum을 이용하기 위해 마이크 권한이 필요해요',
  buttons: [
    { text: '권한 설정하러 가기', onPress: () => linkOpenSetting() },
    {
      text: '취소',
      onPress: () => undefined,
    },
  ],
};

export const getMicPermission = async (
  checkResult: PermissionStatus,
  navigation: navigationProp,
) => {
  if (checkResult === 'denied') {
    const isMicGranted = await requestMicPermission();
    if (isMicGranted) {
      const device = Platform.OS;
      getLocationPermission(device, navigation);
    }
  }
  if (checkResult === 'blocked') {
    alertRationale();
  }
};

export const checkMicPermission = async () => {
  try {
    const checkResult = Object.values(
      await checkMultiple([
        PERMISSIONS.IOS.MICROPHONE,
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      ]),
    )[0];
    return checkResult;
  } catch (err) {
    throw new Error();
  }
};

export const requestMicPermission = async () => {
  try {
    const requestResults = Object.values(
      await requestMultiple([
        PERMISSIONS.IOS.MICROPHONE,
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      ]),
    )[0];
    if (requestResults === 'blocked') {
      alertRationale();
    }
    if (requestResults === 'granted') {
      return true;
    }
  } catch (err) {
    throw new Error();
  }
};

const linkOpenSetting = async () => {
  await Linking.openSettings();
};

const alertRationale = () => {
  Alert.alert(
    iosMicRationale.title,
    iosMicRationale.message,
    iosMicRationale.buttons,
  );
};
