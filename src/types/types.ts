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
  id?: string;
  index?: number;
  count?: number;
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
  readonly type?: string;
  readonly __v: number;
  readonly _id: string;
  keyId?: string;
  id?: string;
  index?: number;
  type1?: string;
  count?: number;
};

export type TOrderItem = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number; 
  status: string;
  updatedAt: string; 
  _id: string;
}

export type TMessage = {
  success: boolean;
  message?: any;
  orders?: Array<TOrderItem>;
  total?: number;
  totalToday?: number;
}
