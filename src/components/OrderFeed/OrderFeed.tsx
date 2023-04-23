import React, { FC } from "react";
import styles from "./orderFeed.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from '../../services/wsMiddleware';
import { wsActions } from "../../services/wsMiddleware";
import { wsUrl, wsUrlForUser } from "../../utils/constants";
import { TOrderItem } from '../../types/types';
import OrderSmallCard from "../OrderSmallCard/OrderSmallCard";
import { useAppDispatch } from '../../services/wsMiddleware';

function OrderFeed() {

  const dispatch = useAppDispatch();
  const { message, orders } = useAppSelector((state) => state.wsReducer);

  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    dispatch({ type: wsActions.wsInit, payload: `${wsUrlForUser}?token=${token}` });
  }, []);

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large" >
        Лента заказов
      </h1>

      {!message ? (
        <p>Идет загрузка</p>
      ) : (
      <div className={styles.scroll} >
        {typeof(message) !== 'undefined' && (message) !== null && orders.map((item: TOrderItem) => (
            <div key={item._id}>
              <OrderSmallCard 
                orderItem = {item}
              />
            </div>
          ))}
      </div>)}

    </section>
  );
}  

export default OrderFeed;
