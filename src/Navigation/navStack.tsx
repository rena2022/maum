import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type SignStackParamList = {
  Onboarding: undefined;
  Phone: undefined;
  Certification: { phoneNum: string; authCode: string };
  Language: { phoneNum: string };
};

type MainStackParamList = {
  Home: undefined;
};

const SignStack = createNativeStackNavigator<SignStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

function Main() {
  return (
    <SignStack.Navigator>
      <SignStack.Screen name="Onboarding" component={Onboarding} />
      <SignStack.Screen
        name="Phone"
        component={Phone}
        options={{
          headerShown: true,
          title: '1 / 3',
          headerBackTitle: t('backBtnText'),
        }}
      />
      <SignStack.Screen
        name="Certification"
        options={{
          headerShown: true,
          title: '1 / 3',
          headerBackTitle: t('backBtnText'),
        }}>
        {props => <Certification {...props} />}
      </SignStack.Screen>
      <SignStack.Screen
        name="Language"
        component={Language}
        options={{
          headerShown: true,
          title: '2 / 3',
          headerBackVisible: false,
        }}
      />
    </SignStack.Navigator>
  );
}
