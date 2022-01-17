export interface AuthPhone {
  tempToken: string;
  certificationNum: string;
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
  verifyPhoneNum(countryCode: string, phoneNum: string): Promise<AuthPhone>;
  checkUser(tempToken: string): Promise<SignIn | SignUp>;
  enrollUser(tempToken: string, language: string): Promise<Enroll>;
  verifyToken(accessToken: string, refreshToken: string): Promise<NewToken>;
}

class AuthRepository implements IAuthRepository {
  async verifyPhoneNum(
    countryCode: string,
    phoneNum: string,
  ): Promise<AuthPhone> {
    return { tempToken: '', certificationNum: '' };
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
