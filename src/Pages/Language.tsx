import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Typography from '../Components/Typography';

const Language = () => {
  const [selectLang, setSelect] = useState(false);
  const [isPressed, setPressed] = useState([false, false, false]);

  const changePressed = (lang: number) => {
    if (isPressed[lang] == false) {
      if (selectLang == false) {
        setSelect(true);

        const tempList = [...isPressed];
        tempList[lang] = true;

        setPressed(tempList);
      }
    }
    if (isPressed[lang] == true) {
      setSelect(false);
      const tempList = [...isPressed];
      tempList[lang] = false;
      setPressed(tempList);
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{ alignItems: 'center', marginTop: 47 }}>
        <Typography
          value="2 / 3"
          textStyle={{ fontWeight: '700', color: '#D6D9DF', fontSize: 16 }}
        />
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
        <Pressable style={styles.wrapLang} onPress={() => changePressed(0)}>
          {
            <Text
              style={{
                fontSize: 36,
                color: `${isPressed[0] ? '#FF787E' : '#D6D9DF'}`,
                fontWeight: 'bold',
              }}>
              한국어
            </Text>
          }
          {isPressed[0] && (
            <View style={styles.spotlight}>
              <Text style={styles.spotlightTxt}>1순위, 가장 능숙해요</Text>
            </View>
          )}
        </Pressable>
        <Pressable style={styles.wrapLang} onPress={() => changePressed(1)}>
          {
            <Text
              style={{
                fontSize: 36,
                color: `${isPressed[1] ? '#FF787E' : '#D6D9DF'}`,
                fontWeight: 'bold',
              }}>
              영어
            </Text>
          }
          {isPressed[1] && (
            <View style={styles.spotlight}>
              <Text style={styles.spotlightTxt}>1순위, 가장 능숙해요</Text>
            </View>
          )}
        </Pressable>

        <Pressable style={styles.wrapLang} onPress={() => changePressed(2)}>
          {
            <Text
              style={{
                fontSize: 36,
                color: `${isPressed[2] ? '#FF787E' : '#D6D9DF'}`,
                fontWeight: 'bold',
              }}>
              日本語
            </Text>
          }
          {isPressed[2] && (
            <View style={styles.spotlight}>
              <Text style={styles.spotlightTxt}>1순위, 가장 능숙해요</Text>
            </View>
          )}
        </Pressable>
      </View>

      <View style={styles.wrapBtn}>
        <Pressable
          style={() => [{ opacity: selectLang ? 1 : 0.3 }, styles.roundBtn]}>
          <Text style={styles.roundBtnText}>다음</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapLang: {
    width: '100%',
    marginBottom: 24,
    marginLeft: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  wrapBtn: {
    position: 'absolute',
    right: 30,
    bottom: 50,
    alignItems: 'center',
  },

  roundBtn: {
    width: 106,
    height: 60,
    backgroundColor: '#FF787E',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  roundBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
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
