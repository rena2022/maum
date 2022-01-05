import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native';
import DropDown from '../Components/DropDown';
import RoundBtn from '../Components/RoundBtn';
import Typography from '../Components/Typography';

const Phone = () => {
  const [input, setInput] = useState('');

  return (
    <View style={styles.centerAlign}>
      <View style={styles.rowAlign}>
        <Pressable>
          <Typography
            value="< 이전"
            TextStyle={{ color: '#007AFF' }}
            containerStyle={styles.beforeBtn}
          />
        </Pressable>
        <Typography
          value="1 / 3"
          textStyle={{ color: '#B6B9BF', fontWeight: '700' }}
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
          onChangeText={text => setInput(text)}
          value={input}
        />
        <View style={styles.divider}></View>
      </View>

      <View style={styles.rightAlign}>
        <RoundBtn
          value="인증번호 받기"
          containerStyle={{ width: 182 }}
          onPress={() => {
            return;
          }}
        />
      </View>
      <DropDown />
    </View>
  );
};

const styles = StyleSheet.create({
  centerAlign: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 47,
    marginBottom: 13,
  },

  beforeBtn: {
    position: 'absolute',
    left: 25,
    top: '5%',
  },
  page: {
    position: 'absolute',
    left: '46%',
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

  rightAlign: {
    marginTop: 24,
    marginRight: 30,
    alignItems: 'flex-end',
  },
});

export default Phone;
