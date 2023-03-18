import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, EmailInput, ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Preloader from '../../components/Preloader/Preloader';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { sendEmailToResetPassword, removeEmail } from '../../services/actions/resetPassword';

import styles from './forgotPasswordPage.module.css';

function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.authReducer);
  const { sendEmailRequest, sendEmailFailed, sendEmailRes } = useSelector(state => state.resetPasswordReducer);
  const [formEmail, setFormEmail] = useState({ email: '' });
  const onChange = e => {
    setFormEmail({ ...formEmail, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (sendEmailRes.success) {
    navigate("/reset-password");
    dispatch(removeEmail())}
  }, [sendEmailRes]);

  function handleSubmit() {
    dispatch(sendEmailToResetPassword(formEmail))
  }

  return (
    <div className={styles.container}>
      {((sendEmailRes !== {}) && !sendEmailRequest && !sendEmailFailed) ? (
        <>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <EmailInput 
              placeholder="Укажите e-mail" 
              value={formEmail.email} 
              name="email" 
              onChange={onChange} />
            <Button 
              htmlType="button" 
              type="primary" 
              size="large"
              onClick={handleSubmit}>
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
