import { resetToken, saveToken } from '../../Utils/keychain';
import {
  AuthPhone,
  Enroll,
  IAuthRepository,
  NewToken,
  SignIn,
  SignUp,
} from './AuthRepository';

class AuthRepository implements IAuthRepository {
  async verifyPhoneNum(
    nationalCode: number,
    phoneNumber: string,
  ): Promise<AuthPhone> {
    return { authCode: '', message: '', authToken: '' };
  }

  async checkUser(
    authCode: string,
    authToken: string,
  ): Promise<SignIn | SignUp> {
    return { type: 'new', authToken: '' };
  }

  async enrollUser(tempToken: string, language: string): Promise<Enroll> {
    return { accessToken: '', refreshToken: '' };
  }

  async verifyToken(
    accessToken: string,
    refreshToken: string,
  ): Promise<NewToken> {
    return {
      accessToken: 'abc',
      refreshToken: 'def',
    };
  }
}

export default AuthRepository;
