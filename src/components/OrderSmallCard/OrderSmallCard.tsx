import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './OrderSmallCard.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { setOrderInfo } from '../../services/actions/currentOrderInfo';
import { setOnClick, setItemType } from '../../services/actions/location';
import { IIngredient, TIngredient } from '../../types/types';
import { TMessage, TOrderItem } from '../../types/types';
import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import IngredientIcon from "../IngredientIcon/IngredientIcon";

type TOrderCardProps = {
  orderItem: TOrderItem
}



function OrderSmallCard (props: TOrderCardProps) {

  const { orderItem } = props;
  const { ingredients } = useSelector((state: any) => state.ingredientsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = new Date();
  const itemId: string = orderItem._id;
  const creationDate: string = `${orderItem.createdAt.slice(8, 10)}.${orderItem.createdAt.slice(5, 7)}.${orderItem.createdAt.slice(0, 4)}`;
  const currentDate: string = ('0' + current.getDate()).slice(-2) + '.' + ('0' + (current.getMonth()+1)).slice(-2) + '.' + current.getFullYear();

  function handleClick(orderItem: TOrderItem) {
    dispatch(setOrderInfo(orderItem));
    dispatch(setItemType('order'));
    dispatch(setOnClick(orderItem));
    navigate(`/feed/:${orderItem._id}`)
  }

  let yesterday1 = new Date();
  yesterday1.setDate(yesterday1.getDate() - 1);
  let yesterday = `${yesterday1.getDate()}.${('0' + (yesterday1.getMonth()+1)).slice(-2)}.${yesterday1.getFullYear()}`;
  let twoDaysAgo1 = new Date();
  twoDaysAgo1.setDate(twoDaysAgo1.getDate() - 2);
  let twoDaysAgo = `${twoDaysAgo1.getDate()}.${('0' + (twoDaysAgo1.getMonth()+1)).slice(-2)}.${twoDaysAgo1.getFullYear()}`;

  let itemsInOrder = orderItem.ingredients.reduce((list: Array<IIngredient>, elem: string) => {
    let item = ingredients.filter((item1: IIngredient) => (item1._id === elem));
    if (item !== null) {
      list.push(item[0])
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
    <div key={index}>
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

  return (
    <li className="orderSmallCard__card" onClick={() => handleClick(orderItem)}>
      <div className='orderSmallCard__div'>
        <p className="text text_type_main-default">#{orderItem.number}</p>
        <p className="text text_type_main-small text_color_inactive">{getData()}, {orderItem.createdAt.slice(11, 13)}:{orderItem.createdAt.slice(14, 16)}</p>
      </div>
      <p className="text text_type_main-medium orderSmallCard_name">{orderItem.name}</p>
      <div className='orderSmallCard__div'>
        <div className='items_list'>
          {icons}
        </div>
        <div className='orderSmallCard__div1'>
          <p className="text text_type_digits-default">
          {prices}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>

    </li>
  )
}

export default OrderSmallCard;
