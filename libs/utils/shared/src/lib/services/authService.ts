import axios from 'axios';
import { MeApi, MeResponse } from '@catalogue/api/geonetwork';

export type AuthData = MeResponse | undefined;
const signIn = (username: string, password: string): Promise<AuthData> => {
  axios.interceptors.request.use(function (config) {
    if (
      config &&
      config.url &&
      config.url.indexOf('http://localhost:8080/geonetwork') === 0
    ) {
      config.url = config.url.replace(
        'http://localhost:8080/geonetwork',
        'http://localhost:4200/geonetwork'
      );
    }
    return config;
  });

  const auth = {
    username: username,
    password: password,
  };

  return new Promise((resolve) => {
    new MeApi().getMe({ auth: auth }).then(
      function (userDetailsResponse) {
        resolve(userDetailsResponse.data);
      },
      function () {
        resolve(undefined);
      }
    );
  });
};

const signOut = (): Promise<any> => {
  return axios({
    method: 'get',
    url: '/geonetwork/signout',
  });
};

export const authService = {
  signIn,
  signOut,
};
