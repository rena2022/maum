import axios, { AxiosError } from 'axios';
import { NativeModules } from 'react-native';
import PhoneAlert from '../../Utils/PhoneAlert';

// verifyPhoneNum
export interface AuthPhone {
  authToken: string;
  authCode: string;
  message: string;
}

// checkUser
interface OriginUser {
  accessToken: string;
  message: string;
  refreshToken: string;
}

interface NewUser {
  authToken: string;
  message: number;
}

export interface SignUp {
  type: 'new';
  authToken: string;
}

export interface SignIn {
  type: 'origin';
  accessToken: string;
  refreshToken: string;
}

type UserIdentifier = OriginUser | NewUser;

// enrollUser
export interface Enroll {
  accessToken: string;
  refreshToken: string;
}

//verfiyToken
export interface NewToken {
  isValid: boolean;
  accessToken: string;
}

export interface IAuthRepository {
  verifyPhoneNum(nationalCode: number, phoneNumber: string): Promise<AuthPhone>;
  checkUser(authCode: string, authToken: string): Promise<SignIn | SignUp>;
  enrollUser(tempToken: string, language: string): Promise<Enroll>;
  verifyToken(accessToken: string, refreshToken: string): Promise<NewToken>;
}

class AuthRepository implements IAuthRepository {
  async verifyPhoneNum(
    nationalCode: number,
    phoneNumber: string,
  ): Promise<AuthPhone> {
    const data = await axios
      .get('http://localhost:8080/v1/auth', {
        params: {
          nationalCode,
          phoneNumber,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        const status = error.response.status;
        PhoneAlert(status);
        return false;
      });
    return data;
  }

  async checkUser(
    authCode: string,
    authToken: string,
  ): Promise<SignIn | SignUp> {
    try {
      const url = 'http://localhost:8080/v1/auth';
      const res = await axios.post<UserIdentifier>(
        url,
        {
          authCode,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      );
      const userIdentifier = res.data;
      if ('authToken' in userIdentifier) {
        return {
          type: 'new',
          authToken: userIdentifier.authToken,
        };
      }
      return {
        type: 'origin',
        accessToken: userIdentifier.accessToken,
        refreshToken: userIdentifier.refreshToken,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 1. string => ExpiredToken
        // if (error === "Expiretoend")
        // 2. class ExpiredToken extends Error {}
        // if (error instanceof ExpiredToken)
        throw new Error(String(error.response?.status));
      } else {
        throw error;
      }
    }
  }

  async enrollUser(tempToken: string, language: string): Promise<Enroll> {
    return { accessToken: '', refreshToken: '' };
  }

  async verifyToken(
    accessToken: string,
    refreshToken: string,
  ): Promise<NewToken> {
    return { isValid: true, accessToken: '' };
  }
}

export default AuthRepository;
