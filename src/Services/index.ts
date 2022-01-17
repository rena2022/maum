import AuthService from './AuthService';
import UserService from './UserService';
import AuthMockRepository from '../Repositories/AuthRepository/AuthMockRepository';
import UserMockRepository from '../Repositories/UserRepository/UserRepository';

export const service = {
  user: new UserService(new UserMockRepository()),
  auth: new AuthService(new AuthMockRepository()),
};
