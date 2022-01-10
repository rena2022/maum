import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import Certification from './src/Pages/Certification';

import Language from './src/Pages/Language';
import Onboarding from './src/Pages/Onboarding';
import Permission from './src/Pages/Permission';
import Phone from './src/Pages/Phone';
import { useTranslation } from 'react-i18next';

export type RootStackParamList = {
  Onboarding: undefined;
  Phone: undefined;
  Certification: { phoneNum: string };
  Language: undefined;
  Permission: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const options: NativeStackNavigationOptions = {
  headerShown: false,
  headerTitleStyle: { fontSize: 16, fontWeight: '700', color: '#B6B9BF' },
};

const App = () => {
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Onboarding"
        screenOptions={options}>
        <RootStack.Screen name="Onboarding" component={Onboarding} />
        <RootStack.Screen
          name="Phone"
          component={Phone}
          options={{
            headerShown: true,
            title: '1 / 3',
            headerBackTitle: t('backBtnText'),
          }}
        />
        <RootStack.Screen
          name="Certification"
          options={{
            headerShown: true,
            title: '1 / 3',
            headerBackTitle: t('backBtnText'),
          }}>
          {props => <Certification {...props} />}
        </RootStack.Screen>
        <RootStack.Screen
          name="Language"
          component={Language}
          options={{
            headerShown: true,
            title: '2 / 3',
            headerBackVisible: false,
          }}
        />
        <RootStack.Screen name="Permission" component={Permission} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
