import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { i18n } from '../../i18n.cofig';
import Typography from './Typography';

interface AuthContentProps {
  authImogeText: string;
  authTitleText: string;
  authDescriptionText: string;
}

const AuthContent: React.FC<AuthContentProps> = props => {
  return (
    <View style={styles.authContent}>
      <View style={styles.authImogeBack}>
        <Text style={textStyle.authImogeText}>{props.authImogeText}</Text>
      </View>
      <View style={styles.authDetailBack}>
        <Typography
          value={`${props.authTitleText} (${i18n.t('PERMISSION.important')})`}
          textStyle={textStyle.authTitleText}
        />
        <Typography
          value={props.authDescriptionText}
          textStyle={textStyle.authDescriptionText}
        />
      </View>
    </View>
  );
};

export default AuthContent;

const textStyle = StyleSheet.create({
  authImogeText: {
    marginHorizontal: 'auto',
    marginVertical: 0,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    borderRadius: 20,
  },
  authTitleText: {
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'left',
  },
  authDescriptionText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'left',
  },
});

const styles = StyleSheet.create({
  authContent: {
    flexDirection: 'row',
    marginBottom: 32,
    marginLeft: '8%',
  },
  authImogeBack: {
    width: 60,
    height: 60,
    backgroundColor: '#F4F4F4',
    borderRadius: 20,
    justifyContent: 'center',
  },
  authDetailBack: {
    marginLeft: 24,
    justifyContent: 'space-evenly',
  },
});
