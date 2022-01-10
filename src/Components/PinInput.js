import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { KeycodeInput } from 'react-native-keycode';

const PinInput = props => {
  const [value, setValue] = useState('');
  const [myValue, getValue] = useState('');

  return (
    <KeycodeInput
      value={myValue == '' ? value : myValue}
      length={6}
      textColor="#333333"
      tintColor="#FF787E"
      onChange={newValue => {
        setValue(newValue);
        // value.length == 5 ? props.setFilled(true) : props.setFilled(false);
        props.setFilled(false);
      }}
      onComplete={completedValue => {
        props.setFilled(true);
      }}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 42,
  },
});
export default PinInput;
