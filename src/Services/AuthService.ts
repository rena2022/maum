import { IAuthRepository } from '../Repositories/AuthRepository/AuthRepository';

class AuthService {
  authRepository: IAuthRepository;

  constructor(AuthRepository: IAuthRepository) {
    this.authRepository = AuthRepository;
  }

  async verifyPhoneNum(countryCode: number, phoneNum: string) {
    return await this.authRepository.verifyPhoneNum(countryCode, phoneNum);
  }

  async checkUser(authCode: string, authToken: string) {
    return await this.authRepository.checkUser(authCode, authToken);
  }

  async enrollUser(phoneNum: string, language: Array<number>) {
    return await this.authRepository.enrollUser(phoneNum, language);
  }

  async verifyToken(accessToken: string, refreshToken: string) {
    return await this.authRepository.verifyToken(accessToken, refreshToken);
  }
}

export default AuthService;
