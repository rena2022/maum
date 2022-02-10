import { IUserRepository } from '../Repositories/UserRepository/UserRepository';

class UserService {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getUserInfo(accessToken: string) {
    return await this.userRepository.getUserInfo(accessToken);
  }
}

export default UserService;
