import React from "react";
import { connect } from 'react-redux';
import styles from "./OrderInfo.module.css";
import Done from "../../images/done.svg";
import { useSelector } from 'react-redux';
import Preloader from '../Preloader/Preloader';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type ScriptEvent = () => void;

interface ILocationReducerState {
  onClick: any;
}

function OrderInfo() {
  const { createdAt, ingredients, name, number, status, updatedAt } = useSelector((state: any) => state.currentOrderInfoReducer.currentOrderInfo);

  return (
    <div className={styles.test}>
      
      <h2 className="text text_type_main-large pt-3">
        #{number}
      </h2>
      <h3 className="text text_type_main-medium pt-4">
        {name}
      </h3>

    </div>
  );
}

export default OrderInfo;
