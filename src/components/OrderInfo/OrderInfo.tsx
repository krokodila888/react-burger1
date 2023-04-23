import React from "react";
import clsx from "clsx";
import styles from "./OrderInfo.module.css";
import { useAppSelector } from '../../services/wsMiddleware';
import { IIngredient, TIngredient, TOrderItem } from '../../types/types';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type ScriptEvent = () => void;

function OrderInfo() {
  const { ingredients } = useAppSelector((state) => state.ingredientsReducer);
  const { orders } = useAppSelector((state) => state.wsReducer);
  //const { currentOrderInfo } = useAppSelector((state) => state.currentOrderInfoReducer);
  const [currentOrderInfo1, setCurrentOrderInfo1] = React.useState<TOrderItem | null>(null);
  const orderId = useParams() as any;
  const [itemsInOrder, setItemsInOrder] = React.useState<Array<TIngredient> | null>(null);
  const [arrToRender, setArrToRender] = React.useState<Array<TIngredient> | null>(null);

  React.useEffect(() => {if (orders[0] !== null)
    setCurrentOrderInfo1(orders.filter((item: TOrderItem) => (item._id === orderId.orderId.replace(':', '')))[0]);
  }, [orders]);

  function getDate1() {
  if (currentOrderInfo1 !== null)
    {
      const current = new Date();
      const creationDate: string = `${currentOrderInfo1.createdAt.slice(8, 10)}.${currentOrderInfo1.createdAt.slice(5, 7)}.${currentOrderInfo1.createdAt.slice(0, 4)}`;
      const currentDate: string = ('0' + current.getDate()).slice(-2) + '.' + ('0' + (current.getMonth()+1)).slice(-2) + '.' + current.getFullYear();
      let yesterday1 = new Date();
      yesterday1.setDate(yesterday1.getDate() - 1);
      let yesterday = `${yesterday1.getDate()}.${('0' + (yesterday1.getMonth()+1)).slice(-2)}.${yesterday1.getFullYear()}`;
      let twoDaysAgo1 = new Date();
      twoDaysAgo1.setDate(twoDaysAgo1.getDate() - 2);
      let twoDaysAgo = `${twoDaysAgo1.getDate()}.${('0' + (twoDaysAgo1.getMonth()+1)).slice(-2)}.${twoDaysAgo1.getFullYear()}`;
      if (creationDate === currentDate) return "Сегодня";
    else if (creationDate === yesterday) return "Вчера";
    else if (creationDate === twoDaysAgo) return "2 дня назад";
    else return creationDate
    }
  }

  React.useEffect(() => {if (ingredients !== null && currentOrderInfo1 !== null && currentOrderInfo1 !== undefined)
    {const itemsInOrder1 = currentOrderInfo1.ingredients
      .reduce((list: Array<TIngredient>, elem: string) => {
      let item = ingredients.filter((item1: TIngredient) => (item1._id === elem));
      if (item !== null) {
      list.push(item[0])
      }
    return list
    }, []);
    setItemsInOrder(itemsInOrder1);}
  }, [currentOrderInfo1]);

  React.useEffect(() => {if (itemsInOrder !== null && itemsInOrder !== undefined)
    {const arrToRender1 = itemsInOrder
      .map((item: TIngredient) => ({...item, count: itemsInOrder.filter((item2: TIngredient) => item2._id === item._id).length}))
      .reduce((list: Array<TIngredient>, elem: TIngredient) => {
    if (elem.count === 1) list.push(elem);
    else if ((elem.count !== undefined && elem.count > 1) && (list.filter((item1) => (item1._id === elem._id)).length === 0)) list.push(elem);
    return list
  }, []);
    setArrToRender(arrToRender1);}
  }, [itemsInOrder]);

  let yesterday1 = new Date();
  yesterday1.setDate(yesterday1.getDate() - 1);
  let yesterday = `${yesterday1.getDate()}.${('0' + (yesterday1.getMonth()+1)).slice(-2)}.${yesterday1.getFullYear()}`;
  let twoDaysAgo1 = new Date();
  twoDaysAgo1.setDate(twoDaysAgo1.getDate() - 2);
  let twoDaysAgo = `${twoDaysAgo1.getDate()}.${('0' + (twoDaysAgo1.getMonth()+1)).slice(-2)}.${twoDaysAgo1.getFullYear()}`;
  

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

  function getStatus(): string {
    if (currentOrderInfo1 !== null && currentOrderInfo1.status === 'done') return "Выполнен";
    if (currentOrderInfo1 !== null && currentOrderInfo1.status === 'pending') return "Готовится";
    else return "Создан"
  };

  function getStatusStyle(): string {
    if (currentOrderInfo1 !== null && currentOrderInfo1.status === 'done') return '#00CCCC';
    else return "white"
  };

  return (
    <div className={styles.div}>
      {currentOrderInfo1 !== null && currentOrderInfo1 !== undefined && <>
      <h2 className="text text_type_digits-default">
        #{currentOrderInfo1.number}
      </h2>
      <h3 className="text text_type_main-medium pb-2">
        {currentOrderInfo1.name}
      </h3>
      <p className='text text_type_main-small' style={{
        color: `${getStatusStyle()}`, 
        paddingBottom: '60px'
        }}>
        {getStatus()}
        </p>
      <h3 className="text text_type_main-medium">
        Состав:
      </h3>
      <div className={styles.ingredientsContainerDiv }>
        {arrToRender != null && arrToRender.map((item: TIngredient, index: number) => (
          <div className={styles.ingredientDiv} key={index}>
            <div className={styles.divRow }>
            <div className={clsx(styles.container)} >
            <picture className={styles.picture}>
              <source srcSet={item.image_mobile} />
              <img src={item.image_mobile} alt='ingredient' width="112" height="56" />
            </picture>
            </div>
              <p className="text text_type_main-small">
                {item.name}
              </p>
            </div>
            <div className={styles.divRow }>
              <p className="text text_type_digits-default">
                {item.count} x {item.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      <div className={'orderProfileCard__div'}>
        <p className='text text_type_main-small text_color_inactive'>
          {getDate1()}, {currentOrderInfo1.createdAt.slice(11, 13)}:{currentOrderInfo1.createdAt.slice(14, 16)}
        </p>
        <div className={styles.divRow }>
          <p className="text text_type_digits-default">
          {getPrices()}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      </>}
    </div>
  );
}

export default OrderInfo;
