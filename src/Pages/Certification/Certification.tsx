import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { t } from 'i18next';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import { i18n } from '../../../i18n.cofig';
import RoundButton from '../../Components/RoundButton';
import Typography from '../../Components/Typography';
import { IP } from '../../Constants/keys';
import { setUser } from '../../redux/modules/userInfo';
import { RootState } from '../../redux/store';
import { service } from '../../Services/index';
import TokenError, { NotFoundError } from '../../Utils/ClientError';
import { getToken } from '../../Utils/keychain';
import { checkPermissions } from '../../Utils/permissionCheck';
import PinInput from './PinInput';
import TimerDown from './TimerDown';

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
          setLoading(false);
          navigation.reset({
            routes: [{ name: 'Language', params: { phoneNum } }],
          });
        } else {
          const accessToken = await getToken('accessToken');
          const userInfo = await service.user.getUserInfo(accessToken!);
          dispatch(
            setUser(
              userInfo.nickName,
              userInfo.image.replace('localhost', `http://${IP}`),
            ),
          );
          const checkPermissionResult = await checkPermissions();
          setLoading(false);
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
        Alert.alert(t('CERTIFICATIONALERT.incorrect'));
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        Alert.alert(t('CERTIFICATIONALERT.error.page'));
      } else if (error instanceof TokenError) {
        Alert.alert(t('CERTIFICATIONALERT.error.timeout'));
      } else {
        Alert.alert(t('CERTIFICATIONALERT.erro.server'));
      }
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.flexAlign}>
      {/* 메인 */}
      <Typography value="CERTIFICATION.title" type="title" />
      <Typography value={phoneNum} type="subTitle" />
      <TimerDown setValidAuthCode={setValidAuthCode} />
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
