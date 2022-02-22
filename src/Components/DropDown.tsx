import React, { useState } from 'react';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';

interface DropdownProps {
  getNation: (n: number) => void;
}

const DropDown: React.FC<DropdownProps> = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ValueType | null>(null);
  const [items, setItems] = useState([
    { label: '+82', value: 'KO', index: 1 },
    { label: '+81', value: 'JP', index: 2 },
    { label: '+1', value: 'EN', index: 0 },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      placeholder={items[0].label}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onSelectItem={item => {
        const label = Number(item['label']?.slice(1, 3));
        props.getNation(label);
      }}
      closeAfterSelecting={true}
      stickyHeader={true}
      style={{
        backgroundColor: '#00ff0000',
        width: 90,
        borderColor: '#00ff0000',
        marginLeft: 30,
        paddingVertical: 10,
      }}
      textStyle={{
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 20,
      }}
      containerStyle={{
        width: 95,
        height: 8,
        marginRight: 14,
        zIndex: 3,
      }}
    />
  );
};

export default DropDown;
