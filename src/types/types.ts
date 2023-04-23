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

export type TUser = {
  email: string,
  name: string
}

export type TMessage = {
  success: boolean;
  message?: string;
  orders?: Array<TOrderItem>;
  total?: number;
  totalToday?: number;
  accessToken?: string;
  refreshToken?: string;
  user?: TUser;
}

export type TLoginMessage = {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: TUser;
  message?: string;
}

export type TLoginMessageSucceed = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUser;
}

export type TRegisterMessage = {
  success: boolean;
  user?: TUser;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

export type TRefreshTokenMessage = {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

export type TOrderMessage = {
  success: boolean;
  name?: string;
  order?: TOrderItem;
  message?: string;
}

export type TOrderMessageSuccess = {
  success: boolean;
  name: string;
  order: TOrderItem;
}

export type TUserMessage = {
  success: boolean;
  user?: TUser;
  message?: string;
}

export type TUserMessageSuccess = {
  success: boolean;
  user: TUser;
}

export type TLoginData = {
  email: string, 
  password: string
}

export type TRegisterData = {
  email: string, 
  password: string,
  name: string
}

export type TUpdateUserData = {
  email: string, 
  password: string,
  name: string
}

export type TSendEmailData = {
  email: string
}

export type TResetPasswordData = {
  password: string,
  token: string
}

export type TWSMessage = {
  totalToday: number,
  total: number,
  orders: Array<TOrderItem>
};
