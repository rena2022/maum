import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

// 사용 예시
// <TextStyle value='언어 선택' type='default' />

interface TypographyProps {
  value: string;
  type?: 'default' | 'title' | 'subTitle';
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Typography: React.FC<TypographyProps> = props => {
  const { type = 'default', value, containerStyle, textStyle } = props;
  const { t } = useTranslation();

  let myStyle;

  if (type == 'default') {
    myStyle = styles.default;
  } else if (type == 'title') {
    myStyle = styles.title;
  } else if (type == 'subTitle') {
    myStyle = styles.subTitle;
  }

  return <Text style={[myStyle, containerStyle, textStyle]}>{t(value)}</Text>;
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
