import { IP } from './keys';

export const axiosSrc = {
  auth: `http://${IP}:8080/v1/auth`,
  user: `http://${IP}:8080/v1/user`,
  token: `http://${IP}:8080/v1/user/token`,
};
