export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
    this._myUser = '/users/me';
    this._avatar = '/users/me/avatar';
    this._cards = '/cards';
    this._like = '/likes';
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getData(listPromises) {
    return Promise.all(listPromises);
  }

  getUserInfo(path = this._myUser) {
    return fetch(this._url + path, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserInfo(newInfo, path = this._myUser) {
    return fetch(this._url + path, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newInfo),
    }).then(this._checkResponse);
  }

  getInitialCards(path = this._cards) {
    return fetch(this._url + path, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addCard(cardData, path = this._cards) {
    return fetch(this._url + path, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardData),
    }).then(this._checkResponse);
  }

  deleteCard(cardId, path = this._cards) {
    return fetch(`${this._url}${path}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLike) {
    return isLike ? this.addLike(cardId) : this.deleteLike(cardId);
  }

  addLike(cardId, path = this._cards, like = this._like) {
    return fetch(`${this._url}${path}/${cardId}${like}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteLike(cardId, path = this._cards, like = this._like) {
    return fetch(`${this._url}${path}/${cardId}${like}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeAvatar(avatar, path = this._avatar) {
    return fetch(this._url + path, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: 'e3e7a0aa-690b-431f-8d02-11204306c307',
    'Content-Type': 'application/json',
  },
});
