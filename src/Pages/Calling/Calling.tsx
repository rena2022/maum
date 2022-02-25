import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import { getLocales } from 'react-native-localize';
import { RootStackParamList } from '../../../App';
import Typography from '../../Components/Typography';
import { GOOGLE_MAPS_API_KEY } from '../../Constants/keys';
import TimerUp from './TimerUp';

const { height, width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Calling'>;
interface UserInfo {
  nickName: string;
  profile: string;
  location: string;
}

const Calling = ({ route }: Props) => {
  const [transLocation, setLocation] = useState<string>();
  // eslint-disable-next-line prefer-const
  let { userInfo, socket }: UserInfo | any = route.params;
  userInfo = JSON.parse(userInfo);

  function handleDisconnection() {
    socket.emit('exit');
  }

  Geocoder.init(GOOGLE_MAPS_API_KEY, {
    language: getLocales()[0].languageCode,
  });

  useEffect(() => {
    Geocoder.from(
      userInfo.coordsLocation.latitude,
      userInfo.coordsLocation.longtitude,
    ).then(json => {
      const trans = json.results[8].formatted_address;
      setLocation(trans);
    });
  }, [transLocation]);

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
            source={{
              uri: userInfo.profile,
            }}
          />
        </View>
        <View style={styles.infoWrap}>
          <Typography
            value={userInfo.nickName}
            textStyle={textStyle.nameInfoText}
          />
          <Typography
            value={transLocation!}
            type="subTitle"
            textStyle={textStyle.locationText}
          />
          <View style={styles.callTimer}>
            <TimerUp handleDisconnection={handleDisconnection} />
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
            value="CALLING.title"
            textStyle={textStyle.topicCardText}
          />
          <Typography
            value="CALLING.discription"
            textStyle={textStyle.topicThemeText}
          />
        </View>
      </View>
      <Pressable style={styles.exitBtnWrap} onPress={handleDisconnection}>
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
    backgroundColor: '#F8BBD0',
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
