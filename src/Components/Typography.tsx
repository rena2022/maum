import React from 'react';
import { ViewPropTypes } from 'react-native';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

// 사용 예시
// <TextStyle value={'언어 선택'} fontSize={30} color={'#FF787E'} weight={'700'}/>

interface TypographyProps {
  value: string;
  type?: 'default' | 'title' | 'subTitle';
  containerStyle?: StyleProp<ViewStyle>;
  TextStyle?: StyleProp<TextStyle>;
}

const Typography: React.FC<TypographyProps> = props => {
  const { type = 'default', value = '', containerStyle, TextStyle } = props;

  let myStyle;

  if (props.type == 'default') {
    myStyle = styles.default;
  } else if (props.type == 'title') {
    myStyle = styles.title;
  } else if (props.type == 'subTitle') {
    myStyle = styles.subTitle;
  }

  return (
    <Text style={[myStyle, props.containerStyle, props.TextStyle]}>
      {props.value}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    color: '##333333',
    fontWeight: '400',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    color: '#333333',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: 2,
  },
  subTitle: {
    fontSize: 18,
    color: '#999999',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 29,
  },
});

export default Typography;
