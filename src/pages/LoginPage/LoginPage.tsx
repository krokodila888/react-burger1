import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { loginThunk, getUserDataThunk } from '../../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

import styles from './loginPage.module.css';

type TFormLogin = {
  email: string;
  password: string; 
}

function LoginPage() {
  const dispatch = useDispatch() as any;
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.authReducer);
  const [form, setValue] = useState<TFormLogin>({ email: '', password: '' });
  const { sendLogin, sendLoginRequest, sendLoginFailed } = useSelector((state: any) => state.authReducer);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (e.target !== null)
    setValue({ ...form, [name]: value });
  };

  function handleLogin() {
    dispatch(loginThunk(form));
  }

  useEffect(() => {
    if (sendLogin.success) {
      localStorage.setItem('accessToken', sendLogin.accessToken.replace('Bearer ', ''));
      localStorage.setItem('refreshToken', sendLogin.refreshToken);
      dispatch(getUserDataThunk());
      navigate(-1);
 } }, [sendLogin]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
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
