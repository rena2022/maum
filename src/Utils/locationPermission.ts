import { Alert, Linking, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { checkMultiple, PERMISSIONS } from 'react-native-permissions';

export const checkGeoPermission = async () => {
  try {
    const checkResult = Object.values(
      await checkMultiple([
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ]),
    )[0];
    return checkResult;
  } catch (err) {
    throw new Error();
  }
};

export const getLocationPermission = async (os: string) => {
  if (os === 'ios') {
    const requestResult = await Geolocation.requestAuthorization('always');
    if (requestResult === 'granted') {
      return true;
    } else {
      goSetting(requestResult);
      return false;
    }
  } else if (os === 'android') {
    const requestResult = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      modalMsg[0],
    );
    if (requestResult === 'granted') {
      return true;
    } else {
      goSetting(requestResult);
      return false;
    }
  }
};

const goSetting = (result: string) => {
  if (result === 'denied') {
    Alert.alert('위치 정보', 'Maum을 이용하기 위해 위치 정보가 필요해요', [
      {
        text: '권한 설정하러 가기',
        onPress: () => Linking.openSettings(),
      },
      { text: '취소', style: 'cancel' },
    ]);
  }
};

const modalMsg = [
  // 0: 안드로이드 확인 모달
  {
    title: '위치 정보',
    message: 'Maum을 이용하기 위해 위치 정보가 필요해요',
    buttonPositive: 'OK',
  },
];
