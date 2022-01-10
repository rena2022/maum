import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { RootStackParamList } from '../../App';
import DropDown from '../Components/DropDown';
import RoundBtn from '../Components/RoundBtn';
import Typography from '../Components/Typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Phone'>;

const Phone = ({ navigation }: Props) => {
  const [input, setInput] = useState('');
  const [isFocus, setFocus] = useState(false);

  const [nation, setNation] = useState('+82');
  const getNation = (n: string) => {
    setNation(n);
  };

  return (
    <SafeAreaView style={styles.flexAlign}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../Assets/Authorise/lock.png')}
          style={styles.imgStyle}
        />
        <Typography value="전화번호 가입" type="title" />
        <Typography value="안심하세요! 번호는 암호화되며," type="subTitle" />
        <Typography value="절대 공개되지 않아요" type="subTitle" />
        <View style={[styles.tempStyle, { zIndex: 2 }]}>
          <DropDown getNation={getNation} />
          <TextInput
            placeholder="전화번호"
            keyboardType="numeric"
            autoFocus={true}
            style={styles.inputBox}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChangeText={text => setInput(text)}
            value={input}
          />
        </View>

        <View
          style={{
            width: 315,
            height: 2,
            marginTop: 10,
            backgroundColor: isFocus ? '#FF787E' : '#D6D9DF',
          }}
        />
      </View>

      {/* <View style={[styles.rightAlign, { zIndex: 1 }]}> */}
      <RoundBtn
        value="인증번호 받기"
        containerStyle={{
          width: 182,
          opacity: input == '' ? 0.3 : 1,
          marginTop: 24,
          marginLeft: 180,
        }}
        onPress={() => {
          const fullNum = nation + ' ' + input;
          console.log(fullNum);

          navigation.navigate('Certification', { phoneNum: fullNum });
        }}
        disabled={input == ''}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexAlign: {
    flex: 1,
    flexDirection: 'column',
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
  divider: {
    width: 315,
    height: 2,
    marginTop: 10,
    backgroundColor: '#FF787E',
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
});

export default Phone;
