import {
  SEND_ORDER,
  SEND_ORDER_FAILED,
  SEND_ORDER_SUCCESS,
  REMOVE_ORDER
} from "../../utils/constants";
import { currentOrderReducer, initialState } from './currentOrderReducer';

describe('currentOrderReducer', () => {

  const messageSuccess = {
    success: true,
    order: {      
      createdAt: '29.04.2021',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
      name: 'Бургер бургер',
      number: 42, 
      status: 'done',
      updatedAt: '29.04.2021', 
      _id: '111'},
    name: 'Бургер Бургер'
  }

  it('should return initialState', () => {
    expect(currentOrderReducer(undefined, {} as any)).toEqual(initialState);
  })

  it('should SEND_ORDER', () => {
    expect(currentOrderReducer(initialState, {
      type: SEND_ORDER,
    }))
      .toEqual({
        ...initialState,
        sendOrderRequest: true,
        sendOrderFailed: false,
      })
  })

  it('should SEND_ORDER_SUCCESS', () => {
    expect(currentOrderReducer(initialState, {
      type: SEND_ORDER_SUCCESS,
      sendOrder: messageSuccess,
      sendOrderNumber: messageSuccess.order.number
    }))
      .toEqual({
        ...initialState,
        sendOrder: messageSuccess,
        sendOrderNumber: messageSuccess.order.number, 
        sendOrderRequest: false 
      })
  })

  it('should SEND_ORDER_FAILED', () => {
    expect(currentOrderReducer(initialState, {
      type: SEND_ORDER_FAILED,
    }))
      .toEqual({
        ...initialState,
        sendOrderFailed: true, 
        sendOrderRequest: false 
      })
  })

  it('should REMOVE_ORDER', () => {
    expect(currentOrderReducer(initialState, { 
      type: REMOVE_ORDER 
    }))
      .toEqual(initialState)
  })
})
