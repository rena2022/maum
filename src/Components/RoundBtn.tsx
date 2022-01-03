import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

// 컴포넌트 사용 예시
// <RoundBtn value={"다음"} width = {315} />

const RoundBtn = (props: any) => {
  const style1 = {
    height: 60,
    backgroundColor: '#FF787E',
    borderRadius: 30,
    width: props.width,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Pressable {...style1}>
      <Text style={styles.roundBtnText}>{props.value}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  roundBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
});

export default RoundBtn;
