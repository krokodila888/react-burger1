import React, { useCallback, useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, NavLink } from 'react-router-dom';
import { Input, Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profileOrdersPage.module.css';
import { getUserData, getNewToken, removeTokenRequest, updateUserData, removeUserData, removeLogOutData, logOut, removeLogin, removeRegister } from '../../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

function ProfileOrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, refreshToken, getUserDataRequestFailed } = useSelector(state => state.authReducer);
  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getUserData())
  }, []);

  useEffect(() => {
    if (getUserDataRequestFailed)
    {dispatch(getNewToken())}
  }, [getUserDataRequestFailed]);

  useEffect(() => {
    if (refreshToken.success) {
      localStorage.setItem('accessToken', refreshToken.accessToken.replace('Bearer ', ''));
      localStorage.setItem('refreshToken', refreshToken.refreshToken);
      dispatch(getUserData());
      removeTokenRequest();
    };
  }, [refreshToken]);

  useEffect(() => {
    if (user !== null)
    setValue({ name: user.name, email: user.email, password: '' });
  }, [user]);

  function handleLogout() {
    dispatch(logOut());
    dispatch(removeUserData());
    dispatch(removeLogOutData());
    dispatch(removeLogin());
    dispatch(removeRegister());
    localStorage.clear();
    navigate("/login")
  }

  function handleUpdateUser() {
    dispatch(updateUserData(form));
  }

  function handleCancel() {
    setValue({ name: user.name, email: user.email, password: '' })
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
      </div>
  );
}

export default ProfileOrderPage;
