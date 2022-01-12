import { Alert, AlertButton, Linking } from 'react-native';
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';

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

export const getMicPermission = async () => {
  const checkResult = await checkMicPermission();
  if (checkResult === 'denied') {
    await requestMicPermission();
  }
  if (checkResult === 'blocked') {
    alertRationale();
  }
  if (checkResult === 'granted') {
    return true;
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
    console.log('check ', checkResult);
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
    console.log('req ', requestResults);
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
