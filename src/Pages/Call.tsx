import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Typography from '../Components/Typography';

const Call = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Typography
        value="대화 친구를 찾고 있어요"
        type="title"
        textStyle={textStyle.callingText}
      />
      <View style={styles.callFriendWrap}>
        <Image
          style={styles.callFriendBtn}
          source={require('../Assets/Call/callFriendBtn.png')}
        />
        <View style={styles.callFriendBtnTextWrap}>
          <Image
            source={require('../Assets/Call/questionMarkText.png')}
            style={styles.callBtnMark}
          />
        </View>
      </View>
      <Pressable style={styles.exitBtnWrap}>
        <Image
          source={require('../Assets/exitDoorBtn.png')}
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
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callFriendWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  callFriendBtn: {
    width: 300,
    height: 300,
  },
  callFriendBtnTextWrap: {
    position: 'absolute',
  },
  callBtnMark: {
    width: 34,
    height: 70,
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
