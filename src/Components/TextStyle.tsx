import React from 'react';
import { StyleSheet, Text } from 'react-native';

// 사용 예시
// <TextStyle value={'언어 선택'} fontSize={30} color={'#FF787E'} weight={'700'}/>

const TextStyle = (props: any) => {
  return (
    <Text
      style={{
        fontWeight: props.weight,
        fontSize: props.fontSize,
        color: props.color,
      }}>
      {props.value}
    </Text>
  );
};

export default TextStyle;
