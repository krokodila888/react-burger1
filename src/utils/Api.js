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
    return fetch(this._bazeUrl, {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(this._handleResult);
  } 
}
  
export const api = new Api(bazeUrl);
