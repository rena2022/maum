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
import RoundBtn from '../Components/RoundBtn';
import Typography from '../Components/Typography';
import { setUser } from '../redux/modules/userInfo';
import { service } from '../Services/index';
import { checkPermissions } from '../Utils/permissionCheck';
import TokenError from '../Utils/TokenError';

type Props = NativeStackScreenProps<RootStackParamList, 'Language'>;
const Language = ({ navigation, route }: Props) => {
  const phoneNum = route.params['phoneNum'].split(' ')[1];
  const [selectLang, setSelect] = useState(false);
  const [isPressed, setPressed] = useState([false, false, false]);
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
        <Typography value="언어 선택" type="title" />
        <View
          style={{
            width: 351,
            height: 58,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography value="가능한 언어를 모두 선택하세요" type="subTitle" />
          <Typography value="선택한 언어의 친구와 연결돼요" type="subTitle" />
        </View>
      </View>

      <View style={{ marginTop: 48 }}>
        {MyPressable(1, '한국어')}
        {MyPressable(0, 'English')}
        {MyPressable(2, '日本語')}
      </View>

      <RoundBtn
        value="다음"
        containerStyle={[{ opacity: selectLang ? 1 : 0.3 }, styles.wrapBtn]}
        disabled={!selectLang}
        onPress={async () => {
          try {
            const data = await service.auth.enrollUser(phoneNum, getLang());
            // getUserInfo(data.accessToken);
            const userInfo = await service.user.getUserInfo('123');
            dispatch(setUser(userInfo.nickName, userInfo.profileImg));
            const checkPermissionResult = await checkPermissions();
            if (checkPermissionResult) {
              navigation.reset({
                routes: [{ name: 'Home' }],
              });
            } else {
              navigation.reset({ routes: [{ name: 'Permission' }] });
            }
          } catch (error) {
            if (error instanceof TokenError) {
              Alert.alert('입력시간을 초과 했습니다.\n다시 시도해주세요.', '', [
                {
                  text: 'OK',
                  onPress: () => {
                    setTimeout(() => {
                      navigation.reset({ routes: [{ name: 'Onboarding' }] });
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
