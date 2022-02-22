import axios, { AxiosError } from 'axios';
import { axiosSrc } from '../../Constants/axiosSrc';
import { getToken, saveToken } from '../../Utils/keychain';
import TokenError from '../../Utils/AxiosError';
import { ServerError } from '../../Utils/AxiosError';
import { Alert } from 'react-native';
import { i18n } from '../../../i18n.cofig';

// verifyPhoneNum
export interface AuthPhone {
  authToken: string;
  authCode: string;
  message: string;
}

// checkUser
interface OriginUser {
  isExist: true;
  accessToken: string;
  refreshToken: string;
  message: string;
}

interface NewUser {
  isExist: false;
  registerToken: string;
  message: string;
}

type UserIdentifier = OriginUser | NewUser;

interface IsExist {
  isExist: boolean;
}

interface SignIn {
  isSignIn: true;
}

interface SignUp {
  isSignIn: false;
}

// enrollUser
export interface Enroll {
  accessToken: string;
  refreshToken: string;
  message: string;
  isExist: boolean;
}

export interface IAuthRepository {
  verifyPhoneNum(nationalCode: number, phoneNumber: string): Promise<AuthPhone>;
  checkUser(authCode: string, authToken: string): Promise<IsExist>;

  enrollUser(phoneNumber: string, language: Array<number>): Promise<Enroll>;
  verifyToken(refreshToken: string): Promise<void>;
}

class AuthRepository implements IAuthRepository {
  verifyPhoneNum(
    nationalCode: number,
    phoneNumber: string,
  ): Promise<AuthPhone> {
    const data = axios
      .get<AuthPhone>(axiosSrc.auth, {
        params: {
          nationalCode,
          phoneNumber,
        },
      })
      .then(async response => {
        await saveToken('authToken', response.data['authToken']);
        return response.data;
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          throw new TokenError('Invalid Token', status);
        }
        throw error;
      });
    return data;
  }

  async checkUser(authCode: string, authToken: string): Promise<IsExist> {
    const res = await axios
      .post<UserIdentifier>(
        axiosSrc.auth,
        {
          authCode,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      )
      .then(async res => {
        const isExist = res.data.isExist;
        if (!isExist) {
          await saveToken('registerToken', res.data.registerToken);
          return {
            isExist,
          };
        } else {
          await saveToken('accessToken', res.data.accessToken);
          await saveToken('refreshToken', res.data.refreshToken);
          return {
            isExist,
          };
        }
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          if (status == 500) {
            throw new ServerError('Server Eroor', status);
          } else if (axios.isAxiosError(error)) {
            throw new TokenError('Invalid Token');
          } else {
            throw error;
          }
        }
        throw error;
      });
    return res;
  }

  async enrollUser(
    phoneNumber: string,
    languages: Array<number>,
  ): Promise<Enroll | any> {
    try {
      const res = await axios.post(
        axiosSrc.user,
        {
          phoneNumber,
          languages,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken('registerToken')}`,
          },
        },
      );
      await saveToken('accessToken', res.data['accessToken']);
      await saveToken('refreshToken', res.data['refreshToken']);
      return res.data;
    } catch (error: any) {
      if (error.message == 'Network Error') {
        throw error;
      } else if (axios.isAxiosError(error)) {
        throw new TokenError('Invalid Token');
      } else {
        throw error;
      }
    }
  }

  async verifyToken(refreshToken: string): Promise<void> {
    try {
      const res = await axios.patch(axiosSrc.token, { refreshToken });
      await saveToken('accessToken', res.data.accessToken);
      await saveToken('refreshToken', res.data.refreshToken);
    } catch (error) {
      throw new TokenError('Invalid Token');
    }
  }
}

export default AuthRepository;
