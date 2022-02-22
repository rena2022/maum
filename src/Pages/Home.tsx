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
import { LogBox } from 'react-native';

const { width, height } = Dimensions.get('window');

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: Props) => {
  Geocoder.init(GOOGLE_MAPS_API_KEY, {
    language: getLocales()[0].languageCode,
  });
  const reduxState = useSelector((state: RootState) => state);
  const [location, setLocation] = useState('');
  const [coordsLocation, setCoordsLocation] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const coordsLocation = {
          latitude: position.coords.latitude,
          longtitude: position.coords.longitude,
        };

        setCoordsLocation(coordsLocation);

        Geocoder.from(coordsLocation.latitude, coordsLocation.longtitude).then(
          json => {
            const location = json.results[8].formatted_address;
            setLocation(location);
            setLoading(true);
          },
        );
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 },
    );
  }, [location]);

  return (
    <SafeAreaView style={styles.container}>
      {!loading ? (
        <SkeletonUI />
      ) : (
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
      )}
      <Pressable
        style={styles.callBtnContainer}
        disabled={!loading}
        onPress={() => {
          navigation.reset({
            routes: [
              {
                name: 'Call',
                params: { userInfo: { ...reduxState.user, coordsLocation } },
              },
            ],
          });
        }}>
        <LottieView
          source={require('../Assets/Lotties/callButton.json')}
          autoPlay
          loop
          style={styles.ani}
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
      </Pressable>

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
  callBtnContainer: {
    position: 'absolute',
    top: height / 2 - width / 2,
    zIndex: 3,
  },
  callBtnTxt: {
    width: 118,
    height: 97,
    position: 'absolute',
    left: width / 2 - 59,
    top: width / 2 - 48.5,
    zIndex: 2,
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
  ani: {
    height: width,
    zIndex: 1,
  },
});
