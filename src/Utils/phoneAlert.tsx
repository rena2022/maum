import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { i18n } from '../../i18n.cofig';

export const networkCheck = () => {
  NetInfo.addEventListener(state => {
    console.log(state);
    if (!state.isConnected) {
      Alert.alert(i18n.t('PHONEALERT.network.discription'));
    }
  });
};

const PhoneAlert = (status: number) => {
  if (400 <= status && status < 500) {
    Alert.alert(i18n.t('PHONEALERT.error.discription1'));
  } else if (500 <= status && status < 600) {
    Alert.alert(i18n.t('PHONEALERT.error.discription2'));
  } else return;
};

export default PhoneAlert;
