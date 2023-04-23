import { bazeUrl } from './constants';

type TRegister = {
  password: string;
  email: string; 
  name: string;
}

type TLogin = {
  email: string;
  password: string;
}

type TRequestToResetPassword = {
  email: string;
}

type TResetPassword = {
  password: string;
  token: string
}

type TUpdateUserData = {
  email: string, 
  password: string,
  name: string
}

export class Api {
  private _bazeUrl: string;

  constructor(baseUrl: string) {
    this._bazeUrl = baseUrl;
  }

  _handleResult(res: Response) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _handleResult2(res: Response) {
    if (res.ok) {
      return res.json()}
    else if (!res.ok) {
      const err = res.json();
      return err;
    }
    //return res.json();
  }

  getIngredients() {
    return fetch(`${this._bazeUrl}/ingredients`, {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(this._handleResult)
      .catch((res)=>console.log(res.status, res.statusText))
  } 

  sendOrder(data: string[]) {
    return fetch(`${this._bazeUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('accessToken')}`
    },
      body: JSON.stringify({ 
        "ingredients": data
    })
      })
    .then(this._handleResult)
    .catch((res)=>console.log(res.status, res.statusText))
  }

  signUp(data: TRegister) {
    return fetch(`${bazeUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'password': data.password,
        'email': data.email,
        'name': data.name})
      })
    .then(this._handleResult2)
    .catch((res)=>console.log(res.status, res.statusText))
  }

  signIn(data: TLogin) {
    return fetch(`${bazeUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': data.email,
        'password': data.password
        })
    })
    .then(this._handleResult2)
    .catch((res)=>console.log(res.status, res.statusText))
  }

  getUserRequest() {
    return fetch(`${bazeUrl}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('accessToken')}`
      },
    })
    .then(this._handleResult2)
    .catch((res)=>console.log(res.status, res.statusText))
  }

  updateUser(data: TUpdateUserData) {
    return fetch(`${bazeUrl}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(data)
    })
    .then(this._handleResult)
    .catch((res)=>console.log(res))
  }

  refreshToken(/*data: string*/) {
    return fetch(`${bazeUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"token": localStorage.getItem('refreshToken')})
    })
    .then(this._handleResult2)
    .catch((res)=>console.log(res.status, res.statusText))
  }

  requestToResetPassword(data: TRequestToResetPassword) {
    return fetch(`${bazeUrl}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': data.email 
      })
    })
    .then(this._handleResult)
    .catch((res)=>console.log(res.status, res.statusText))
  }

  resetPassword(data: TResetPassword) {
    return fetch(`${bazeUrl}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      })
      .then(this._handleResult)
      .catch((res)=>console.log(res.status, res.statusText))
  } 

  signOut() {
    return fetch(`${bazeUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"token": localStorage.getItem('refreshToken')})
    })
    .then(this._handleResult)
    .catch((res)=>console.log(res.status, res.statusText))
  }
}
  
export const api = new Api(bazeUrl);
