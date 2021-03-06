import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { IP } from './src/Constants/keys';
import Call from './src/Pages/Call';
import Calling from './src/Pages/Calling/Calling';
import Certification from './src/Pages/Certification/Certification';
import Home from './src/Pages/Home';
import Language from './src/Pages/Language';
import Onboarding from './src/Pages/Onboarding';
import Permission from './src/Pages/Permission';
import Phone from './src/Pages/Phone';
import { setUser } from './src/redux/modules/userInfo';
import store from './src/redux/store';
import { service } from './src/Services/index';
import TokenError from './src/Utils/AxiosError';
import { getToken } from './src/Utils/keychain';
import { checkPermissions } from './src/Utils/permissionCheck';

export type RootStackParamList = {
  Onboarding: undefined;
  Phone: undefined;
  Certification: { phoneNum: string; authCode: string };
  Language: { phoneNum: string };
  Permission: undefined;
  Home: undefined;
  Call: { userInfo: object };
  Calling: { socket: SocketIOClient.Socket; userInfo: string };
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
        const accessToken = await getToken('accessToken');
        const refreshToken = await getToken('refreshToken');
        if (accessToken && refreshToken) {
          await service.auth.verifyToken(refreshToken);
          const newAccessToken = await getToken('accessToken');
          const userInfo = await service.user.getUserInfo(newAccessToken!);
          store.dispatch(
            setUser(
              userInfo.nickName,
              userInfo.image.replace('localhost', `http://${IP}`),
            ),
          );

          const checkPermissionResult = await checkPermissions();
          if (!checkPermissionResult) {
            setInitialRouteName('Permission');
          } else {
            setInitialRouteName('Home');
          }
        } else {
          setInitialRouteName('Onboarding');
        }
      } catch (error) {
        if (error instanceof TokenError) {
          (function errorHandler() {
            setInitialRouteName('Onboarding');
          })();
        } else {
          console.error(error);
        }
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
                  headerBackTitle: t('NAVIGATION.back'),
                }}
              />
              <RootStack.Screen
                name="Certification"
                options={{
                  headerShown: true,
                  title: '1 / 3',
                  headerBackTitle: t('NAVIGATION.back'),
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
              <RootStack.Screen name="Call" component={Call} />
              <RootStack.Screen name="Calling" component={Calling} />
            </RootStack.Navigator>
          </NavigationContainer>
        )}
      </StoreProvider>
    </>
  );
};

export default App;
