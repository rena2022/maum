import { IUserRepository, User } from './UserRepository';

class UserMockRepository implements IUserRepository {
  async getUserData(userId: string): Promise<User> {
    return { nickName: '', profileImg: '' };
  }
}

export default UserMockRepository;
