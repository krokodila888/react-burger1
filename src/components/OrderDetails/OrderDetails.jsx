import React from "react";
import "./OrderDetails.css";
import Done from "../../images/done.svg";

function OrderDetails() {

  return (
    <>
      <div>
        <h2 className="text text_type_digits-large orderDetails__title">
          034536
        </h2> 
      </div>
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
  );
}

export default OrderDetails;
