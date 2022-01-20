import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeycodeInput } from 'react-native-keycode';

interface pinProps {
  setFilled: Dispatch<SetStateAction<boolean>>;
  setCorrect: Dispatch<SetStateAction<boolean>>;
  authCode: string;
}
const PinInput: React.FC<pinProps> = props => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (props.authCode != '') {
      setValue(props.authCode);
      props.setFilled(true);
      props.setCorrect(true);
    }
  }, []);

  return (
    <View>
      <KeycodeInput
        value={value}
        length={6}
        textColor="#333333"
        tintColor="#FF787E"
        numeric={true}
        onComplete={data => {
          // eslint-disable-next-line react/prop-types
          props.setFilled(true);
          if (data == props.authCode) {
            props.setCorrect(true);
          } else {
            props.setCorrect(false);
          }
        }}
        onChange={() => {
          props.setFilled(false);
        }}
        style={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 42,
  },
});
export default PinInput;
