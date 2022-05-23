import axios from 'axios';
/**
 *
 * @param method
 * @param url
 * @param _obj
 * @returns
 * method will return the case of the switch-case, here we can use to make our axios calls
 * url will return the url of the call from the backend
 * object will mostly be used on put, and post ex: async(obj)=> await api('method', url, obj);
 */

export const dynamicApi = (method: string, url: string, obj = {}) => {
  switch (method) {
    case 'get':
      return axios.get(`${url}`).then((res) => res.data);

    case 'post':
      return axios.post(`${url}`, obj /* config for headers and json config() */).then((res) => res.data);

    default:
      return null;
  }
};
