import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Typography from '../Components/Typography';

const { width, height } = Dimensions.get('window');
const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileWrap}>
        <View style={styles.maskBox}>
          <Image
            style={styles.mask}
            source={require('../Assets/Home/userMask.png')}
          />
          <Pressable>
            <Image
              style={styles.editBtn}
              source={require('../Assets/Home/userProfileEditBtn.png')}
            />
          </Pressable>
        </View>
        <View style={styles.infoWrap}>
          <Typography
            value="220호 강아지손님"
            textStyle={textStyle.nameInfoText}
          />
          <Typography
            value="🇰🇷 대한민국, 서울시"
            type="subTitle"
            textStyle={textStyle.detailInfoText}
          />
          <Typography
            value="😍 12"
            type="subTitle"
            textStyle={textStyle.detailInfoText}
          />
        </View>
      </View>
      <View style={styles.findFriendWrap}>
        <Image
          style={styles.findFriendBtn}
          source={require('../Assets/Home/findFriendBtn.png')}
        />
        <View style={styles.findFriendBtnTextWrap}>
          <Typography value="대화친구" textStyle={textStyle.findBtnTextTop} />
          <Typography value="찾기" textStyle={textStyle.findBtnTextBottom} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const textStyle = StyleSheet.create({
  nameInfoText: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '600',
    lineHeight: 22.4,
  },
  detailInfoText: { fontSize: 12, textAlign: 'left', lineHeight: 19.2 },
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
  maskBox: {
    marginRight: 12,
  },
  mask: {
    width: 64,
    height: 64,
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
  },
  infoWrap: {
    paddingTop: 4,
    paddingBottom: 2,
  },
  findFriendWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: height / 2 - 150,
    left: width / 2 - 150,
  },
  findFriendBtn: {
    width: 300,
    height: 300,
  },
  findFriendBtnTextWrap: {
    position: 'absolute',
  },
});
