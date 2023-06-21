import React, { useState, FC } from "react";
import { useNavigate } from 'react-router-dom';
import { useDrop } from "react-dnd";
import styles from "./burgerConstructor.module.css";
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { setIngredient, removeIngredient, replaceIngredient, clearConstructor } from '../../services/actions/currentBurger';
import { v4 as uuidv4 } from 'uuid';
import FillingItem from "../FillingItem/FillingItem";
import { getUserDataThunk } from '../../services/actions/auth';
import { IIngredient, TIngredient } from '../../types/types';
import { useAppDispatch } from '../../services/wsMiddleware';
import { useAppSelector } from '../../services/wsMiddleware';

type ScriptEvent = () => void;
type ScriptEventModalOpen = (data: Array<string>) => void;

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.authReducer);
  const { ingredients, ingredientsRequest } = useAppSelector((state) => state.ingredientsReducer);
  const { currentBurger } = useAppSelector((state) => state.currentBurgerReducer);

  function gotBun() {
    return (currentBurger.filter((elem: TIngredient) => (elem !== undefined && elem.type === 'bun')).length > 0)
  }
  const [currentIngredients, setCurrentIngredients] = React.useState<TIngredient[]>([]);

  React.useEffect(() => {
    const aaa = currentBurger;
    if (gotBun())
    //let currentIngredients = structuredClone(currentBurger.slice(1));
    setCurrentIngredients(aaa.slice(1));
    else setCurrentIngredients(aaa.slice());
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

  const removeItem = React.useCallback((item: TIngredient) => {
    dispatch(removeIngredient(item));
  }, [dispatch]);


  function onDropHandler(data: TOnDropHandler) {
    if (ingredients !== null) {
    let currentItem: TIngredient | undefined = structuredClone(ingredients.find((item: TIngredient) => (item._id === data.itemId)));
    if (currentItem !== undefined && ingredients !== null)
    {currentItem.keyId = uuidv4();
    dispatch(setIngredient(currentItem));}}
  }

  const moveCard = React.useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = currentIngredients[dragIndex];
    const newCards = [...currentIngredients];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    dispatch(replaceIngredient(newCards))
  }, [currentIngredients, dispatch]);

  function bunPrice() {
    if (gotBun()) return (currentBurger.filter((item: TIngredient) => (item.type === 'bun'))[0].price)
    else return 0
  }

  function getPrice(): number {
    if (currentBurger !== undefined) {
      const prices = currentBurger.reduce((sum: number, elem: TIngredient) => {
      if (elem && elem !== null && elem !== undefined)
      {sum = sum + elem.price}
      return sum
    }, 0);
    return prices
    } else return 0
  };

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
        {((typeof(ingredients) !== 'undefined' && currentBurger[0] === undefined) || (currentBurger[0].type !== 'bun')) &&
          <p className={styles.p1}>
            Место для вашей булки
          </p>}
          {typeof(ingredients) !== 'undefined' && (ingredients) !== null && !ingredientsRequest && currentBurger[0] !== undefined && currentBurger[0].type === 'bun' &&
            <ConstructorElement 
              type="top"
              isLocked={true}
              text={currentBurger[0].name + ' (верх)'}
              price={currentBurger[0].price}
              thumbnail={currentBurger[0].image_mobile}
            />
          }
        </li>
        <div className={styles.scroll} >
        {(typeof(ingredients) !== 'undefined' && currentBurger.filter((elem: TIngredient) => (elem !== undefined && elem.type !== 'bun')).length === 0) && 
          <p className={styles.p2}>
            Перетащите ингредиенты сюда
          </p>}
        {typeof(ingredients) !== 'undefined' && (ingredients) !== null && currentBurger.filter((elem: TIngredient) => (elem !== undefined && elem.type !== 'bun')).map((item: TIngredient, index: number) => (
          <FillingItem 
            item={item} 
            removeItem={removeItem} 
            key={item.keyId}
            moveCard={moveCard}
            index={index} />
        ))}
        </div>
        <li className={styles.fun}>
        {((typeof(ingredients) !== 'undefined' && currentBurger[0] === undefined) || (currentBurger[0].type !== 'bun')) &&
          <p className={styles.p3}>
            Место для вашей булки
          </p>}
          {typeof(ingredients) !== 'undefined' && (ingredients) !== null && !ingredientsRequest && currentBurger[0] !== undefined && currentBurger[0].type === 'bun' &&
            <ConstructorElement 
              type="bottom"
              isLocked={true}
              text={currentBurger[0].name + ' (низ)'}
              price={currentBurger[0].price}
              thumbnail={currentBurger[0].image_mobile}
            />
          }
        </li>
      </ul>
      <div className={styles.sum} test-id='burgerConstructorButton'>
        {typeof(ingredients) !== 'undefined' && (ingredients) !== null && 
        <>
          <p className="text text_type_digits-medium">
            {getPrice() + bunPrice()}
          </p>
          <CurrencyIcon type="primary" />
        </>
        }
        {currentBurger[1] !== undefined && gotBun() && 
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
