import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
} from "../../utils/constants";
import { initialState/*, wsActionsOptions*/, wsReducer } from './wsReducer';

describe('wsReducer', () => {
  const messageSuccess = {
    wsConnection: true,
    success: true,
    total: 500,
    totalToday: 80,
    orders: [
      {
        _id: '6442d3f045c6f2001be6c6cd',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Бургер Бургер',
        createdAt: '2023-05-01T19:00:00.111Z',
        updatedAt: '2023-05-01T19:00:00.111Z',
        number: 1234
      },
    ]
  }

  const messageError = {
    wsConnected: false,
    success: false
  }

  it('should WS_CONNECTION_SUCCESS', () => {
    expect(wsReducer(initialState, {
      type: WS_CONNECTION_SUCCESS,
    }))
      .toEqual({
        ...initialState,
        error: undefined,
        wsConnected: true
      })
  })

  it('should WS_CONNECTION_ERROR', () => {
    expect(wsReducer(initialState, {
      type: WS_CONNECTION_ERROR,
      // @ts-ignore
      payload: messageError
    }))
      .toEqual({
        ...initialState,
        wsConnected: false,
        error: messageError
      })
  })

  it('should WS_CONNECTION_CLOSED', () => {
    expect(wsReducer(initialState, {
      type: WS_CONNECTION_CLOSED,
    }))
      .toEqual({
        ...initialState,
        error: undefined,
        wsConnected: false
      })
  })

  it('should WS_GET_MESSAGE', () => {
    expect(wsReducer(initialState, {
      type: WS_GET_MESSAGE,
      payload: messageSuccess
    }))
      .toEqual({
        ...initialState,
        error: undefined,
        orders: messageSuccess.orders,
        total: messageSuccess.total,
        totalToday: messageSuccess.totalToday,
        message: messageSuccess
      })
  })

  it('should return the initial state', () => {
    expect(wsReducer(undefined, {} as any))
      .toEqual(initialState)
  })
})