export interface IIngredient {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
  keyId?: string;
}

export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
  keyId?: string;
  id?: string;
  index?: number;
};

export type TOrderItem = {
  createdAt: string;
  ingredients: Array<TIngredient>;
  name: string;
  number: number; 
  status: string;
  updatedAt: string; 
  _id: string
}

export type TMessageAllOrders = {
  success: boolean,
  orders?: Array<TOrderItem>;
  total?: number,
  totalToday?: number
}