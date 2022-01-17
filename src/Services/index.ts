import UserService from './UserService';
import UserMockRepository from '../Repositories/UserRepository/UserRepository';

export const service = {
  user: new UserService(new UserMockRepository()),
};
