import React from 'react';
import {
  Image,
  Pressable,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Typography from '../Components/Typography';
import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get('window');

const SkeletonUI = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileWrap}>
        <View style={styles.mask}></View>

        <View style={styles.infoWrap}>
          <View style={styles.nameWrap} />
          <View style={styles.locationWarp} />
          <View style={styles.likeWarp} />
        </View>
      </View>
      <LottieView
        source={require('../Assets/Lotties/callButton.json')}
        autoPlay
        loop
      />
      <View style={styles.callBtnTxt}>
        <Typography
          value="HOME.callBtn.friend"
          textStyle={textStyle.findBtnTextTop}
        />
        <Typography
          value="HOME.callBtn.find"
          textStyle={textStyle.findBtnTextBottom}
        />
      </View>
    </SafeAreaView>
  );
};
const textStyle = StyleSheet.create({
  findBtnTextTop: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: '400',
  },
  findBtnTextBottom: {
    fontSize: 64,
    color: '#ffffff',
    fontWeight: '400',
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
    marginTop: 25.12,
    marginLeft: 30,
  },
  mask: {
    marginRight: 12,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e9ecef',
  },
  infoWrap: {
    paddingTop: 4,
    paddingBottom: 2,
  },
  nameWrap: {
    width: 80,
    height: 14,
    backgroundColor: '#e9ecef',
    borderRadius: 40,
    marginBottom: 7,
  },
  locationWarp: {
    width: 100,
    height: 12,
    backgroundColor: '#e9ecef',
    borderRadius: 40,
    marginBottom: 7,
  },
  likeWarp: {
    width: 40,
    height: 12,
    borderRadius: 40,
    backgroundColor: '#e9ecef',
  },
  callBtnTxt: {
    alignItems: 'center',
    width: 120,
    height: 90,
    position: 'absolute',
    top: height / 2 - 45,
    left: width / 2 - 60,
  },
});

export default SkeletonUI;
