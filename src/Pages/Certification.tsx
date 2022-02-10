import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../App';
import { i18n } from '../../i18n.cofig';
import PinInput from '../Components/PinInput';
import RoundButton from '../Components/RoundButton';
import Timer from '../Components/Timer';
import Typography from '../Components/Typography';
import { setUser } from '../redux/modules/userInfo';
import { service } from '../Services/index';
import { getToken } from '../Utils/keychain';
import { checkPermissions } from '../Utils/permissionCheck';
import TokenError, { NotFoundError } from '../Utils/ClientError';
import { RootState } from '../redux/store';

type Props = NativeStackScreenProps<RootStackParamList, 'Certification'>;

const Certification = ({ navigation, route }: Props) => {
  const [isFilled, setFilled] = useState(false);
  const [isCorrect, setCorrect] = useState(false);
  const { phoneNum, authCode } = route.params;
  const [validAuthCode, setValidAuthCode] = useState(authCode);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const reduxState = useSelector((state: RootState) => state);
  async function handleAuthBtn() {
    try {
      setLoading(true);
      const authToken = await getToken('authToken');

      if (isCorrect) {
        const res = await service.auth.authRepository.checkUser(
          validAuthCode,
          authToken!,
        );
        if (!res.isSignIn) {
          navigation.reset({
            routes: [{ name: 'Language', params: { phoneNum } }],
          });
        } else {
          const accessToken = await getToken('accessToken');
          const userInfo = await service.user.getUserInfo(accessToken!);
          dispatch(setUser(userInfo.nickName, 'http://' + userInfo.image));

          const checkPermissionResult = await checkPermissions();

          if (!checkPermissionResult) {
            navigation.reset({
              routes: [{ name: 'Permission' }],
            });
          } else {
            navigation.reset({
              routes: [{ name: 'Home' }],
            });
          }
        }
      } else {
        Alert.alert('올바른 인증번호를 입력해주세요.');
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        Alert.alert('페이지를 찾을 수 없습니다.');
      } else if (error instanceof TokenError) {
        Alert.alert('인증번호 입력시간을 초과 했습니다.');
      } else {
        Alert.alert('잠시 후 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.flexAlign}>
      {/* 메인 */}
      <Typography value="CERTIFICATION.title" type="title" />
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
          <Text style={styles.spotlightTxt}>
            {i18n.t('CERTIFICATION.info')}
          </Text>
        </View>
        <RoundButton
          value="CERTIFICATION.nextBtn"
          disabled={!isFilled}
          isLoading={loading}
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
