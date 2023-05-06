import {
    SET_ORDER_INFO,
    CLEAR_ORDER_INFO
  } from "../../utils/constants";
  import { currentOrderInfoReducer, initialState } from './currentOrderInfoReducer';
  
  describe('currentOrderInfoReducer', () => {
  
    const currentOrder = {
      createdAt: '29.04.2021',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
      name: 'Бургер бургер',
      number: 42, 
      status: 'done',
      updatedAt: '29.04.2021', 
      _id: '111'
    }
  
    it('should return initialState', () => {
      expect(currentOrderInfoReducer(undefined, {} as any)).toEqual(initialState);
    })
  
    it('should SET_ORDER_INFO', () => {
      expect(currentOrderInfoReducer(initialState, { 
        type: SET_ORDER_INFO,
        currentOrderInfo: {
          createdAt: currentOrder.createdAt,
          ingredients: currentOrder.ingredients,
          name: currentOrder.name,
          number: currentOrder.number,
          status: currentOrder.status,
          updatedAt: currentOrder.updatedAt,
          _id: currentOrder._id
        },
        orderInfoModalIsOpen: true
      }))
        .toEqual({
          ...initialState, 
          currentOrderInfo: {
            createdAt: currentOrder.createdAt,
            ingredients: currentOrder.ingredients,
            name: currentOrder.name,
            number: currentOrder.number,
            status: currentOrder.status,
            updatedAt: currentOrder.updatedAt,
            _id: currentOrder._id
          },
          orderInfoModalIsOpen: true
        })
      })
  
    it('should CLEAR_ORDER_INFO', () => {
      expect(currentOrderInfoReducer(initialState, { 
        type: CLEAR_ORDER_INFO 
      }))
        .toEqual(initialState)
    })
  })
  