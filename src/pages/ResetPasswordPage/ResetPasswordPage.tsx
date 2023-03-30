import React, { useCallback, useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import Preloader from '../../components/Preloader/Preloader';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './resetPassword.module.css';
import { resetPassword, removePassword } from '../../services/actions/resetPassword';

type TFormPassword = {
  password: string;
  token: string;
}

function ResetPasswordPage() {
  const dispatch = useDispatch() as any;
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.authReducer);
  const { sendPasswordRequest, sendPasswordFailed, sendPasswordRes, emailSend } = useSelector((state: any) => state.resetPasswordReducer);
  const [formPassword, setFormPassword] = useState<TFormPassword>({ password: '', token: '' });

  useEffect(() => {
    if (sendPasswordRes.success) {
    navigate("/");
    dispatch(removePassword())}
  }, [sendPasswordRes]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormPassword({ ...formPassword, [e.target.name]: e.target.value });
  };

  function handleSubmit() {
    console.log(formPassword);
    dispatch(resetPassword(formPassword))
  }

  return (
    <div className={styles.container}>
      {(!sendPasswordRequest && !sendPasswordFailed) ? (
          <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput 
          placeholder="Введите новый пароль" 
          value={formPassword.password}
          name="password"
          onChange={onChange}
          icon={'ShowIcon'} />
        <Input 
          placeholder="Введите код из письма" 
          value={formPassword.token} 
          name="token" 
          onChange={onChange} />
        <Button 
          htmlType="button" 
          type="primary" 
          size="large"
          onClick={handleSubmit}>
            Сохранить
        </Button>
      </form>
      <div className={styles.row}>
        <p className="text text_type_main-small text_color_inactive">Вспомнили пароль?</p>
        <Link to="/login" className={styles.link}>Войти</Link>
      </div>
      </>
        ) : (<>{sendPasswordRequest ? (
        <>
          <p className="text text_type_main-medium">
            Идет загрузка
          </p>
          <Preloader isLoading={sendPasswordRequest} />
          </>
      ) 
      : (
        <>
          {sendPasswordFailed ? (
            <>
              <h2 className="text text_type_main-medium orderDetails__text-error text_color_inactive">
                Произошла ошибка при обработке запроса. 
              </h2>
              <h2 className="text text_type_main-medium orderDetails__text-error text_color_inactive">
                Пожалуйста, попробуйте еще раз
              </h2>
              <CloseIcon type="primary"/>
            </>
          ) : (<></>)}
        </>
        )}
        </> )}
    </div>
  );
}

export default ResetPasswordPage;
