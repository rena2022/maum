import React from 'react';
import { Alert, Linking, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const locationPermission = (os: string) => {
  if (os === 'ios')
    Geolocation.requestAuthorization('always').then(result => {
      goSetting(result);
    });
  else if (os === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      modalMsg[0],
    ).then(result => {
      goSetting(result);
    });
  }
};

const goSetting = (result: string) => {
  if (result == 'denied') {
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
