import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Typography from './Typography';

interface CustomHeaderProps {
  isBack?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = props => {
  const { isBack = false } = props;
  return (
    <View style={styles.rowAlign}>
      {isBack && (
        <View style={styles.backContainer}>
          <Pressable>
            <Image
              source={require('../Assets/Authorise/BackBtn.png')}
              style={styles.imgStyle}
            />
            <Typography
              value="이전"
              textStyle={{ color: '#007AFF', fontWeight: '700' }}
              containerStyle={styles.beforeBtn}
            />
          </Pressable>
        </View>
      )}
      <Typography
        value="1 / 3"
        textStyle={{ color: '#B6B9BF', fontWeight: '700' }}
        containerStyle={styles.page}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowAlign: { marginTop: 50, marginBottom: 21.57 },
  backContainer: { marginLeft: 18, justifyContent: 'center' },
  imgStyle: { width: 8, height: 16 },
  beforeBtn: { position: 'absolute', left: 25, top: '5%', width: 30 },
  page: { position: 'absolute', left: '46%', top: '5%' },
});

export default CustomHeader;
