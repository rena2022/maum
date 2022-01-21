export interface UserState {
  nickName: string;
  profile: string;
}

// initial state
const initialState: UserState = {
  nickName: '',
  profile: '',
};

// action
export const SET_USER = 'SET_USER';

export const setUser = (nickName: string, profile: string) => {
  return {
    type: SET_USER,
    nickName,
    profile,
  };
};

// reducer
export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, nickName: action.nickName, profile: action.profile };
    }
    default:
      return state;
  }
};
