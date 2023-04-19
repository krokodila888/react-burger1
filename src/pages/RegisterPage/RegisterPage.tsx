import React, { useCallback, useState, useEffect, ChangeEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Input, Button, PasswordInput, EmailInput, ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux';
import styles from './registerPage.module.css';
import { registerThunk, getUserDataThunk } from '../../services/actions/auth';

type TFormRegister = {
  email: string;
  password: string;
  name: string;
}

function RegisterPage() {
  const [form, setValue] = useState<TFormRegister>({ email: '', password: '', name: ''  });
  //const { user } = useSelector(state => state.authReducer);
  const { user } = useSelector((state: any) => state.authReducer);
  const dispatch = useDispatch() as any;
  const navigate = useNavigate();
  //const { sendRegister, sendRegisterRequest, sendRegisterFailed } = useSelector(state => state.authReducer);
  const { sendRegister, sendRegisterRequest, sendRegisterFailed } = useSelector((state: any) => state.authReducer);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  function handleRegister() {
    console.log(form);
    dispatch(registerThunk(form))
  }

  /*useEffect(() => {
    if (user !== null)
    navigate("/");
  }, []);*/

  React.useEffect(() => {
    if (sendRegister.success) {
      localStorage.setItem('accessToken', sendRegister.accessToken.replace('Bearer ', ''));
      localStorage.setItem('refreshToken', sendRegister.refreshToken);
      dispatch(getUserDataThunk());
      navigate("/")};
  }, [sendRegister]);

  return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleRegister}>
          <h1 className="text text_type_main-medium">Регистрация</h1>
          <Input 
            placeholder="Имя" 
            value={form.name} 
            name="name" 
            onChange={onChange} />
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
            onClick={handleRegister}>
            Зарегистрироваться
          </Button>
        </form>
        <div className={styles.row}>
          <p className="text text_type_main-small text_color_inactive">Уже зарегистрированы?</p>
          <Link to="/login" className={styles.link}>Войти</Link>
        </div>
      </div>
  );
}

export default RegisterPage;