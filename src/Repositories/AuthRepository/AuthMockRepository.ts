import {
  AuthPhone,
  Enroll,
  IAuthRepository,
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

  async enrollUser(phoneNum: string, language: Array<number>): Promise<Enroll> {
    return { accessToken: '', refreshToken: '', message: '' };
  }

  async verifyToken(refreshToken: string) {
    return;
  }
}

export default AuthRepository;
