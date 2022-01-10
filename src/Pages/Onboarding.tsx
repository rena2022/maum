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
import RoundBtn from '../Components/RoundBtn';
import Typography from '../Components/Typography';

const { height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const Onboarding = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contents}>
        <Image source={require('../Assets/sumHeart.png')} />
        <Typography
          type="title"
          value="greetText"
          textStyle={textStyle.greetText}
        />
        <Typography
          type="subTitle"
          value={
            '마음은 따뜻한 1:1 소셜 통화 앱이에요.\n지금 대화 친구를 만나세요!'
          }
          textStyle={textStyle.introText}
        />
      </View>
      <View style={styles.footer}>
        <RoundBtn
          value="시작하기"
          onPress={() => navigation.navigate('Phone')}
          containerStyle={styles.startBtn}
        />
        <Typography
          type="subTitle"
          value="가입 시 이용약관 및 개인정보 취급방침에 동의하게 됩니다."
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
