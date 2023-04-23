import { useAppSelector } from '../../services/wsMiddleware';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './orderProfileCard.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient, TIngredient, TOrderItem } from '../../types/types';
import React, { FC } from 'react';
import IngredientIcon from "../IngredientIcon/IngredientIcon";
import { setOrderInfo } from '../../services/actions/currentOrderInfo';
import { setOnClick, setItemType } from '../../services/actions/location';
import { useAppDispatch } from '../../services/wsMiddleware';

type TOrderCardProps = {
  orderItem: TOrderItem
}

function OrderProfileCard (props: TOrderCardProps) {

  const { orderItem } = props;
  const location = useLocation();
  const { ingredients } = useAppSelector((state) => state.ingredientsReducer);
  const [itemsInOrder, setItemsInOrder] = React.useState<Array<TIngredient> | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const current = new Date();
  const itemId: string = orderItem._id;
  const creationDate: string = `${orderItem.createdAt.slice(8, 10)}.${orderItem.createdAt.slice(5, 7)}.${orderItem.createdAt.slice(0, 4)}`;
  const currentDate: string = ('0' + current.getDate()).slice(-2) + '.' + ('0' + (current.getMonth()+1)).slice(-2) + '.' + current.getFullYear();

  let yesterday1 = new Date();
  yesterday1.setDate(yesterday1.getDate() - 1);
  let yesterday = `${yesterday1.getDate()}.${('0' + (yesterday1.getMonth()+1)).slice(-2)}.${yesterday1.getFullYear()}`;
  let twoDaysAgo1 = new Date();
  twoDaysAgo1.setDate(twoDaysAgo1.getDate() - 2);
  let twoDaysAgo = `${twoDaysAgo1.getDate()}.${('0' + (twoDaysAgo1.getMonth()+1)).slice(-2)}.${twoDaysAgo1.getFullYear()}`;

  React.useEffect(() => {if (ingredients !== null)
    {let itemsInOrder = orderItem.ingredients.reduce((list: Array<TIngredient>, elem: string) => {
      let item = ingredients.filter((item1: TIngredient) => (item1._id === elem));
      if (item !== null) {
        list.push(item[0])
      }
      return list
    }, [])
    setItemsInOrder(itemsInOrder)}
  }, [ingredients]);

  /*let itemsInOrder = orderItem.ingredients.reduce((list: Array<TIngredient>, elem: string) => {
    let item = ingredients.filter((item1: TIngredient) => (item1._id === elem));
    if (item !== null) {
      list.push(item[0])
    }
    return list
  }, [])*/

  /*const icons1 = itemsInOrder.reduce((list: Array<string>, elem: TIngredient) => {
    if (elem && elem !== null && elem !== undefined)
    {list.push(elem.image_mobile)}
    return list
  }, []).slice(0, -1);*/

  function setOverflow(num: number) {
    if (itemsInOrder !== null && itemsInOrder.length > 6 && num > 4)
    return (itemsInOrder.length - 5)
    else return 0
  }

  function getPrices(): number | undefined {
    if (itemsInOrder !== null) {
      const prices = itemsInOrder.reduce((sum: number, elem: TIngredient) => {
        if (elem && elem !== null && elem !== undefined)
        {sum = sum + elem.price}
        return sum
      }, 0);
    return prices
    }
  };

  function getIcons(): JSX.Element[] | undefined {
    if (itemsInOrder !== null) {
      const icons1 = itemsInOrder.reduce((list: Array<string>, elem: TIngredient) => {
        if (elem && elem !== null && elem !== undefined)
        {list.push(elem.image_mobile)}
        return list
      }, []).slice(0, -1);
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
      return icons
    }
  };


  /*const prices = itemsInOrder.reduce((sum: number, elem: TIngredient) => {
    if (elem && elem !== null && elem !== undefined)
    {sum = sum + elem.price}
    return sum
  }, 0);*/

  /*const icons = icons1.slice(0, 6).map((item: string, index: number) => (
    <div key={index}>
    <IngredientIcon
      src={item}
      srcSet={item}
      overflow={setOverflow(index)}
      extraClass="items_picture"
      index={index}
    />
    </div>
  ));*/

  function getDate(): string {
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

  function handleClick(orderItem: TOrderItem) {
    dispatch(setOrderInfo(orderItem));
    dispatch(setItemType('orderProfile'));
    dispatch(setOnClick(orderItem));
  }

  return (
    <li className="orderProfileCard__card" /*onClick={() => handleClick(orderItem)}*/>
      {itemsInOrder !== null &&
      <Link
        to={`/profile/orders/:${orderItem._id}`} 
        state={{ background: location }} 
        onClick={() => handleClick(orderItem)} 
        className='orderProfileCard__link'
      >
      <div className='orderProfileCard__div'>
        <p className="text text_type_main-default">#{orderItem.number}</p>
        <p className="text text_type_main-small text_color_inactive">{getDate()}, {orderItem.createdAt.slice(11, 13)}:{orderItem.createdAt.slice(14, 16)}</p>
      </div>
      <p className="text text_type_main-medium orderSmallCard_name pt-4">{orderItem.name}</p>
      <p className='text text_type_main-small' style={{color: `${getStatusStyle()}`, }}>{getStatus()}</p>
      <div className='orderProfileCard__div pt-4'>
        <div className='items_list'>
          {getIcons()}
        </div>
        <div className='orderProfileCard__div1'>
          <p className="text text_type_digits-default">
          {getPrices()}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      </Link>}
    </li>
  )
}

export default OrderProfileCard;
