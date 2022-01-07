import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';
import { i18n } from './i18n.cofig';
import Language from './src/Pages/Language';
import Onboarding from './src/Pages/Onboarding';

export type RootStackParamList = {
  Onboarding: undefined;
  Language: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Onboarding"
        screenOptions={options}>
        <RootStack.Screen name="Onboarding" component={Onboarding} />
        <RootStack.Screen name="Language" component={Language} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
