import React, { FC } from "react";
import PropTypes from 'prop-types';
import styles from "./orderFeed.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from '../IngredientCard/IngredientCard';
import { useSelector, useDispatch } from 'react-redux';
import { IIngredient, TIngredient } from '../../types/types';
import { wsActions } from "../../services/wsMiddleware";
import { wsUrl, wsUrlForUser } from "../../utils/constants";
//import OrderFeed from '../../components/OrderFeed/OrderFeed';
import { TMessageAllOrders, TOrderItem } from '../../types/types';

function OrderFeed() {

  const { user } = useSelector((state: any) => state.authReducer);
  const { ingredients, ingredientsRequest } = useSelector((state: any) => state.ingredientsReducer);
  const [heightScroll, setHeightScroll] = React.useState(0);
  const dispatch = useDispatch();
  const { message, total, totalToday, orders } = useSelector((state: any) => state.wsReducer);

  React.useEffect(() => {
    console.log('AAA');
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    dispatch({ type: wsActions.wsInit, payload: `${wsUrlForUser}?token=${token}` });
  }, []);

  React.useEffect(() => {
    if (message && message[0] !== null)
    console.log(message);
  }, [message]);
  
/*  function getPosition() {
    if (fillingsBlock.current) {
    let currentHeightScroll = fillingsBlock.current.scrollTop;
    setHeightScroll(currentHeightScroll);}
  };

  function setPosition() {
    if (heightScroll < 130)
    setCurrent('bunsScroll');
    if (heightScroll >= 130 && heightScroll < 540)
    setCurrent('sauceScroll');
    if (heightScroll >= 540)
    setCurrent('fillingScroll');
  };*/

/*  React.useEffect(() => {
    getPosition();
    console.log(ingredients);
  }, []);

  React.useEffect(() => {
    setPosition();
  }, [heightScroll]);*/
  
  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large" >
        Лента заказов
      </h1>

      {ingredientsRequest ? (
        <p>Идет загрузка</p>
      ) : (
      <div className={styles.scroll} >

      </div>)}

    </section>
  );
}  

export default OrderFeed;
