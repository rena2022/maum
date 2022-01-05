import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '+82', value: 'kor' },
    { label: '+81', value: 'jp' },
    { label: '+1', value: 'en' },
  ]);
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      closeAfterSelecting={true}
      placeholder="국가"
      categorySelectable={true}
      stickyHeader={true}
      style={{
        backgroundColor: '#00ff0000',
        width: 85,
        borderColor: '#00ff0000',
        marginLeft: 30,
      }}
      textStyle={{
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 18,
      }}
      containerStyle={{
        width: 85,
        position: 'absolute',
        left: '0%',
        height: 17,
        top: '29.5%',
      }}
    />
  );
};

export default DropDown;
