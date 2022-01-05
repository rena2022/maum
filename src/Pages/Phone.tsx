import React, { useRef, useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import RoundBtn from '../Components/RoundBtn';
import Typography from '../Components/Typography';

import DropDownPicker from 'react-native-dropdown-picker';
import DropDown from '../Components/DropDown';

const Phone = () => {
  const [inputs, setInputs] = useState({ phoneNum: '' });
  const inputRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '+82', value: 'kor' },
    { label: '+81', value: 'jp' },
    { label: '+1', value: 'en' },
  ]);

  const { phoneNum } = inputs;

  const onChange = e => {
    const { value, phoneNum } = e.target;
    setInputs({
      ...inputs,
      [phoneNum]: value,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
      }}>
      <View style={styles.marginStyle}>
        <Pressable>
          <Typography
            value="< 이전"
            TextStyle={{ color: '#007AFF' }}
            containerStyle={styles.before}
          />
        </Pressable>
        <Typography
          value="1 / 3"
          TextStyle={{ color: '#B6B9BF', fontWeight: '700' }}
          containerStyle={styles.page}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../Assets/Authorise/lock.png')}
          style={{
            width: 23.33,
            height: 31.67,
            marginTop: 21.17,
            marginBottom: 12.17,
          }}
        />
        <Typography value="전화번호 가입" type="title" />
        <Typography value="안심하세요! 번호는 암호화되며," type="subTitle" />
        <Typography value="절대 공개되지 않아요" type="subTitle" />

        
        <TextInput
          placeholder="전화번호"
          keyboardType="numeric"
          autoFocus={true}
          style={styles.inputBox}
          onChange={onChange}
          ref={inputRef}
        />

        <View style={styles.divider}></View>
      </View>

      <View style={styles.rightAlign}>
        <RoundBtn value="인증번호 받기" width={182} />
      </View>
      <DropDown />
    </View>
  );
};

const styles = StyleSheet.create({
  marginStyle: {
    marginTop: 47,
    marginBottom: 13,
  },
  rightAlign: {
    marginTop: 24,
    marginRight: 30,
    flex: 1,
    alignItems: 'flex-end',
  },
  before: {
    position: 'absolute',
    left: 25,
    top: '5%',
  },
  page: {
    position: 'absolute',
    left: '47%',
    top: '5%',
  },
  inputBox: {
    fontSize: 24,
    marginTop: 34,
    marginLeft: 14,
    width: 170,
    // position: 'absolute',
    // left: '30%',
    // right: '33.02%',
  },
  divider: {
    width: 315,
    height: 2,
    marginTop: 10,
    backgroundColor: '#FF787E',
  },
});

export default Phone;
