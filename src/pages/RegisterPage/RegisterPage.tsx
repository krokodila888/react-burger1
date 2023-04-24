import React, { useCallback, useState, useEffect, ChangeEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Input, Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from '../../services/wsMiddleware';
import styles from './registerPage.module.css';
import { registerThunk, getUserDataThunk } from '../../services/actions/auth';
import { useAppDispatch } from '../../services/wsMiddleware';

type TFormRegister = {
  email: string;
  password: string;
  name: string;
}

function RegisterPage() {
  const [form, setValue] = useState<TFormRegister>({ email: '', password: '', name: ''  });
  const { user } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sendRegister, sendRegisterRequest, sendRegisterFailed } = useAppSelector((state) => state.authReducer);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    dispatch(registerThunk(form))
  }

  React.useEffect(() => {
    if (sendRegister && sendRegister.success && sendRegister.accessToken !== undefined && sendRegister.refreshToken !== undefined) {
      localStorage.setItem('accessToken', sendRegister.accessToken.replace('Bearer ', ''));
      localStorage.setItem('refreshToken', sendRegister.refreshToken);
      dispatch(getUserDataThunk());
      navigate("/")};
  }, [sendRegister]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e)=>handleRegister(e)}>
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
          htmlType="submit"
          type="primary" 
          size="large" >
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