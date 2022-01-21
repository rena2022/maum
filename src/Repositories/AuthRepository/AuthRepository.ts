import axios from 'axios';
import { axiosSrc } from '../../Constants/axiosSrc';
import { getToken } from '../../Utils/keychain';
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
  message: string;
}

//verfiyToken
export interface NewToken {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthRepository {
  verifyPhoneNum(nationalCode: number, phoneNumber: string): Promise<AuthPhone>;
  checkUser(authCode: string, authToken: string): Promise<SignIn | SignUp>;

  enrollUser(phoneNumber: string, language: Array<number>): Promise<Enroll>;
  verifyToken(accessToken: string, refreshToken: string): Promise<NewToken>;
}

class AuthRepository implements IAuthRepository {
  async verifyPhoneNum(
    nationalCode: number,
    phoneNumber: string,
  ): Promise<AuthPhone> {
    try {
      const data = await axios
        .get(axiosSrc.auth, {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }
      throw error;
    }
  }

  async checkUser(
    authCode: string,
    authToken: string,
  ): Promise<SignIn | SignUp> {
    try {
      const res = await axios.post<UserIdentifier>(
        axiosSrc.auth,
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

  async enrollUser(
    phoneNumber: string,
    language: Array<number>,
  ): Promise<Enroll> {
    try {
      const res = await axios.post(
        axiosSrc.user,
        {
          phoneNumber,
          language,
        },
        {
          headers: { Authorization: `Bearer ${await getToken('authToken')}` },
        },
      );
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(String(error.response?.status));
      } else {
        throw error;
      }
    }
  }

  async verifyToken(
    accessToken: string,
    refreshToken: string,
  ): Promise<NewToken> {
    const res = true;
    if (res) {
      return {
        accessToken: '',
        refreshToken: '',
      };
    } else
      return Promise.reject('Token is unusable').catch(function () {
        throw new Error('Token Error');
      });
  }
}

export default AuthRepository;
