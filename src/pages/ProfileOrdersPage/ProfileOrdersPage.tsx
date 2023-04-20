import React, { useCallback, useState, useEffect, ChangeEvent } from 'react';
import { Link, Navigate, useNavigate, NavLink } from 'react-router-dom';
import { Input, Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profileOrdersPage.module.css';
import { getUserDataThunk, getNewTokenThunk, removeTokenRequest, updateUserDataThunk, removeUserData, removeLogOutData, logoutThunk, removeLogin, removeRegister } from '../../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import { wsUrl, wsUrlForUser } from "../../utils/constants";
import { wsActions } from "../../services/wsMiddleware";
import { TOrderItem } from '../../types/types';
import OrderProfileCard from "../../components/OrderProfileCard/OrderProfileCard";
import Modal from "../../components/Modal/Modal";
import OrderInfo from "../../components/OrderInfo/OrderInfo";

type TFormOrderProfile = {
  name: string;
  email: string;
  password: string;
}

function ProfileOrderPage() {
  const dispatch = useDispatch() as any;
  const navigate = useNavigate();
  //const { user, refreshToken, getUserDataRequestFailed } = useSelector(state => state.authReducer);
  const { user, refreshToken, getUserDataRequestFailed } = useSelector((state: any) => state.authReducer);
  const [form, setValue] = useState<TFormOrderProfile>({ name: '', email: '', password: '' });
  const { message, total, totalToday, orders } = useSelector((state: any) => state.wsReducer);
  const copied = structuredClone(orders).reverse();

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

  useEffect(() => {
    dispatch(getUserDataThunk())
  }, []);

  useEffect(() => {
    if (getUserDataRequestFailed)
    {dispatch(getNewTokenThunk())}
  }, [getUserDataRequestFailed]);

  useEffect(() => {
    if (refreshToken.success) {
      localStorage.setItem('accessToken', refreshToken.accessToken.replace('Bearer ', ''));
      localStorage.setItem('refreshToken', refreshToken.refreshToken);
      dispatch(getUserDataThunk());
      removeTokenRequest();
    };
  }, [refreshToken]);

  function handleLogout() {
    dispatch(logoutThunk());
    dispatch(removeUserData());
    dispatch(removeLogOutData());
    dispatch(removeLogin());
    dispatch(removeRegister());
    localStorage.clear();
    navigate("/login")
  }

  return (
      <div className={styles.container}>
        <div className={styles.column}>
          <NavLink to="/profile" end={true} className={({ isActive }) => 
            (isActive ? styles.active : "text_type_main-medium text_color_inactive")} >
            Профиль
          </NavLink>
          <NavLink to="/profile/orders" end={true} className={({ isActive }) => 
            (isActive ? styles.active : "text_type_main-medium text_color_inactive")}>
            История заказов
          </NavLink>
          <NavLink to="/login" onClick={handleLogout} className={({ isActive }) => 
            (isActive ? styles.active : "text_type_main-medium text_color_inactive")}>
            Выход
          </NavLink>
        </div>
        {!message ? (
        <p>Идет загрузка</p>
      ) : (
      <div className={styles.scroll} >
        {message.success && typeof(message) !== 'undefined' && (message) !== null && copied.map((item: TOrderItem, index: number) => (
            <div key={index}>
              <OrderProfileCard 
                orderItem = {item}
              />
            </div>
          ))}
      </div>)}
    </div>
  );
}

export default ProfileOrderPage;
