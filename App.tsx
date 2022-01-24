import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Certification from './src/Pages/Certification';
import Home from './src/Pages/Home';
import Language from './src/Pages/Language';
import Onboarding from './src/Pages/Onboarding';
import Permission from './src/Pages/Permission';
import Phone from './src/Pages/Phone';
import { service } from './src/Services/index';
import { checkPermissions } from './src/Utils/permissionCheck';

// redux
import { Provider as StoreProvider } from 'react-redux';
import store from './src/redux/store';
export type RootStackParamList = {
  Onboarding: undefined;
  Phone: undefined;
  Certification: { phoneNum: string; authCode: string };
  Language: { phoneNum: string };
  Permission: undefined;
  Home: undefined;
};

type InitialRouteName = 'Onboarding' | 'Permission' | 'Home';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const options: NativeStackNavigationOptions = {
  headerShown: false,
  headerTitleStyle: { fontSize: 16, fontWeight: '700', color: '#B6B9BF' },
  headerTransparent: false,
  headerTitleAlign: 'center',
  headerLargeTitleShadowVisible: false,
  headerShadowVisible: false,
};

const App = () => {
  const { t } = useTranslation();
  const [initialRouteName, setInitialRouteName] = useState<InitialRouteName>();

  useEffect(() => {
    async function checkUserInfo() {
      try {
        // const accessToken = await getToken("accessToken");
        // const refreshToken = await getToken("refreshToken");
        const accessToken = undefined;
        const refreshToken = 'abc';
        if (accessToken && refreshToken) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            await service.auth.verifyToken(accessToken, refreshToken);
          const checkPermissionResult = await checkPermissions();
          console.log(checkPermissionResult);
          if (!checkPermissionResult) {
            setInitialRouteName('Permission');
          } else {
            setInitialRouteName('Home');
          }
          // await resetToken('accessToken');
          // await resetToken('refreshToken');
          // await saveToken('accessToken', newAccessToken);
          // await saveToken('refreshToken', newRefreshToken);
        } else {
          setInitialRouteName('Onboarding');
        }
      } catch (error) {
        // 토큰 에러(서버 에러)
        (function errorHandler() {
          console.log(error);
          setInitialRouteName('Onboarding');
        })();
      }
    }
    checkUserInfo();
  }, []);

  return (
    <>
      <StoreProvider store={store}>
        {initialRouteName && (
          <NavigationContainer>
            <RootStack.Navigator
              initialRouteName={initialRouteName}
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
              <RootStack.Screen name="Home" component={Home} />
            </RootStack.Navigator>
          </NavigationContainer>
        )}
      </StoreProvider>
    </>
  );
};

export default App;
