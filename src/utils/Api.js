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
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({ 
        "ingredients": data
    })
      }).then(this._handleResult);
      return this._newOrder;  
  }
}
  
export const api = new Api(bazeUrl);
