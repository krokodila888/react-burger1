import React, { useState, FC } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDrop } from "react-dnd";
import styles from "./burgerConstructor.module.css";
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useSelector, useDispatch } from 'react-redux';
import { setIngredient, removeIngredient, replaceIngredient, clearConstructor } from '../../services/actions/currentBurger';
import { v4 as uuidv4 } from 'uuid';
import FillingItem from "../FillingItem/FillingItem";
import { getUserDataThunk } from '../../services/actions/auth';
import { IIngredient, TIngredient } from '../../types/types';

type ScriptEvent = () => void;
type ScriptEventModalOpen = (data: boolean) => void;

type TMoveCard = (dragIndex: number | undefined, hoverIndex: number) => void;

type TDragIndex = number | string;

type TBurgerConstructorProps = {
  isOpen: boolean;
  onClose: ScriptEvent; 
  openOrderModal: ScriptEventModalOpen;
}

type TOnDropHandler = {
  itemId: string;
}

const BurgerConstructor: FC<TBurgerConstructorProps> = ({ isOpen, onClose, openOrderModal }) => {
  const dispatch = useDispatch() as any;
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.authReducer);
  const { ingredients, ingredientsRequest } = useSelector((state: any) => state.ingredientsReducer);

  const { currentBurger } = useSelector((state: any) => state.currentBurgerReducer);

  const [currentIngredients, setCurrentIngredients] = React.useState<TIngredient[]>([]);

  React.useEffect(() => {
    let currentIngredients = structuredClone(currentBurger.slice(1));
    setCurrentIngredients(currentIngredients)
  }, [currentBurger]);

  React.useEffect(() => {
    getUserDataThunk()
  }, []);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId: TOnDropHandler) {
      onDropHandler(itemId);
    },
  });

  const removeItem: FC<TIngredient> = (item) => {
    return dispatch(removeIngredient(item));
  }

  function onDropHandler(data: TOnDropHandler) {
    let currentItem: TIngredient | undefined = structuredClone(ingredients.find((item: TIngredient) => (item._id === data.itemId)));
    if (currentItem !== undefined) 
    {currentItem.keyId = uuidv4();}
    dispatch(setIngredient(currentItem));
  }

  const moveCard = React.useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = currentIngredients[dragIndex];
    const newCards = [...currentIngredients];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    dispatch(replaceIngredient(newCards))
}, [currentIngredients, dispatch]);

  function handleOrder() {
    let arr = currentBurger.concat(currentBurger[0]).map((item: TIngredient) => (item._id));
    if (user === null || localStorage.getItem('accessToken') === null) {
      navigate('/login')
    } else {
      openOrderModal(arr);
      dispatch(clearConstructor());
    }
  }

  return (
    <section className={styles.section}>
      <ul className={styles.ul} id='BurgerConstructor' ref={dropTarget}>
        <li className={styles.fun}>
          {typeof(ingredients) !== 'undefined' && (ingredients) !== null && !ingredientsRequest &&
            <ConstructorElement 
              type="top"
              isLocked={true}
              text={currentBurger[0].name}
              price={currentBurger[0].price}
              thumbnail={currentBurger[0].image_mobile}
            />
          }
        </li>
        <div className={styles.scroll} >
        {typeof(ingredients) !== 'undefined' && currentBurger[1] === undefined && 
          <p className={styles.text}>
            Перетащите ингредиенты сюда
          </p>}
        {typeof(ingredients) !== 'undefined' && (ingredients) !== null && currentBurger.slice(1).map((item: TIngredient, index: any) => (
          <FillingItem 
            item={item} 
            removeItem={removeItem} 
            key={item.keyId}
            moveCard={moveCard}
            index={index} />
        ))}
        </div>
        <li className={styles.fun}>
          {typeof(ingredients) !== 'undefined' && (ingredients) !== null &&
            <ConstructorElement 
              type="bottom"
              isLocked={true}
              text={currentBurger[0].name}
              price={currentBurger[0].price}
              thumbnail={currentBurger[0].image_mobile}
            />
          }
        </li>
      </ul>
      <div className={styles.sum}>
        {typeof(ingredients) !== 'undefined' && (ingredients) !== null && 
        <>
          <p className="text text_type_digits-medium">
            {(currentBurger[0].price) + (currentBurger.reduce((a: number, item: TIngredient) => a + item.price, 0))}
          </p>
          <CurrencyIcon type="primary" />
        </>
        }
        {currentBurger[1] !== undefined && 
        <Button htmlType="button" type="primary" size="medium" onClick={handleOrder}> 
          Оформить заказ
        </Button>}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}>
          <OrderDetails />
      </Modal>
    </section>
  );
}  

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  openOrderModal: PropTypes.func.isRequired
}; 
