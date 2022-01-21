import { IUserRepository, User } from './UserRepository';

class UserMockRepository implements IUserRepository {
  async getUserData(userId: string): Promise<User> {
    return { nickName: '고양이손님1305', profileImg: 'http://' };
  }
}

export default UserMockRepository;
