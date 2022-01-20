import { IAuthRepository } from '../Repositories/AuthRepository/AuthRepository';

class AuthService {
  authRepository: IAuthRepository;

  constructor(AuthRepository: IAuthRepository) {
    this.authRepository = AuthRepository;
  }

  async verifyPhoneNum(countryCode: number, phoneNum: string) {
    return await this.authRepository.verifyPhoneNum(countryCode, phoneNum);
  }

  async checkUser(tempToken: string) {
    return await this.authRepository.checkUser(tempToken);
  }

  async enrollUser(tempToken: string, language: string) {
    return await this.authRepository.enrollUser(tempToken, language);
  }

  async verifyToken(accessToken: string, refreshToken: string) {
    return await this.authRepository.verifyToken(accessToken, refreshToken);
  }
}

export default AuthService;
