import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export const networkCheck = () => {
  NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      Alert.alert('네트워크 연결을 다시 확인해주세요.');
    }
  });
};

const PhoneAlert = (status: string) => {
  const statusNum = Number(status);

  if (200 <= statusNum && statusNum < 300) {
    return;
  } else if (300 <= statusNum && statusNum < 400) {
    Alert.alert('전화번호를 정확히 입력해주세요.');
    return;
  } else if (400 <= statusNum && statusNum < 500) {
    Alert.alert('잠시 후 다시 시도해주세요.');
  } else return;
};

export default PhoneAlert;
