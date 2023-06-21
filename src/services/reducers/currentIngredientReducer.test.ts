import {
  SET_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT
} from "../../utils/constants";
import { currentIngredientReducer, initialState } from './currentIngredientReducer';

describe('currentIngredientReducer', () => {
  const ingredient = {
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
  };

  it('should return initialState', () => {
    expect(currentIngredientReducer(undefined, {} as any)).toEqual(initialState);
  })

  it('should SET_INGREDIENT', () => {
    expect(currentIngredientReducer(initialState, { 
      type: SET_INGREDIENT,
      currentItem: {
        name: ingredient.name,
        image_large: ingredient.image_large,
        calories: ingredient.calories,
        carbohydrates: ingredient.carbohydrates,
        fat: ingredient.fat,
        proteins: ingredient.proteins,
        image: ingredient.image,
        image_mobile: ingredient.image_mobile,
        price: ingredient.price,
        __v: ingredient.__v,
        _id: ingredient._id,
        type1: ingredient.type
      },
        ingredientModalIsOpen: true

    }))
      .toEqual({
        ...initialState, 
        currentItem: {
          name: ingredient.name, 
          image_large: ingredient.image_large, 
          calories: ingredient.calories, 
          carbohydrates: ingredient.carbohydrates, 
          fat: ingredient.fat, 
          proteins: ingredient.proteins,
          image_mobile: ingredient.image_mobile,
          image: ingredient.image,
          price: ingredient.price,
          type1: ingredient.type,
          _id: ingredient._id,
          __v: ingredient.__v,
        },
        ingredientModalIsOpen: true
      })
  })

  it('should CLEAR_CURRENT_INGREDIENT', () => {
    expect(currentIngredientReducer(initialState, { 
      type: CLEAR_CURRENT_INGREDIENT 
    }))
      .toEqual(initialState)
  })
})
