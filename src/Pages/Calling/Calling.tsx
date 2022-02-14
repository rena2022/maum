import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Typography from '../../Components/Typography';
import LottieView from 'lottie-react-native';
import TimerUp from './TimerUp';

const { height, width } = Dimensions.get('window');

const Calling = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileWrap}>
        <View style={styles.maskBox}>
          <LottieView
            source={require('../../Assets/Lotties/callButton.json')}
            autoPlay
            loop
          />
          <Image
            style={styles.callMask}
            source={require('../../Assets/Images/Call/callMask.png')}
          />
        </View>
        <View style={styles.infoWrap}>
          <Typography
            value="1호 고양이손님"
            textStyle={textStyle.nameInfoText}
          />
          <Typography
            value="🇰🇷 대한민국, 부산광역시"
            type="subTitle"
            textStyle={textStyle.locationText}
          />
          <View style={styles.callTimer}>
            <TimerUp />

            <Typography
              value=" / 09:00"
              type="subTitle"
              textStyle={textStyle.timeLimitText}
            />
          </View>
        </View>
      </View>
      <View style={styles.topicCardWrap}>
        <Image
          style={styles.topicCardImg}
          source={require('../../Assets/Images/Call/topicCard.png')}
        />
        <View style={styles.topicContent}>
          <Typography
            value="첫 대화 카드"
            textStyle={textStyle.topicCardText}
          />
          <Typography
            value="서로의 교집합을 찾아 볼까요?"
            textStyle={textStyle.topicThemeText}
          />
        </View>
      </View>
      <Pressable style={styles.exitBtnWrap}>
        <Image
          style={styles.exitBtn}
          source={require('../../Assets/Images/exitDoorBtn.png')}
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default Calling;

const textStyle = StyleSheet.create({
  nameInfoText: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '700',
    lineHeight: 22,
  },
  locationText: {
    fontSize: 12,
    textAlign: 'left',
    lineHeight: 19,
    fontWeight: '500',
  },
  timeLimitText: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '500',
    lineHeight: 19,
  },
  topicCardText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#27282C',
    marginBottom: 12,
  },
  topicThemeText: {
    color: '#27282C',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  profileWrap: {
    flexDirection: 'row',
    position: 'relative',
    marginTop: 16.12,
    marginLeft: 20,
  },
  maskBox: {
    marginRight: 7,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  callMask: {
    width: 54,
    height: 54,
    borderRadius: 27,
    position: 'absolute',
  },
  infoWrap: {
    justifyContent: 'center',
  },
  callTimer: {
    flexDirection: 'row',
  },
  topicCardWrap: {
    width: 335,
    height: 424,
    borderColor: '#EAEAEA',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: height / 2 - 212,
    left: width / 2 - 335 / 2,
  },
  topicCardImg: {
    width: '100%',
    height: '77%',
  },
  topicContent: {
    marginTop: 20,
  },
  exitBtnWrap: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  exitBtn: {
    width: 23.03,
    height: 31,
  },
});
