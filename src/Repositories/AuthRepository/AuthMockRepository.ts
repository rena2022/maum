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
    nationalCode: string,
    phoneNumber: string,
  ): Promise<AuthPhone> {
    return { tempToken: '', authCode: '234523', message: 'OK' };
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
