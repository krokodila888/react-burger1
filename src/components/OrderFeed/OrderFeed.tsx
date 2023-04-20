import React, { FC } from "react";
import PropTypes from 'prop-types';
import styles from "./orderFeed.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from 'react-redux';
import { IIngredient, TIngredient } from '../../types/types';
import { wsActions } from "../../services/wsMiddleware";
import { wsUrl, wsUrlForUser } from "../../utils/constants";
//import OrderFeed from '../../components/OrderFeed/OrderFeed';
import { TMessageAllOrders, TOrderItem } from '../../types/types';
import OrderSmallCard from "../OrderSmallCard/OrderSmallCard";

function OrderFeed() {

  const { user } = useSelector((state: any) => state.authReducer);
  const { ingredients, ingredientsRequest } = useSelector((state: any) => state.ingredientsReducer);
  const [heightScroll, setHeightScroll] = React.useState(0);
  const dispatch = useDispatch();
  const { message, total, totalToday, orders } = useSelector((state: any) => state.wsReducer);

  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    dispatch({ type: wsActions.wsInit, payload: `${wsUrlForUser}?token=${token}` });
  }, []);

  React.useEffect(() => {
    if (message && message[0] !== null)
    console.log(message);
  }, [message]);

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
