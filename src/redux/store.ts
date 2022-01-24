import { combineReducers, createStore, Reducer, Store } from 'redux';
import { phoneNumReducer, PhoneNumState } from './modules/phoneNumInfo';
// reducers
import { userReducer, UserState } from './modules/userInfo';

const rootReducer: Reducer = combineReducers({
  user: userReducer,
  phoneNum: phoneNumReducer,
});

const store: Store = createStore(rootReducer);

// RootState type
// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = { user: UserState; phoneNum: PhoneNumState };

export default store;
