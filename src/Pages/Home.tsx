import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Typography from '../Components/Typography';
import { RootState } from '../redux/store';

const { width, height } = Dimensions.get('window');

interface ILocation {
  latitude: number;
  longitude: number;
}
const Home = () => {
  const reduxState = useSelector((state: RootState) => state);
  const [location, setLocation] = useState<ILocation | undefined>(undefined);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 },
    );
  }, []);

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
            value={reduxState.user.nickName}
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
