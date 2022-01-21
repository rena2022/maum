import AuthService from './AuthService';
import UserService from './UserService';
import AuthRepository from '../Repositories/AuthRepository/AuthRepository';
import UserMockRepository from '../Repositories/UserRepository/UserMockRepository';

export const service = {
  user: new UserService(new UserMockRepository()),
  auth: new AuthService(new AuthRepository()),
};
