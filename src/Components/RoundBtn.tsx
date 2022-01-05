import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Typography from './Typography';

// 컴포넌트 사용 예시
// <RoundBtn value='다음' onPress={()=>{}}/>

interface RoudnBtnProps {
  value: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const RoundBtn: React.FC<RoudnBtnProps> = props => {
  const { value, onPress, containerStyle, textStyle } = props;
  return (
    <Pressable
      onPress={onPress}
      style={[styles.roundBtn, containerStyle, textStyle]}>
      <Typography value={value} textStyle={styles.roundBtnText} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  roundBtn: {
    height: 60,
    backgroundColor: '#FF787E',
    borderRadius: 30,
    width: 107,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
});

export default RoundBtn;
