import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { service } from '../Services/index';
import Typography from './Typography';

interface TimerProps {
  setValidAuthCode: Dispatch<SetStateAction<string>>;
}

const Timer: React.FC<TimerProps> = props => {
  const reduxState = useSelector((state: RootState) => state);
  const timerId = useRef<NodeJS.Timer | null>(null);
  const [count, setCount] = useState(3);

  // 01, 02 등 두 자리 수 반환 함수
  function numberPad(n: number, width: number) {
    const num = n + '';
    return num.length >= width
      ? num
      : new Array(width - num.length + 1).join('0') + num;
  }

  async function handleResendText() {
    // 인증코드 재요청
    const nationalCode = reduxState.phoneNum.nationalCode;
    const phoneNumber = reduxState.phoneNum.phoneNumber;

    const data = await service.auth.verifyPhoneNum(nationalCode, phoneNumber);
    if (data) {
      // 인증코드 수정
      props.setValidAuthCode(data.authCode);
      setCount(3);
    }
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
      <Pressable onPress={handleResendText}>
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
