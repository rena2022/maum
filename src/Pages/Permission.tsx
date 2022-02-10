import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { RootStackParamList } from '../../App';
import { i18n } from '../../i18n.cofig';
import AuthContent from '../Components/AuthContent';
import RoundButton from '../Components/RoundButton';
import Typography from '../Components/Typography';
import { getLocationPermission } from '../Utils/locationPermission';
import { checkMicPermission, getMicPermission } from '../Utils/micPermission';

const { height } = Dimensions.get('window');
type Props = NativeStackScreenProps<RootStackParamList, 'Permission'>;
export type navigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Permission'
>;

const Permission = ({ navigation }: Props) => {
  async function handlePermission() {
    const device = Platform.OS;
    const checkMicResult = await checkMicPermission();
    if (checkMicResult === 'granted') {
      (await getLocationPermission(device)) &&
        navigation.reset({ routes: [{ name: 'Home' }] });
    } else {
      (await getMicPermission(checkMicResult)) &&
        navigation.reset({ routes: [{ name: 'Home' }] });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleWrap}>
        <Typography type="title" value={'PERMISSION.title'} />
      </View>
      <View>
        <AuthContent
          authImogeText="🎙"
          authTitleText={i18n.t('PERMISSION.mic.text')}
          authDescriptionText={i18n.t('PERMISSION.mic.discription')}
        />
        <AuthContent
          authImogeText="📍"
          authTitleText={i18n.t('PERMISSION.location.text')}
          authDescriptionText={i18n.t('PERMISSION.location.discription')}
        />
      </View>
      <View style={styles.footer}>
        <RoundButton
          value="확인"
          onPress={() => {
            handlePermission();
          }}
          containerStyle={styles.checkBtn}
        />
      </View>
    </SafeAreaView>
  );
};

export default Permission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titleWrap: {
    marginTop: 52.43,
    marginBottom: height * 0.07,
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  checkBtn: {
    marginVertical: 'auto',
    width: 315,
  },
});
