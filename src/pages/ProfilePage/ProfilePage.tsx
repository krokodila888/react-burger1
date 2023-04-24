import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Input, Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profilePage.module.css';
import { getUserDataThunk, getNewTokenThunk, removeTokenRequest, updateUserDataThunk, removeUserData, removeLogOutData, logoutThunk, removeLogin, removeRegister } from '../../services/actions/auth';
import { useAppSelector } from '../../services/wsMiddleware';
import { useAppDispatch } from '../../services/wsMiddleware';

type TFormProfile = {
  name: string;
  email: string;
  password: string;
}

function ProfilePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, refreshToken, getUserDataRequestFailed } = useAppSelector((state) => state.authReducer);
  const [form, setValue] = useState<TFormProfile>({ name: '', email: '', password: '' });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getUserDataThunk())
  }, []);

  useEffect(() => {
    if (getUserDataRequestFailed)
    {dispatch(getNewTokenThunk())}
  }, [getUserDataRequestFailed]);

  useEffect(() => {
    if (refreshToken && refreshToken.success && refreshToken.accessToken !== undefined && refreshToken.refreshToken !== undefined) {
      localStorage.setItem('accessToken', refreshToken.accessToken.replace('Bearer ', ''));
      localStorage.setItem('refreshToken', refreshToken.refreshToken);
      dispatch(getUserDataThunk());
      removeTokenRequest();
    };
  }, [refreshToken]);

  useEffect(() => {
    if (user !== null && user !== undefined)
    setValue({ name: user.name, email: user.email, password: '' });
  }, [user]);

  function handleLogout() {
    dispatch(logoutThunk());
    dispatch(removeUserData());
    dispatch(removeLogOutData());
    dispatch(removeLogin());
    dispatch(removeRegister());
    localStorage.clear();
    navigate("/login")
  }

  function handleUpdateUser(e: React.FormEvent) {
    e.preventDefault();
    dispatch(updateUserDataThunk(form));
  }

  function handleCancel() {
    if (user)
    setValue({ name: user.name, email: user.email, password: '' })
  }

  return (
      <div className={styles.container}>
        <div className={styles.column}>
          <NavLink to="/profile" className={({ isActive }) => 
            (isActive ? styles.active : "text_type_main-medium text_color_inactive")} >
            Профиль
          </NavLink>
          <NavLink to="/profile/orders" className={({ isActive }) => 
            (isActive ? styles.active : "text_type_main-medium text_color_inactive")}>
            История заказов
          </NavLink>
          <NavLink to="/login" onClick={handleLogout} className={({ isActive }) => 
            (isActive ? styles.active : "text_type_main-medium text_color_inactive")}>
            Выход
          </NavLink>
        </div>
        <form className={styles.form} onSubmit={(e)=>handleUpdateUser(e)}>
          <Input 
            placeholder="Имя" 
            value={form.name} 
            name="name" 
            onChange={onChange}
            icon={'EditIcon'} />
          <EmailInput 
            placeholder="E-mail" 
            value={form.email} 
            name="email" 
            onChange={onChange}/>
          <PasswordInput 
            placeholder="Пароль"
            value={form.password}
            name="password"
            onChange={onChange}
            icon={'EditIcon'} />
          {(user !== null && user !== undefined && (form.email !== user.email || form.name !== user.name || form.password !== '')) ? 
            (<>
            <Button 
              htmlType="submit" 
              type="primary" 
              size="medium"> 
                Сохранить
            </Button>
            <Button 
              htmlType="button" 
              type="primary" 
              size="medium" 
              onClick={handleCancel}> 
                Отмена
            </Button>
        </>) : (<></>)}
        </form>
      </div>
  );
}

export default ProfilePage;
