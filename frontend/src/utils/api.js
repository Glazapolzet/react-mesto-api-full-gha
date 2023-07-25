import { BASE_URL } from "./auth";

class Api {

  constructor (options) {
    this._baseURL = options['baseURL'];
    this._headers = options['headers'];
  }

  _handlePromise(res) {
      if (res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      credentials: 'include',
    })
      .then(res => this._handlePromise(res))
  }

  updateLike(cardId, method) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      credentials: 'include',
      method: method,
    })
      .then(res => this._handlePromise(res))
  }

  getUserData() {
    return fetch(`${this._baseURL}/users/me`, {
      credentials: 'include',
    })
      .then(res => this._handlePromise(res))
  }

  editProfile(name, about) {
    return fetch(`${this._baseURL}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._handlePromise(res))
  }

  editAvatar(link) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => this._handlePromise(res))
  }

  postCard(name, link) {
    return fetch(`${this._baseURL}/cards`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._handlePromise(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      credentials: 'include',
      method: 'DELETE',
    })
      .then(res => this._handlePromise(res))
  }

}

const api = new Api({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
