import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import { getLocales } from 'react-native-localize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../App';
import Typography from '../Components/Typography';
import { GOOGLE_MAPS_API_KEY } from '../Constants/keys';
import { RootState } from '../redux/store';
import { resetToken } from '../Utils/keychain';
import SkeletonUI from './SkeletonUI';

const { width, height } = Dimensions.get('window');

interface ILocation {
  latitude: number;
  longitude: number;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: Props) => {
  Geocoder.init(GOOGLE_MAPS_API_KEY, {
    language: getLocales()[0].languageCode,
  });
  const reduxState = useSelector((state: RootState) => state);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        Geocoder.from(latitude, longitude).then(json => {
          const location = json.results[8].formatted_address;
          setLocation(location);
          setLoading(true);
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 },
    );
  }, [location]);

  return loading ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileWrap}>
        <View style={styles.maskBox}>
          <View style={styles.mask}></View>
          <Image
            style={styles.pofileImg}
            source={{
              uri: reduxState.user.profile,
            }}
          />
          <Pressable>
            <Image
              style={styles.editBtn}
              source={require('../Assets/Images/Home/userProfileEditBtn.png')}
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

      {/* 로그아웃 */}
      <View style={styles.logOutContainer}>
        <Pressable
          style={styles.logOut}
          onPress={async () => {
            await resetToken('refreshToken');
            setTimeout(() => {
              navigation.reset({ routes: [{ name: 'Onboarding' }] });
            }, 200);
          }}
        />
      </View>
    </SafeAreaView>
  ) : (
    <SkeletonUI />
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

    borderRadius: 32,
    borderColor: '#FFE600',
    borderWidth: 6,
    opacity: 0.7,
  },
  pofileImg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    position: 'absolute',
    top: 6,
    left: 6,
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
    alignItems: 'center',
    width: 120,
    height: 90,
    position: 'absolute',
    top: height / 2 - 45,
    left: width / 2 - 60,
  },
  logOutContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    margin: 30,
  },
  logOut: {
    width: 50,
    height: 50,
    backgroundColor: 'pink',
    borderRadius: 25,
  },
});
