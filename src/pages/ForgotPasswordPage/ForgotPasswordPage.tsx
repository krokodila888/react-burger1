import React, { useCallback, useState, useEffect, ChangeEvent } from 'react';
import { useAppSelector } from '../../services/wsMiddleware';
import { Link, useNavigate } from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import Preloader from '../../components/Preloader/Preloader';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { sendEmailToResetPasswordThunk, removeEmail, removePassword } from '../../services/actions/resetPassword';
import { useAppDispatch } from '../../services/wsMiddleware';

import styles from './forgotPasswordPage.module.css';

type TEmail = {
  email: string;
}

function ForgotPasswordPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.authReducer);
  const { sendEmailRequest, sendEmailFailed, sendEmailRes, sendPasswordRes } = useAppSelector((state) => state.resetPasswordReducer);
  const [formEmail, setFormEmail] = useState<TEmail>({ email: '' });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormEmail({ ...formEmail, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (sendPasswordRes !== null && sendPasswordRes.success) {
    dispatch(removePassword())}
  }, [sendPasswordRes]);

  useEffect(() => {
    if (sendEmailRes !== null && sendEmailRes.success) {
    navigate("/reset-password");
    dispatch(removeEmail())}
  }, [sendEmailRes]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(sendEmailToResetPasswordThunk(formEmail))
  }

  return (
    <div className={styles.container}>
      {(!sendEmailRequest && !sendEmailFailed) ? (
        <>
          <form className={styles.form} onSubmit={(e)=>handleSubmit(e)}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <EmailInput 
              placeholder="Укажите e-mail" 
              value={formEmail.email} 
              name="email" 
              onChange={onChange} />
            <Button 
              htmlType="submit"  
              type="primary" 
              size="large">
                Восстановить
            </Button>
          </form>
          <div className={styles.row}>
            <p className="text text_type_main-small text_color_inactive">Вспомнили пароль?</p>
            <Link to="/login" className={styles.link}>Войти</Link>
          </div>
        </>
        ) : (<>{sendEmailRequest ? (
        <>
          <p className="text text_type_main-medium">
            Идет загрузка
          </p>
          <Preloader isLoading={sendEmailRequest} />
          </>
      ) 
      : (
        <>
          {sendEmailFailed && (
            <>
              <h2 className="text text_type_main-medium orderDetails__text-error text_color_inactive">
                Произошла ошибка при обработке запроса. 
              </h2>
              <h2 className="text text_type_main-medium orderDetails__text-error text_color_inactive">
                Пожалуйста, попробуйте еще раз
              </h2>
              <CloseIcon type="primary"/>
            </>
          )}
        </>
        )}
        </> )}
      </div>
  );
}

export default ForgotPasswordPage;
