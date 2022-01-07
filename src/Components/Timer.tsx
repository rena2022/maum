import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Typography from './Typography';

const Timer = () => {
  const timerId = useRef<NodeJS.Timer | null>(null);
  const [count, setCount] = useState(180);

  // 01, 02 등 두 자리 수 반환 함수
  function numberPad(n: number, width: number) {
    const num = n + '';
    return num.length >= width
      ? num
      : new Array(width - num.length + 1).join('0') + num;
  }

  useEffect(() => {
    if (count > 0) {
      timerId.current = setTimeout(() => {
        setCount(count => count - 1);
      }, 1000);
    }

    return () => {
      timerId.current && clearInterval(timerId.current);
    };
  }, [count]);

  useEffect(() => {
    // 만약 타임 아웃이 발생했을 경우
    if (count < 0) {
      timerId.current && clearInterval(timerId.current);
    }
  }, [count]);

  if (count <= 0) {
    return (
      <Pressable onPress={() => setCount(180)}>
        <Typography value="인증 문자 다시 받기" textStyle={styles.mmsStyle} />
      </Pressable>
    );
  } else {
    return (
      <Text style={styles.timerStyle}>
        {numberPad(Math.floor(count / 60), 2)} :{' '}
        {numberPad(Math.floor(count % 60), 2)}
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  timerStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF787E',
    textAlign: 'center',
    marginTop: 10,
  },
  mmsStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Timer;
