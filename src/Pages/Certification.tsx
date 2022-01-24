import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../App';
import PinInput from '../Components/PinInput';
import RoundBtn from '../Components/RoundBtn';
import Timer from '../Components/Timer';
import Typography from '../Components/Typography';
import { RootState } from '../redux/store';
import { service } from '../Services/index';
import { getToken, resetToken, saveToken } from '../Utils/keychain';

type Props = NativeStackScreenProps<RootStackParamList, 'Certification'>;

const Certification = ({ navigation, route }: Props) => {
  const [isFilled, setFilled] = useState(false);
  const [isCorrect, setCorrect] = useState(false);
  const { phoneNum, authCode } = route.params;
  const [validAuthCode, setValidAuthCode] = useState(authCode);

  async function handleAuthBtn() {
    try {
      const authToken = await getToken('authToken');
      const res = await service.auth.authRepository.checkUser(
        authCode,
        authToken!,
      );
      if (res.type === 'new') {
        if (isCorrect) {
          await resetToken('authToken');
          await saveToken('authToken', res.authToken);
          navigation.reset({
            routes: [{ name: 'Language', params: { phoneNum } }],
          });
        } else {
          Alert.alert('올바른 인증번호를 입력해주세요.');
        }
      } else {
        if (isCorrect) {
          await saveToken('accessToken', res.accessToken);
          await saveToken('refreshToken', res.refreshToken);
          // 유저 아이디 요청 필요.
          /** @description User"Mock"Reopsitory */
          const userData = await service.user.getUserInfo('777');
          navigation.reset({
            routes: [{ name: 'Home', params: { userData } }],
          });
        } else {
          Alert.alert('올바른 인증번호를 입력해주세요.');
        }
      }
    } catch (error) {
      Alert.alert('인증번호 입력시간을 초과 했습니다.');
    }
  }

  return (
    <SafeAreaView style={styles.flexAlign}>
      {/* 메인 */}
      <Typography value="인증번호 입력" type="title" />
      <Typography value={phoneNum} type="subTitle" />
      <Timer setValidAuthCode={setValidAuthCode} />
      <PinInput
        setFilled={setFilled}
        setCorrect={setCorrect}
        authCode={validAuthCode}
      />
      {/* Bottom */}
      <View style={[{ justifyContent: 'space-around' }, styles.rowAlign]}>
        <View style={styles.spotlight}>
          <Text style={styles.spotlightTxt}>인증 문자가 오지 않나요?</Text>
        </View>
        <RoundBtn
          value="확인"
          disabled={!isFilled}
          onPress={handleAuthBtn}
          containerStyle={{ opacity: isFilled ? 1 : 0.3 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexAlign: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 30,
    marginBottom: 30,
  },
  page: {
    position: 'absolute',
    left: '46%',
    top: '5%',
  },
  beforeBtn: {
    position: 'absolute',
    left: 25,
    top: '5%',
  },

  timerStyle: {
    fontWeight: '500',
    color: '#FF787E',
    marginTop: 10,
  },

  spotlight: {
    backgroundColor: '#EAEAEA',
    width: 139,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  spotlightTxt: {
    color: '#777777',
    fontSize: 12,
    fontWeight: '700',
  },
});
export default Certification;
