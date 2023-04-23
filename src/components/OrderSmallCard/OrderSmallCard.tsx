import React from "react";
import { useAppSelector } from '../../services/wsMiddleware';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './OrderSmallCard.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { setOrderInfo } from '../../services/actions/currentOrderInfo';
import { setOnClick, setItemType } from '../../services/actions/location';
import { TIngredient} from '../../types/types';
import { TOrderItem } from '../../types/types';
import IngredientIcon from "../IngredientIcon/IngredientIcon";
import { useAppDispatch } from '../../services/wsMiddleware';

type TOrderCardProps = {
  orderItem: TOrderItem
}

function OrderSmallCard (props: TOrderCardProps) {

  const { orderItem } = props;
  const { ingredients } = useAppSelector((state) => state.ingredientsReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const current = new Date();
  const itemId: string = orderItem._id;
  const creationDate: string = `${orderItem.createdAt.slice(8, 10)}.${orderItem.createdAt.slice(5, 7)}.${orderItem.createdAt.slice(0, 4)}`;
  const currentDate: string = ('0' + current.getDate()).slice(-2) + '.' + ('0' + (current.getMonth()+1)).slice(-2) + '.' + current.getFullYear();
  
  const [itemsInOrder, setItemsInOrder] = React.useState<Array<TIngredient> | null>(null);

  React.useEffect(() => {if (ingredients !== null)
    {const itemsInOrder1 = orderItem.ingredients.
      reduce((list: Array<TIngredient>, elem: string) => {
      let item = ingredients.filter((item1: TIngredient) => (item1._id === elem));
      if (item !== null) {
      list.push(item[0])
      }
    return list
    }, []);
    setItemsInOrder(itemsInOrder1);}
  }, []);

  function handleClick(orderItem: TOrderItem) {
    dispatch(setOrderInfo(orderItem));
    dispatch(setItemType('order'));
    dispatch(setOnClick(orderItem));
  }

  let yesterday1 = new Date();
  yesterday1.setDate(yesterday1.getDate() - 1);
  let yesterday = `${yesterday1.getDate()}.${('0' + (yesterday1.getMonth()+1)).slice(-2)}.${yesterday1.getFullYear()}`;
  let twoDaysAgo1 = new Date();
  twoDaysAgo1.setDate(twoDaysAgo1.getDate() - 2);
  let twoDaysAgo = `${twoDaysAgo1.getDate()}.${('0' + (twoDaysAgo1.getMonth()+1)).slice(-2)}.${twoDaysAgo1.getFullYear()}`;

  function getIcons() {
    if (itemsInOrder !== null && itemsInOrder.length === 1) return itemsInOrder.reduce((list: Array<string>, elem: TIngredient) => {
      if (elem && elem !== null && elem !== undefined)
      {list.push(elem.image_mobile)}
      return list
    }, []);
    if (itemsInOrder !== null && itemsInOrder.length > 1 && itemsInOrder.filter((item) => (item !== undefined && item.type === 'bun')).length === 1) return itemsInOrder.reduce((list: Array<string>, elem: TIngredient) => {
      if (elem && elem !== null && elem !== undefined)
      {list.push(elem.image_mobile)}
      return list
    }, []);
    if (itemsInOrder !== null && itemsInOrder.length > 1 && itemsInOrder.filter((item) => (item !== undefined && item.type === 'bun')).length === 0) return itemsInOrder.reduce((list: Array<string>, elem: TIngredient) => {
      if (elem && elem !== null && elem !== undefined)
      {list.push(elem.image_mobile)}
      return list
    }, []);
    if (itemsInOrder !== null &&  itemsInOrder.length > 1 && itemsInOrder.filter((item) => (item !== undefined && item.type === 'bun')).length === 2) return itemsInOrder.reduce((list: Array<string>, elem: TIngredient) => {
      if (elem && elem !== null && elem !== undefined)
      {list.push(elem.image_mobile)}
      return list
    }, []).slice(0, -1);
  }

  function getIcons2() {
    const aaa = getIcons();
    if (aaa !== undefined) return aaa.slice(0, 6).map((item: string, index: number) => (
      <div key={index}>
        <IngredientIcon
          src={item}
          srcSet={item}
          overflow={setOverflow(index)}
          extraClass="items_picture"
          index={index}
        />
      </div>
    ))
  }

  function setOverflow(num: number) {
    if (itemsInOrder !== null && itemsInOrder.length > 6 && num > 4)
    return (itemsInOrder.length - 5)
    else return 0
  }

  function getPrices(): number | undefined {
    if (itemsInOrder !== null && itemsInOrder !== undefined) {
      const prices = itemsInOrder.reduce((sum: number, elem: TIngredient) => {
      if (elem && elem !== null && elem !== undefined)
        {sum = sum + elem.price}
      return sum
    }, 0);
    return prices
    }
  };

  function getData(): string {
    if (creationDate === currentDate) return "Сегодня";
    else if (creationDate === yesterday) return "Вчера";
    else if (creationDate === twoDaysAgo) return "2 дня назад";
    else return creationDate
  };

  return (
    <li className="orderSmallCard__card" /*onClick={() => handleClick(orderItem)}*/>
      <Link
        to={`/feed/:${orderItem._id}`} 
        state={{ background: location }} 
        onClick={() => handleClick(orderItem)} 
        className='orderSmallCard__link'
      >
      <div className='orderSmallCard__div'>
        <p className="text text_type_main-default">#{orderItem.number}</p>
        <p className="text text_type_main-small text_color_inactive">{getData()}, {orderItem.createdAt.slice(11, 13)}:{orderItem.createdAt.slice(14, 16)}</p>
      </div>
      <p className="text text_type_main-medium orderSmallCard_name">{orderItem.name}</p>
      <div className='orderSmallCard__div'>
        <div className='items_list'>
          {getIcons2()}
        </div>
        <div className='orderSmallCard__div1'>
          <p className="text text_type_digits-default">
          {getPrices()}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      </Link>
    </li>
  )
}

export default OrderSmallCard;
