import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { RootStackParamList } from '../../App';
import { i18n } from '../../i18n.cofig';
import DropDown from '../Components/DropDown';
import RoundButton from '../Components/RoundButton';
import Typography from '../Components/Typography';
import { setPhoneNum } from '../redux/modules/phoneNumInfo';
import { service } from '../Services/index';
import TokenError from '../Utils/AxiosError';
import PhoneAlert from '../Utils/phoneAlert';

type Props = NativeStackScreenProps<RootStackParamList, 'Phone'>;
const Phone = ({ navigation }: Props) => {
  const [input, setInput] = useState('');
  const [isFocus, setFocus] = useState(false);
  const [nation, setNation] = useState(82);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getNation = (n: number) => {
    setNation(n);
  };

  const handleOnPressed = async () => {
    try {
      setLoading(true);
      const phoneNum = input.replace(/[-._!\s]/g, '');
      dispatch(setPhoneNum(nation, phoneNum));
      const fullNum = '+' + nation + ' ' + phoneNum;
      const data = await service.auth.verifyPhoneNum(nation, phoneNum);
      // 네트워크체크 위치 수정 필요
      // networkCheck();
      setLoading(false);
      navigation.navigate('Certification', {
        phoneNum: fullNum,
        authCode: data['authCode'],
      });
    } catch (error: any) {
      setLoading(false);
      if (error.message == 'Network Error') {
        Alert.alert(i18n.t('PHONEALERT.network.discription'));
      } else if (error instanceof TokenError && error.status) {
        PhoneAlert(error.status);
      } else {
        console.error(error);
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.flexAlign}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../Assets/Images/Authorise/lock.png')}
            style={styles.imgStyle}
          />
          <Typography value="PHONE.title" type="title" />
          <Typography value="PHONE.subTitle" type="subTitle" />
          <View style={[styles.tempStyle, { zIndex: 2 }]}>
            <DropDown getNation={getNation} />
            <TextInput
              placeholder={i18n.t('PHONE.phoneNumber')}
              keyboardType="numeric"
              autoFocus={true}
              style={styles.inputBox}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onChangeText={text => setInput(text)}
              value={input}
              onSubmitEditing={handleOnPressed}
            />
          </View>

          <View
            style={{
              width: 315,
              height: 2,
              backgroundColor: isFocus ? '#FF787E' : '#D6D9DF',
              marginTop: Platform.OS == 'ios' ? 10 : 0,
            }}
          />
        </View>

        <RoundButton
          value="PHONE.nextBtn"
          containerStyle={[styles.roundBtn, { opacity: input == '' ? 0.3 : 1 }]}
          disabled={input == ''}
          isLoading={loading}
          onPress={handleOnPressed}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  flexAlign: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  imgStyle: {
    width: 23.33,
    height: 31.67,
    marginBottom: 12.17,
  },

  inputBox: {
    fontSize: 24,
    marginTop: 34,
    marginLeft: 14,
    width: 270,
  },
  tempStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  rightAlign: {
    marginTop: 24,
    marginRight: 30,
    alignItems: 'flex-end',
  },

  roundBtn: {
    width: 182,
    height: 60,
    marginTop: 24,
    marginLeft: 180,
  },
});

export default Phone;
