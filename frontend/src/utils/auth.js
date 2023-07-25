export const BASE_URL = "https://api.vypz.praktikum.nomoredomains.xyz";

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export function register (email, password) {
  return fetch(`${BASE_URL}/signup`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
    .then((res) => getResponse(res))
}

export function authorize (email, password) {
  return fetch(`${BASE_URL}/signin`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
    .then((res) => getResponse(res))
    .then((data) => {
      if(data['token']) {
        return data;
      }
    })
}

export function signout () {
  return fetch(`${BASE_URL}/signout`, {
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => getResponse(res))
}

export function getUser () {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => getResponse(res))
}