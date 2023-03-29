import React from "react";
import { connect } from 'react-redux';
import "./OrderDetails.css";
import Done from "../../images/done.svg";
import { useSelector } from 'react-redux';
import Preloader from '../Preloader/Preloader';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function OrderDetails() {
  //const { sendOrderNumber, sendOrderRequest, sendOrderFailed } = useSelector(state => state.currentOrderReducer);
  const { sendOrderNumber, sendOrderRequest, sendOrderFailed } = useSelector((state: any) => state.currentOrderReducer);

  return (
    <div className="pic">
      {sendOrderRequest ? (
        <>
        <p className="text text_type_main-medium text_loading">
          Идет загрузка
        </p>
        <Preloader isLoading={sendOrderRequest} />
        </>
      ) 
      : (
        <>
          {sendOrderFailed ? (
            <>
              <h2 className="text text_type_main-medium orderDetails__text-error text_color_inactive">
                Произошла ошибка при обработке запроса. 
              </h2>
              <h2 className="text text_type_main-medium orderDetails__text-error text_color_inactive">
                Пожалуйста, попробуйте еще раз
              </h2>
              <CloseIcon type="primary"/>
            </>
          ) : (
            <>
              <h2 className="text text_type_digits-large orderDetails__title">
                {sendOrderNumber}
              </h2> 
              <h3 className="text text_type_main-medium orderDetails__id-text">
                идентификатор заказа
              </h3>
              <img src={Done} alt="Галочка, что все благополучно" className="orderDetails__image"></img>
              <div className="orderDetails__text-block">
                <p className="text text_type_main-default">
                  Ваш заказ начали готовить
                </p>
                <p className="text text_type_main-default text_color_inactive">
                  Дождитесь готовности на орбитальной станции
                </p>
              </div>
            </>
          )}
        </>
        )}
    </div>
  );
}

export default OrderDetails;
