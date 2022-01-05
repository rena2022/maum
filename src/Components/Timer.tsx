import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';

const Timer = () => {
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180);
  const timerId = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(Math.floor(time.current / 60));
      setSec(Math.floor(time.current % 60));
      time.current -= 1;
    }, 1000);

    return () => {
      timerId.current && clearInterval(timerId.current);
    };
  }, []);

  useEffect(() => {
    // 만약 타임 아웃이 발생했을 경우
    if (time.current < 0) {
      console.log('타임 아웃');
      timerId.current && clearInterval(timerId.current);
      // dispatch event
    }
  }, [sec]);

  return (
    <Text>
      {min} 분 {sec} 초
    </Text>
  );
};

export default Timer;
