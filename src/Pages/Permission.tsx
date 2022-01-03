import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Permission = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={textStyle.headerText}>
          마지막! 꼭 필요한{'\n'}
          권한을 허용해 주세요 😉
        </Text>
      </View>
      <View style={styles.contents}>
        <View style={styles.authContent}>
          <View style={styles.authImogeBack}>
            <Text style={textStyle.authImogeText}>🎙</Text>
          </View>
          <View style={styles.authDetailBack}>
            <Text style={textStyle.authTitleText}>마이크 (필수)</Text>
            <Text style={textStyle.authDescriptionText}>친구와 통화 연결</Text>
          </View>
        </View>
        <View style={styles.authContent}>
          <View style={styles.authImogeBack}>
            <Text style={textStyle.authImogeText}>📍</Text>
          </View>
          <View style={styles.authDetailBack}>
            <Text style={textStyle.authTitleText}>위치 정보 (필수)</Text>
            <Text style={textStyle.authDescriptionText}>
              원하는 나라의 친구 매칭
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Pressable style={styles.checkBtn}>
          <Text style={textStyle.checkBtnText}>확인</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Permission;

const textStyle = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  authImogeText: {
    marginHorizontal: 'auto',
    marginVertical: 0,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    borderRadius: 20,
  },
  authTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  authDescriptionText: {
    fontSize: 14,
    color: '#888888',
  },
  checkBtnText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: '8%',
  },
  contents: {
    justifyContent: 'center',
  },
  authContent: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  authImogeBack: {
    width: 60,
    height: 60,
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
  },
  authDetailBack: {
    marginLeft: 24,
  },
  checkBtn: {
    width: '100%',
    backgroundColor: '#ff787e',
    borderRadius: 30,
    marginBottom: 16,
    paddingVertical: 20,
  },
});
