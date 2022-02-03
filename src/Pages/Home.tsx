import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Typography from '../Components/Typography';
import { RootState } from '../redux/store';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_MAPS_API_KEY } from '../Constants/api';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

interface ILocation {
  latitude: number;
  longitude: number;
}
const Home = () => {
  Geocoder.init(GOOGLE_MAPS_API_KEY);
  const reduxState = useSelector((state: RootState) => state);
  const [location, setLocation] = useState('');

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        Geocoder.from(latitude, longitude).then(json => {
          const location = json.results[7].formatted_address.replace(' ', ', ');
          setLocation(location);
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
            value={location}
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
      <LottieView
        source={require('../Assets/Call/callWave.json')}
        autoPlay
        loop
      />
      <View style={styles.callBtnTxt}>
        <Typography value="대화친구" textStyle={textStyle.findBtnTextTop} />
        <Typography value="찾기" textStyle={textStyle.findBtnTextBottom} />
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
  callBtnTxt: {
    position: 'absolute',
    top: height / 2 - 45,
    left: width / 2 - 55,
  },
});
