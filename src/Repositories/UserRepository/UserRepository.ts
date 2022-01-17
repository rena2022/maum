export interface User {
  nickName: string;
  profileImg: string;
}

export interface IUserRepository {
  getUserData(userId: string): Promise<User>;
}

class UserRepository implements IUserRepository {
  async getUserData(userId: string): Promise<User> {
    return { nickName: '', profileImg: '' };
  }
}

export default UserRepository;
