import axios from 'axios';
import PhoneAlert from '../../Utils/PhoneAlert';

export interface AuthPhone {
  authToken: string;
  authCode: string;
  message: string;
}

export interface SignIn {
  isJoin: true;
  accessToken: string;
  refreshToken: string;
}

export interface SignUp {
  isJoin: false;
  tempToken: string;
}

export interface Enroll {
  accessToken: string;
  refreshToken: string;
}

export interface NewToken {
  isValid: boolean;
  accessToken: string;
}

export interface IAuthRepository {
  verifyPhoneNum(nationalCode: number, phoneNumber: string): Promise<AuthPhone>;
  checkUser(tempToken: string): Promise<SignIn | SignUp>;
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

  async checkUser(tempToken: string): Promise<SignIn | SignUp> {
    return { isJoin: false, tempToken: '' };
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
