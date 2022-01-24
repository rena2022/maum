import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export const networkCheck = () => {
  NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      Alert.alert('네트워크 연결을 다시 확인해주세요.');
    }
  });
};

const PhoneAlert = (status: number) => {
  if (400 <= status && status < 500) {
    Alert.alert('전화번호를 정확히 입력해주세요.');
  } else if (500 <= status && status < 600) {
    Alert.alert('잠시 후 다시 시도해주세요.');
  } else return;
};

export default PhoneAlert;
