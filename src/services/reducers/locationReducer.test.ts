import {
  SET_LOCATION,
  REMOVE_LOCATIONS,
  ON_CLICK,
  ON_CLICK_ITEM,
  REMOVE_ON_CLICK
} from "../../utils/constants";
import { locationReducer, initialState } from './locationReducer';

describe('locationReducer', () => {
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

  const randomItem = '/profile';
  const itemType = 'ingredient';

  it('should return initialState', () => {
    expect(locationReducer(undefined, {} as any)).toEqual(initialState);
  })

  it('should SET_LOCATION', () => {
    expect(locationReducer(initialState, { 
      type: SET_LOCATION,
      currentLocation: randomItem 
    }))
      .toEqual({
        ...initialState, 
        locations: [
          randomItem,
          initialState.locations[0],
          initialState.locations[1],
        ]
      })
  })

  it('should REMOVE_LOCATIONS', () => {
    expect(locationReducer(initialState, { 
      type: REMOVE_LOCATIONS 
    }))
      .toEqual(initialState)
  })

  it('should ON_CLICK', () => {
    expect(locationReducer(initialState, { 
      type: ON_CLICK,
      currentItem: ingredient
    }))
      .toEqual({
        ...initialState, 
        onClick: true,
        itemData: ingredient,
      })
  })

  it('should ON_CLICK_ITEM', () => {
    expect(locationReducer(initialState, { 
      type: ON_CLICK_ITEM,
      itemType: 'ingredient',
    }))
      .toEqual({
        ...initialState,
        itemType: 'ingredient'
      })
  })

  it('should REMOVE_ON_CLICK', () => {
    expect(locationReducer(initialState, {
      type: REMOVE_ON_CLICK,
    }))
      .toEqual({
        ...initialState,
        onClick: false,
        itemType: '',
        itemData: {}
      })
  })
})