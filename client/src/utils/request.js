import fetch from 'dva/fetch';

const baseUrl = '//api.mrdaisite.com/api/v1/';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} path       The PATH we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(path, options) {
  return fetch(baseUrl + path, {
    ...options,
    headers: {
      Authorization: 'Bearer dfdfdfdfdfdfdf',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
