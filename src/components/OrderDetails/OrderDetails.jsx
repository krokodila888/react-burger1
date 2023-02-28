import React from "react";
import { connect } from 'react-redux';
import "./OrderDetails.css";
import Done from "../../images/done.svg";
import { useSelector } from 'react-redux';
import { sendNewOrder1 } from '../../services/actions/sendOrder';

function OrderDetails() {
  const { sendOrderNumber, sendOrderRequest } = useSelector(state => state.currentOrderReducer);

  return (
    <>
      <div>
      {sendOrderRequest ? (
        <p>Идет загрузка</p>
      ) : (
        <h2 className="text text_type_digits-large orderDetails__title">
        {sendOrderNumber}
        </h2> )}
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

const mapStateToProps = (store, ownProps) => {
  return { 
    sendOrderNumber: store.sendOrderNumber
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendOrder: () => dispatch(sendNewOrder1()),
  };
}; 

export default connect(mapDispatchToProps, mapStateToProps) (OrderDetails);
