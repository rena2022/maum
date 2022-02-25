import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, Platform, Alert } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

interface TimerProps {
  handleDisconnection: () => void;
}
const Timer: React.FC<TimerProps> = props => {
  const timerId = useRef<any>(null);
  const [count, setCount] = useState(0);

  // 01, 02 등 두 자리 수 반환 함수
  function numberPad(n: number, width: number) {
    const num = n + '';
    return num.length >= width
      ? num
      : new Array(width - num.length + 1).join('0') + num;
  }

  useEffect(() => {
    if (count < 540) {
      timerId.current = BackgroundTimer.setTimeout(() => {
        setCount(count => count + 1);
      }, 1000);
    }

    return () => {
      timerId.current && BackgroundTimer.clearInterval(timerId.current);
    };
  }, [count]);

  return (
    <Text style={styles.timerStyle}>
      {'♥ ' +
        numberPad(Math.floor(count / 60), 2) +
        ':' +
        numberPad(Math.floor(count % 60), 2)}
    </Text>
  );
};

const styles = StyleSheet.create({
  timerStyle: {
    fontSize: 12,
    color: '#FF787E',
    fontWeight: '700',
    lineHeight: 19,
  },
});

export default Timer;
