import { IUserRepository } from '../Repositories/UserRepository/UserRepository';

class UserService {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getUserInfo(userId: string) {
    return await this.userRepository.getUserData(userId);
  }
}

export default UserService;
