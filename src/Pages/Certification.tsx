import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../App';
import PinInput from '../Components/PinInput';
import RoundBtn from '../Components/RoundBtn';
import Timer from '../Components/Timer';
import Typography from '../Components/Typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Certification'>;

const Certification = ({ navigation, route }: Props) => {
  const [isFilled, setFilled] = useState(false);
  const [isCorrect, setCorrect] = useState(false);
  const { phoneNum, authCode } = route.params;

  return (
    <SafeAreaView style={styles.flexAlign}>
      {/* 메인 */}
      <Typography value="인증번호 입력" type="title" />
      <Typography value={phoneNum} type="subTitle" />
      <Timer />
      <PinInput
        setFilled={setFilled}
        setCorrect={setCorrect}
        authCode={authCode}
      />
      {/* Bottom */}
      <View style={[{ justifyContent: 'space-around' }, styles.rowAlign]}>
        <View style={styles.spotlight}>
          <Text style={styles.spotlightTxt}>인증 문자가 오지 않나요?</Text>
        </View>
        <RoundBtn
          value="확인"
          disabled={!isFilled}
          onPress={() => {
            // 인증번호 검사
            isCorrect
              ? navigation.reset({ routes: [{ name: 'Language' }] })
              : Alert.alert('올바른 인증번호를 입력해주세요.');
          }}
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
