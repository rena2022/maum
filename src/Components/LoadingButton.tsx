import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface LoadingBtnProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const LoadingButton: React.FC<LoadingBtnProps> = props => {
  return (
    <View style={[styles.btnContainer, props.containerStyle]}>
      <LottieView
        style={{
          backgroundColor: '#FF787E',
        }}
        autoSize={false}
        source={require('../Assets/Phone/loadingButton.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 182,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
});

export default LoadingButton;
123;
