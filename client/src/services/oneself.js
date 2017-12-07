import request from '../utils/request';

export function login({ username, password }) {
  return request(`login/password`, {
    method: 'POST',
    body: `username=${username}&password=${password}`,
  });
}
