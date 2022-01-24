export interface PhoneNumState {
  nationalCode: number;
  phoneNumber: string;
}

// initial state
const initialState: PhoneNumState = {
  nationalCode: 82,
  phoneNumber: '',
};

// action
export const SET_PHONE_NUM = 'SET_PHONE_NUM';

export const setPhoneNum = (nationalCode: number, phoneNumber: string) => {
  return {
    type: SET_PHONE_NUM,
    nationalCode,
    phoneNumber,
  };
};

// reducer
export const phoneNumReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PHONE_NUM: {
      return {
        ...state,
        nationalCode: action.nationalCode,
        phoneNumber: action.phoneNumber,
      };
    }
    default:
      return state;
  }
};
