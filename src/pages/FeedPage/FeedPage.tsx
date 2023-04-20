import React, { useCallback, useState, useEffect, ChangeEvent } from 'react';
import { Link, Navigate, useNavigate, NavLink } from 'react-router-dom';
import './FeedPage.css';
import { getUserDataThunk, getNewTokenThunk, removeTokenRequest, updateUserDataThunk, removeUserData, removeLogOutData, logoutThunk, removeLogin, removeRegister } from '../../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import { wsActions } from "../../services/wsMiddleware";
import { wsUrl } from "../../utils/constants";
import OrderFeed from '../../components/OrderFeed/OrderFeed';
import { TOrderItem } from '../../types/types';

function FeedPage() {
  const dispatch = useDispatch() as any;
  const navigate = useNavigate();
  const { message, total, totalToday, orders } = useSelector((state: any) => state.wsReducer);
  const { user, refreshToken, getUserDataRequestFailed } = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    dispatch({ type: wsActions.wsInit, payload: wsUrl });
  }, []);

  useEffect(() => {
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

  function setColumnWidth() {
    const num = orders.filter((item: TOrderItem) => {return (item.status === "done")}).length;
    if (num > 40) return '350px';
    if (num > 30 && num < 41) return '280px';
    if (num > 20 && num < 31) return '210px';
  }

  return (
    <div className='feedPage__container'>
      <OrderFeed/>
      <div className='feedPage__second-column'>
        <div className='feedPage__row'>
          <div style={{display: 'flex', flexDirection: 'column', width: `${setColumnWidth()}`}}>
            <p className='feedPage__text1 text_type_main-medium'>Готовы:</p>
              <div className='feedPage__column2'>
                {typeof(orders) !== 'undefined' && (orders[0] !== null) && orders.filter((item: TOrderItem) => {return (item.status === "done")}).map((item: TOrderItem) => (
                <p key={item._id} className="text text_type_digits-default feedPage__digits-num feedPage__num">{item.number}
                </p>
          ))}
            </div>
          </div>
            <div className='feedPage__column1'>
            <p className='feedPage__text1 text_type_main-medium'>В работе:</p>
              <div className='feedPage__column2'>
              {typeof(orders) !== 'undefined' && (orders[0] !== null) && orders.filter((item: TOrderItem) => {return (item.status !== "done")}).map((item: TOrderItem) => (
                <p key={item._id} className="text text_type_digits-default feedPage__num">{item.number}
            </p>
          ))}
            </div>
          </div>
        </div>
        <div>
          <p className='text_type_main-medium feedPage__text'>Выполнено за все время:</p>
          <p className='text_type_digits-large feedPage__text feedPage__text-glow'>{total}</p>
        </div>
        <div>
          <p className='text_type_main-medium feedPage__text'>Выполнено за сегодня:</p>
          <p className='text_type_digits-large feedPage__text feedPage__text-glow'>{totalToday}</p>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
