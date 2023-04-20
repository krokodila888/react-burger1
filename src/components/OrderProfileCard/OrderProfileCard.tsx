import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './OrderProfileCard.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropTypes} from "../../utils/constants";
import { setCurrentIngredient } from '../../services/actions/currentIngredient';
import { setOnClick } from '../../services/actions/location';
import { IIngredient, TIngredient } from '../../types/types';
import { TMessageAllOrders, TOrderItem } from '../../types/types';
import React, { FC } from 'react';
import IngredientIcon from "../IngredientIcon/IngredientIcon";

type TOrderCardProps = {
  orderItem: TOrderItem
}

function OrderProfileCard (props: TOrderCardProps) {

  const { orderItem } = props;
  const { ingredients } = useSelector((state: any) => state.ingredientsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = new Date();
  const itemId: string = orderItem._id;
  const creationDate: string = `${orderItem.createdAt.slice(8, 10)}.${orderItem.createdAt.slice(5, 7)}.${orderItem.createdAt.slice(0, 4)}`;
  const currentDate: string = ('0' + current.getDate()).slice(-2) + '.' + ('0' + (current.getMonth()+1)).slice(-2) + '.' + current.getFullYear();

  function handleClick(ingredient: TIngredient) {
    dispatch(setCurrentIngredient(ingredient));
    console.log(ingredient);
    dispatch(setOnClick(ingredient));
    navigate(`/ingredients/:${ingredient._id}`)
  }
  let yesterday1 = new Date();
  yesterday1.setDate(yesterday1.getDate() - 1);
  let yesterday = `${yesterday1.getDate()}.${('0' + (yesterday1.getMonth()+1)).slice(-2)}.${yesterday1.getFullYear()}`;
  let twoDaysAgo1 = new Date();
  twoDaysAgo1.setDate(twoDaysAgo1.getDate() - 2);
  let twoDaysAgo = `${twoDaysAgo1.getDate()}.${('0' + (twoDaysAgo1.getMonth()+1)).slice(-2)}.${twoDaysAgo1.getFullYear()}`;

  let itemsInOrder = orderItem.ingredients.reduce((list: Array<IIngredient>, elem: string) => {
    let aaa = ingredients.filter((item1: IIngredient) => (item1._id === elem));
    if (aaa !== null) {
      list.push(aaa[0])
    }
    return list
  }, [])

  const icons1 = itemsInOrder.reduce((list: Array<string>, elem: IIngredient) => {
    if (elem && elem !== null && elem !== undefined)
    {list.push(elem.image_mobile)}
    return list
  }, []).slice(0, -1);

  function setOverflow(num: number) {
    if (itemsInOrder.length > 6 && num > 4)
    return (itemsInOrder.length - 5)
    else return 0
  }


  const prices = itemsInOrder.reduce((sum: number, elem: IIngredient) => {
    if (elem && elem !== null && elem !== undefined)
    {sum = sum + elem.price}
    return sum
  }, 0);

  const icons = icons1.slice(0, 6).map((item: string, index: number) => (
    <div>
    <IngredientIcon
      src={item}
      srcSet={item}
      overflow={setOverflow(index)}
      extraClass="items_picture"
      index={index}
    />
    </div>
  ));

  function getData(): string {
    if (creationDate === currentDate) return "Сегодня";
    else if (creationDate === yesterday) return "Вчера";
    else if (creationDate === twoDaysAgo) return "2 дня назад";
    else return creationDate
  };

  function getStatus(): string {
    if (orderItem.status === 'done') return "Выполнен";
    else return "Готовится"
  };

  function getStatusStyle(): string {
    if (orderItem.status === 'done') return '#00CCCC';
    else return "white"
  };

  return (
    <li className="orderProfileCard__card">
      <div className='orderProfileCard__div'>
        <p className="text text_type_main-default">#{orderItem.number}</p>
        <p className="text text_type_main-small text_color_inactive">{getData()}, {orderItem.createdAt.slice(11, 13)}:{orderItem.createdAt.slice(14, 16)}</p>
      </div>
      <p className="text text_type_main-medium orderSmallCard_name pt-4">{orderItem.name}</p>
      <p className='text text_type_main-small' style={{color: `${getStatusStyle()}`, }}>{getStatus()}</p>
      <div className='orderProfileCard__div pt-4'>
        <div className='items_list'>
          {icons}
        </div>
        <div className='orderProfileCard__div1'>
          <p className="text text_type_digits-default">
          {prices}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>

    </li>
  )
}

export default OrderProfileCard;
