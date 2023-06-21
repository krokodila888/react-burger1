import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS
} from "../../utils/constants";
import { ingredientsReducer, initialState } from './ingredientsReducer';

describe('ingredientsReducer', () => {
  const ingredients = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  }

  it('should GET_INGREDIENTS', () => {
    expect(ingredientsReducer(initialState, { 
      type: GET_INGREDIENTS 
    }))
      .toEqual({
        ...initialState, 
        ingredientsRequest: true, 
        ingredientsFailed: false
      })
  })

  it('should GET_INGREDIENTS_SUCCESS', () => {
    expect(ingredientsReducer(initialState, { 
      type: GET_INGREDIENTS_SUCCESS,
      ingredients: [ingredients],
    }))
      .toEqual({
        ...initialState,
        ingredientsRequest: false,
        ingredients: [ingredients]
      })
  })

  it('should GET_INGREDIENTS_FAILED', () => {
    expect(ingredientsReducer(initialState, {
      type: GET_INGREDIENTS_FAILED,
    }))
      .toEqual({
        ...initialState,
        ingredientsRequest: false,
        ingredientsFailed: true,
      })
  })

  it('should return initialState', () => {
    expect(ingredientsReducer(undefined, {} as any)).toEqual(initialState);
  })
})