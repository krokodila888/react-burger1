import { bazeUrl } from './constants.js';

export class Api {
  constructor(bazeUrl) {
    this._bazeUrl = bazeUrl;
  }

  _handleResult(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  
  getIngredients() {
    return fetch(`${this._bazeUrl}/ingredients`, {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(this._handleResult);
  } 

  sendOrder(data) {
    this._newOrder = fetch(`${this._bazeUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('accessToken')}`
    },
      body: JSON.stringify({ 
        "ingredients": data
    })
      })
    .then(this._handleResult);
    return this._newOrder;  
  }

  signUp(data) {
    return fetch(`${bazeUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //credentials: 'include',
      body: JSON.stringify({
        'password': data.password,
        'email': data.email,
        'name': data.name})
      })
    .then(this._handleResult)
  }

  signIn(data) {
    return fetch(`${bazeUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //credentials: 'include',
      body: JSON.stringify({
        'email': data.email,
        'password': data.password
        })
    })
    .then(this._handleResult)
  }

  getUserRequest() {
    return fetch(`${bazeUrl}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('accessToken')}`
      },
    })
    .then(this._handleResult)
  }

  updateUser(data) {
    return fetch(`${bazeUrl}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('accessToken')}`
      },
      //credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(this._handleResult)
  }

  refreshToken(data) {
    return fetch(`${bazeUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'/*,
        Authorization: 'Bearer ' + `${localStorage.getItem('accessToken')}`*/
      },
      //credentials: 'include',
      body: JSON.stringify({"token": data/*`${localStorage.getItem('refreshToken')}`*/})
    })
    .then(this._handleResult)
  }

  requestToResetPassword(data) {
    return fetch(`${bazeUrl}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //credentials: 'include',
      body: JSON.stringify({
        'email': data.email 
      })
    })
    .then(this._handleResult)
  }

  resetPassword(data) {
    return fetch(`${bazeUrl}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //credentials: 'include',
      body: JSON.stringify(data)
      })
      .then(this._handleResult)
  } 

  signOut() {
    return fetch(`${bazeUrl}/auth/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"token": localStorage.getItem('refreshToken')})
//      credentials: 'include'
    })
  }
}
  
export const api = new Api(bazeUrl);
