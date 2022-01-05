import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Typography from '../Components/Typography';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Timer from '../Components/Timer';

const Certification = () => {
  return (
    <View style={styles.flexAlign}>
      {/* 헤더 */}
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
          TextStyle={{ color: '#B6B9BF', fontWeight: '700' }}
          containerStyle={styles.page}
        />
      </View>
      {/* 메인 */}
      <Typography value="인증번호 입력" type="title" />
      <Typography value="전화번호" type="subTitle" />
      <Timer/>
    </View>
  );
};

const styles = StyleSheet.create({
  flexAlign: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 47,
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
});
export default Certification;
