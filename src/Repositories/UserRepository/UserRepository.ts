import axios, { AxiosError } from 'axios';
import { axiosSrc } from '../../Constants/axiosSrc';
import { NotFoundError } from '../../Utils/ClientError';
import TokenError from '../../Utils/ClientError';

export interface User {
  nickName: string;
  image: string;
}

export interface IUserRepository {
  getUserInfo(accessToken: string): Promise<User>;
}

class UserRepository implements IUserRepository {
  async getUserInfo(accessToken: string): Promise<User> {
    const data = axios
      .get<User>(axiosSrc.search, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(async response => {
        return response.data;
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          if (status == 404) {
            throw new NotFoundError('Page Not Found', status);
          } else {
            throw new TokenError('Invalid Token', status);
          }
          /**@discription 500에러 처리 */
        }
        throw error;
      });
    return data;
  }
}

export default UserRepository;
