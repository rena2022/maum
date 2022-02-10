import AuthService from './AuthService';
import UserService from './UserService';
import AuthRepository from '../Repositories/AuthRepository/AuthRepository';
import UserRepository from '../Repositories/UserRepository/UserRepository';

export const service = {
  user: new UserService(new UserRepository()),
  auth: new AuthService(new AuthRepository()),
};
