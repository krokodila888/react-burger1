import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REPLACE_INGREDIENT,
  CLEAR_CONSTRUCTOR
  } from "../../utils/constants";

import { currentBurgerReducer, initialState } from './currentBurgerReducer';

describe('currentBurgerReducer', () => {
  const ingredient1 = {
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
    __v: 0,
    keyId: '111'
  }

  const ingredient2 = {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Что-то еще из начинки',
    type: 'main',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
    keyId: '222'
  }

  const ingredient3 = {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Что-то еще из начинки',
    type: 'main',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
    keyId: '333'
  }

  const currentBurgerForTest = [
    {
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
      __v: 0,
      keyId: '111'
    },
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Что-то еще из начинки',
      type: 'main',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
      keyId: '222'
    },
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Что-то еще из начинки',
      type: 'main',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
      keyId: '333'
    }
  ]

  const currentBurgerWithoutBunForTest = [
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Что-то еще из начинки',
      type: 'main',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
      keyId: '222'
    },
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Что-то еще из начинки',
      type: 'main',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
      keyId: '333'
    }
  ]

  const testInitialState: any = {
    currentBurger: [currentBurgerWithoutBunForTest]
  }

  const testInitialState1: any = {
    currentBurger: [currentBurgerForTest]
  }

  it('should ADD_INGREDIENT (bun type), burger with bun', () => {
    expect(currentBurgerReducer(initialState, { 
      type: ADD_INGREDIENT,
      item: ingredient1
    }))
      .toEqual({
        ...initialState, 
        currentBurger: [
          ingredient1
        ],
      })
  })

  it('should ADD_INGREDIENT (not bun type), burger with bun', () => {
    expect(currentBurgerReducer(initialState, { 
      type: ADD_INGREDIENT,
      item: ingredient2
    }))
      .toEqual({
        ...initialState, 
        currentBurger: [
          ingredient2/*,
          ...currentBurgerForTest.slice(1)*/
        ],
      })
  })

  it('should ADD_INGREDIENT (bun type), burger complete without bun', () => {
    expect(currentBurgerReducer(testInitialState, { 
      type: ADD_INGREDIENT,
      item: ingredient1
    }))
      .toEqual({
        currentBurger: [
          ingredient1,
          ...testInitialState.currentBurger
        ],
      })
  })

  /*it('should ADD_INGREDIENT (bun type), burger complete with bun', () => {
    expect(currentBurgerReducer(testInitialState1, { 
      type: ADD_INGREDIENT,
      item: ingredient1
    }))
      .toEqual({
        currentBurger: [
          ingredient1,
          ...currentBurgerForTest.slice(1)
        ],
      })
  })*/

  it('should REPLACE_INGREDIENT (not bun type)', () => {
    expect(currentBurgerReducer(initialState, { 
      type: REPLACE_INGREDIENT,
      items: currentBurgerWithoutBunForTest
    }))
      .toEqual({
        ...initialState, 
        currentBurger: [
          ...currentBurgerWithoutBunForTest
        ],
      })
  })

  it('should REMOVE_INGREDIENT', () => {
    expect(currentBurgerReducer(initialState, { 
      type: REMOVE_INGREDIENT,
      item: ingredient2
    }))
      .toEqual({
        ...initialState,
        currentBurger: initialState.currentBurger.filter(
          (item1) => (item1.keyId !== ingredient2.keyId)
        ),
      })
  })

  it('should CLEAR_CONSTRUCTOR', () => {
    expect(currentBurgerReducer(initialState, {
      type: CLEAR_CONSTRUCTOR,
    }))
    .toEqual(initialState)
  })
})
