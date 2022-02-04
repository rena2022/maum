import axios from 'axios';
import { axiosSrc } from '../../Constants/axiosSrc';
import { getToken, saveToken } from '../../Utils/keychain';
import PhoneAlert from '../../Utils/phoneAlert';

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
  verifyToken(refreshToken: string): Promise<NewToken>;
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
  ): Promise<SignUp | SignIn> {
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
      const isSignIn = res.data.isExist;
      if (!isSignIn) {
        await saveToken('registerToken', res.data.registerToken);
        return {
          isSignIn,
        };
      } else {
        await saveToken('accessToken', res.data.accessToken);
        await saveToken('refreshToken', res.data.refreshToken);
        return {
          isSignIn,
        };
      }
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
    languages: Array<number>,
  ): Promise<Enroll> {
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
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(String(error.response?.status));
      } else {
        throw error;
      }
    }
  }

  async verifyToken(refreshToken: string): Promise<NewToken> {
    const res = await axios.patch(axiosSrc.token, { refreshToken });
    if (res) {
      return {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      };
    } else
      return Promise.reject('Token is unusable').catch(function () {
        throw new Error('Token Error');
      });
  }
}

export default AuthRepository;
