import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Typography from '../Components/Typography';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const Call = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Typography
        value="대화 친구를 찾고 있어요"
        type="title"
        textStyle={textStyle.callingText}
      />
      <LottieView
        source={require('../Assets/Lotties/callButton.json')}
        autoPlay
        loop
      />
      <Image
        source={require('../Assets/Images/Call/questionMarkText.png')}
        style={styles.callBtnMark}
      />
      <Pressable style={styles.exitBtnWrap}>
        <Image
          source={require('../Assets/Images/exitDoorBtn.png')}
          style={styles.exitBtn}
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default Call;

const textStyle = StyleSheet.create({
  callingText: {
    fontSize: 24,
    marginTop: 115,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  callFriendWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  callBtnMark: {
    width: 34,
    height: 70,
    position: 'absolute',
    top: height / 2 - 35,
    left: width / 2 - 17,
  },
  exitBtnWrap: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  exitBtn: {
    width: 32,
    height: 32,
  },
});
