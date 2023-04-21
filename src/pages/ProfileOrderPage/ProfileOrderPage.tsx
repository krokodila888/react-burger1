import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import clsx from "clsx";
import { useParams } from 'react-router-dom';
import styles from './ProfileOrderPage.module.css';
import { IIngredient, TIngredient, TOrderItem } from '../../types/types';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Preloader from '../../components/Preloader/Preloader';

function ProfileOrderPage() {

  const { ingredients } = useSelector((state: any) => state.ingredientsReducer);
  const { user, refreshToken, getUserDataRequestFailed } = useSelector((state: any) => state.authReducer);
  const { message, orders } = useSelector((state: any) => state.wsReducer);
  const orderID = useParams() as any;
  const [currentOrderInfo, setCurrentOrderInfo] = useState<TOrderItem | null>(null);
  const [itemsInOrder, setItemsInOrder] = useState<Array<IIngredient> | null>(null);
  const [arrToRender, setArrToRender] = useState<Array<IIngredient> | null>(null);
  const dispatch = useDispatch() as any;

  useEffect(() => {if (orders[0] !== null && orders !== undefined)
    setCurrentOrderInfo(orders.filter((item: TOrderItem) => (item._id === orderID.orderId.replace(':', '')))[0]);
  }, [orders]);

  useEffect(() => {if (currentOrderInfo !== null && currentOrderInfo !== undefined)
    {const itemsInOrder1 = currentOrderInfo.ingredients.
      reduce((list: Array<IIngredient>, elem: string) => {
      let item = ingredients.filter((item1: IIngredient) => (item1._id === elem));
      if (item !== null) {
      list.push(item[0])
      }
    return list
    }, []);
    setItemsInOrder(itemsInOrder1);}
  }, [currentOrderInfo]);

  useEffect(() => {if (itemsInOrder !== null && itemsInOrder !== undefined)
    {const arrToRender1 = itemsInOrder
      .map((item: IIngredient) => ({...item, count: itemsInOrder.filter((item2: IIngredient) => item2._id === item._id).length}))
      .reduce((list: Array<IIngredient>, elem: IIngredient) => {
    if (elem.count === 1) list.push(elem);
    else if ((elem.count !== undefined && elem.count > 1) && (list.filter((item1) => (item1._id === elem._id)).length === 0)) list.push(elem);
    return list
  }, []);
    setArrToRender(arrToRender1);}
  }, [itemsInOrder]);

  function setOrderDate() { if (currentOrderInfo !== null && itemsInOrder !== null && itemsInOrder !== undefined) {
    const current = new Date();
    const creationDate: string = `${currentOrderInfo.createdAt.slice(8, 10)}.${currentOrderInfo.createdAt.slice(5, 7)}.${currentOrderInfo.createdAt.slice(0, 4)}`;
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

  function getPrices(): number | undefined {
    if (itemsInOrder !== null && itemsInOrder !== undefined) {
      const prices = itemsInOrder.reduce((sum: number, elem: IIngredient) => {
      if (elem && elem !== null && elem !== undefined)
        {sum = sum + elem.price}
      return sum
    }, 0);
    return prices
    }
  };

  function getStatus(): string {
    if (currentOrderInfo !== null && currentOrderInfo.status === 'done') return "Выполнен";
    if (currentOrderInfo !== null && currentOrderInfo.status === 'pending') return "Готовится";
    else return "Создан"
  };

  function getStatusStyle(): string {
    if (currentOrderInfo !== null && currentOrderInfo.status === 'done') return '#00CCCC';
    else return "white"
  };
  
  return (
    <>
    {orders === null ? <Preloader isLoading={orders.filter((item: TOrderItem) => (item._id === orderID.orderId.replace(':', '')))[0] === undefined}/> :
    <div className={styles.div}>
      {currentOrderInfo !== null && currentOrderInfo !== undefined && <>
    <h2 className="text text_type_digits-default">
        #{currentOrderInfo.number}
      </h2>
      <h3 className="text text_type_main-medium pb-2">
        {currentOrderInfo.name}
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
        { arrToRender !== null && arrToRender.map((item: TIngredient, index: number) => (
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
          {setOrderDate()}, {currentOrderInfo.createdAt.slice(11, 13)}:{currentOrderInfo.createdAt.slice(14, 16)}
        </p>
        <div className={styles.divRow }>
          <p className="text text_type_digits-default">
          {getPrices()}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      </>}
    </div>}
    </>
  )
}

export default ProfileOrderPage;
