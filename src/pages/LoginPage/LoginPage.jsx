import React, { useCallback, useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, PasswordInput, EmailInput, ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { login, getUserData } from '../../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

import styles from './loginPage.module.css';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.authReducer);
  const [form, setValue] = useState({ email: '', password: '' });
  const { sendLogin, sendLoginRequest, sendLoginFailed } = useSelector(state => state.authReducer);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  function handleLogin() {
    console.log(form);
    dispatch(login(form));
  }

  useEffect(() => {
    if (sendLogin.success) {
      /*console.log(sendLogin);
      console.log(localStorage);
      console.log(sendLogin.accessToken);
      console.log(sendLogin.refreshToken);*/
      localStorage.setItem('accessToken', sendLogin.accessToken.replace('Bearer ', ''));
      localStorage.setItem('refreshToken', sendLogin.refreshToken);
      dispatch(getUserData());
      navigate("/")};
    }, [sendLogin]);

  useEffect(() => {
    console.log(localStorage.getItem('accessToken'))
  }, [sendLogin]);

  return (
      <div className={styles.container}>
        <form className={styles.form}>
          <h1 className="text text_type_main-medium">Вход</h1>
          <EmailInput 
            placeholder="E-mail" 
            value={form.email} 
            name="email" 
            onChange={onChange} />
          <PasswordInput 
            placeholder="Пароль"
            value={form.password}
            name="password"
            onChange={onChange}
            icon={'ShowIcon'} />
          <Button 
            htmlType="button" 
            type="primary" 
            size="large"
            onClick={handleLogin}>
            Войти
          </Button>
        </form>
        <div className={styles.row}>
          <p className="text text_type_main-small text_color_inactive">Вы - новый пользователь?</p>
          <Link to="/register" className={styles.link}> Зарегистрироваться</Link>
        </div>
        <div className={styles.row}>
          <p className="text text_type_main-small text_color_inactive pt-4">Забыли пароль? </p>
          <Link to="/forgot-password" className={styles.link}> Восстановить пароль</Link>
        </div>
      </div>
  );
}

export default LoginPage;
