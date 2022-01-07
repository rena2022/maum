import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import AuthContent from '../Components/AuthContent';
import RoundBtn from '../Components/RoundBtn';
import Typography from '../Components/Typography';

const { height } = Dimensions.get('window');

const Permission = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrap}>
        <Typography
          type="title"
          value={'마지막! 꼭 필요한\n 권한을 허용해 주세요 😉'}
        />
      </View>
      <View>
        <AuthContent
          authImogeText="🎙"
          authTitleText="마이크"
          authDescriptionText="친구와 통화연결"
        />
        <AuthContent
          authImogeText="📍"
          authTitleText="위치 정보"
          authDescriptionText="원하는 나라의 친구 매칭"
        />
      </View>
      <View style={styles.footer}>
        <RoundBtn
          value="확인"
          onPress={() => {
            return;
          }}
          containerStyle={styles.checkBtn}
        />
      </View>
    </View>
  );
};

export default Permission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titleWrap: {
    marginTop: height * 0.11,
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
