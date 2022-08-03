const BASE_URL = 'https://auth.nomoreparties.co';
const HEADERS = {
  'Content-Type': 'application/json',
};

function getJson(res) {
  if (res.ok) return res.json();
  return Promise.reject({ status: res.status });
}

export const registration = (regData) => {
  return fetch(BASE_URL + '/signup', {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(regData),
  }).then(getJson);
};

export const login = (logData) => {
  return fetch(BASE_URL + '/signin', {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(logData),
  }).then(getJson);
};

export const checkToken = (token) => {
  return fetch(BASE_URL + '/users/me', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  }).then(getJson);
};
