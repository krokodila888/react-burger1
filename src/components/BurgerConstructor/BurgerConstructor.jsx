import React from "react";
import PropTypes from 'prop-types';
import styles from "./burgerConstructor.module.css";
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal.jsx";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";

function BurgerConstructor(props) {
  const { buns, filling, sauce, isOpen, onClose, openOrderModal } = props;

  return (
    <section className={styles.section}>
      <ul className={styles.ul} id='BurgerConstructor'>
        <li className={styles.li}>
          <DragIcon type="primary" />
          {typeof(buns[0]) !== 'undefined' && (filling) !== null &&
            <ConstructorElement 
              type="top"
              isLocked={true}
              text={buns[0].name}
              price={buns[0].price}
              thumbnail={buns[0].image}
            />
          }
        </li>
        <div className={styles.scroll}>
        {typeof(filling[0]) !== 'undefined' && (filling) !== null && filling.map((item) => (
          <li key={item._id} className={styles.li}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
        {typeof(sauce[0]) !== 'undefined' && (sauce) !== null && sauce.map((item) => (
          <li key={item._id} className={styles.li}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
        </div>
        <li className={styles.li}>
          <DragIcon type="primary" />
          {typeof(buns[0]) !== 'undefined' && (filling) !== null &&
            <ConstructorElement 
              type="bottom"
              isLocked={true}
              text={buns[0].name}
              price={buns[0].price}
              thumbnail={buns[0].image}
            />
          }
        </li>
      </ul>
      <div className={styles.sum}>
      {typeof(sauce[0]) !== 'undefined' && (sauce) !== null && <p className="text text_type_digits-medium">{(buns[0].price * 2) + (filling.reduce((a, item) => a + item.price, 0)) + (sauce.reduce((a, item) => a + item.price, 0))}</p>
        }
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="medium" onClick={openOrderModal}>
          Оформить заказ
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        children={
          <OrderDetails/>}>
      </Modal>
    </section>
  );
}  

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  buns: PropTypes.array,
  filling: PropTypes.array,
  sauce: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}; 
