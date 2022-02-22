import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { RootStackParamList } from '../../App';
import { i18n } from '../../i18n.cofig';
import RoundButton from '../Components/RoundButton';
import Typography from '../Components/Typography';
import { setUser } from '../redux/modules/userInfo';
import { service } from '../Services/index';
import { getToken } from '../Utils/keychain';
import { checkPermissions } from '../Utils/permissionCheck';
import TokenError from '../Utils/AxiosError';
import { IP } from '../Constants/keys';

type Props = NativeStackScreenProps<RootStackParamList, 'Language'>;
const Language = ({ navigation, route }: Props) => {
  const phoneNum = route.params['phoneNum'].split(' ')[1];
  const [selectLang, setSelect] = useState(false);
  const [isPressed, setPressed] = useState([false, false, false]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const changePressed = (lang: number) => {
    if (!isPressed[lang]) {
      if (!selectLang) {
        setSelect(true);
        const tempList = [...isPressed];
        tempList[lang] = true;
        setPressed(tempList);
      }
    }
    if (isPressed[lang]) {
      setSelect(false);
      const tempList = [...isPressed];
      tempList[lang] = false;
      setPressed(tempList);
    }
  };

  const getLang = () => {
    const languages = [];
    for (let i = 0; i < isPressed.length; i++) {
      isPressed[i] && languages.push(i);
    }
    return languages;
  };

  const MyPressable = (langNum: number, value: string) => {
    return (
      <Pressable style={styles.wrapLang} onPress={() => changePressed(langNum)}>
        {
          <Text
            style={{
              fontSize: 36,
              color: `${isPressed[langNum] ? '#FF787E' : '#D6D9DF'}`,
              fontWeight: 'bold',
            }}>
            {value}
          </Text>
        }
        {isPressed[langNum] && (
          <View style={styles.spotlight}>
            <Text style={styles.spotlightTxt}>1순위, 가장 능숙해요</Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.flexAlign}>
      <View style={{ alignItems: 'center', marginTop: 13 }}>
        <Typography value="LANGUAGE.title" type="title" />
        <View
          style={{
            width: 351,
            height: 58,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography value="LANGUAGE.subTitle" type="subTitle" />
        </View>
      </View>

      <View style={{ marginTop: 48 }}>
        {MyPressable(1, '한국어')}
        {MyPressable(0, 'English')}
        {MyPressable(2, '日本語')}
      </View>

      <RoundButton
        value="LANGUAGE.nextBtn"
        containerStyle={[{ opacity: selectLang ? 1 : 0.3 }, styles.wrapBtn]}
        disabled={!selectLang}
        isLoading={loading}
        onPress={async () => {
          try {
            setLoading(true);
            await service.auth.enrollUser(phoneNum, getLang());
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
            if (checkPermissionResult) {
              navigation.reset({
                routes: [{ name: 'Home' }],
              });
            } else {
              navigation.reset({ routes: [{ name: 'Permission' }] });
            }
          } catch (error: any) {
            setLoading(false);
            if (error.message == 'Network Error') {
              Alert.alert(i18n.t('PHONEALERT.network.discription'));
            } else if (error instanceof TokenError) {
              Alert.alert(i18n.t('LANGUAGE.timeOutAlert'), '', [
                {
                  text: 'OK',
                  onPress: () => {
                    setTimeout(() => {
                      // navigation.reset({ routes: [{ name: 'Onboarding' }] });
                    }, 200);
                  },
                },
              ]);
            } else {
              console.error(error);
            }
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexAlign: { flex: 1, flexDirection: 'column', backgroundColor: 'white' },
  wrapBtn: {
    position: 'absolute',
    right: 30,
    bottom: 50,
    alignItems: 'center',
  },

  wrapLang: {
    width: '100%',
    marginBottom: 24,
    marginLeft: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotlight: {
    backgroundColor: '#FAE7E9',
    width: 117,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  spotlightTxt: {
    color: '#FF787E',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default Language;
