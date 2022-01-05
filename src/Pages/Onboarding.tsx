import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Typography from '../Components/Typography';

const Onboarding = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Image source={require('../Assets/sumHeart.png')} />
        <Typography type="title" value="greetText" />
        <Text style={textStyle.introText}>
          마음은 따뜻한 1:1 소셜 통화 앱이에요.{'\n'}
          지금 대화 친구를 만나세요!
        </Text>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.startBtn}>
          <Text style={textStyle.startBtnText}>시작하기</Text>
        </Pressable>
        <Text style={textStyle.noticeText}>
          가입 시 이용약관 및 개인정보 취급방침에 동의하게 됩니다.
        </Text>
      </View>
    </View>
  );
};

export default Onboarding;

const textStyle = StyleSheet.create({
  greetText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 34,
    marginRight: 12,
    marginVertical: 20,
  },
  introText: {
    fontSize: 18,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 28.8,
  },
  startBtnText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  noticeText: {
    fontSize: 12,
    color: '#999999',
    letterSpacing: -0.01,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contents: {
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
  },
  startBtn: {
    width: '90%',
    backgroundColor: '#ff787e',
    borderRadius: 30,
    marginBottom: 16,
    paddingVertical: 20,
  },
});
