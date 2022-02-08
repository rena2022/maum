import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { RootStackParamList } from '../../App';
import RoundButton from '../Components/RoundButton';
import Typography from '../Components/Typography';

const { height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const Onboarding = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contents}>
        <Image source={require('../Assets/Images/Onboarding/sumHeart.png')} />
        <Typography
          type="title"
          value="ONBOARDING.greetText"
          textStyle={textStyle.greetText}
        />
        <Typography
          type="subTitle"
          value={'ONBOARDING.explain'}
          textStyle={textStyle.introText}
        />
      </View>
      <View style={styles.footer}>
        <RoundButton
          value="ONBOARDING.start"
          onPress={() => navigation.navigate('Phone')}
          containerStyle={styles.startBtn}
        />
        <Typography
          type="subTitle"
          value="ONBOARDING.notice"
          textStyle={textStyle.noticeText}
        />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const textStyle = StyleSheet.create({
  greetText: {
    fontSize: 20,
    lineHeight: 20,
    marginTop: 32,
    marginBottom: 12,
  },
  introText: {
    fontWeight: '500',
  },
  noticeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#999999',
    letterSpacing: -0.01,
    lineHeight: 12,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contents: {
    alignItems: 'center',
    position: 'absolute',
    top: height * 0.33,
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    alignItems: 'center',
  },
  startBtn: {
    width: 335,
    marginBottom: 16,
  },
});
