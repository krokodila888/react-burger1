import React, { useState } from "react";
import AppHeader from '../AppHeader/AppHeader.jsx';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import styles from "./app.module.css";
import Preloader from '../Preloader/Preloader';
import { useDispatch } from 'react-redux';
import { sendNewOrder1 } from '../../services/actions/sendOrder';
import { removeCurrentIngredient } from '../../services/actions/currentIngredient';
import { removeOrder } from '../../services/actions/sendOrder';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [orderModalIsOpen, setOrderModalIsOpen] = React.useState(false);
  const [ingredientModalIsOpen, setIngredientModalIsOpen] = React.useState(false);

  const dispatch = useDispatch();

  function openOrderModal(data) {
    dispatch(sendNewOrder1(data));
    setOrderModalIsOpen(true)
  }

  function handleIngredientClick(data) {
    if (data) return (
      setIngredientModalIsOpen(true));
  }

  function closeModal() {
    setOrderModalIsOpen(false);
    setIngredientModalIsOpen(false);
    dispatch(removeCurrentIngredient());
    dispatch(removeOrder());
  }

  return (
    <>
      <div className={styles.page}>
        <AppHeader/>
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
            <BurgerIngredients 
              isOpen = {ingredientModalIsOpen}
              onClose = {closeModal}
              handleIngredientClick = {handleIngredientClick} 
            />
            <BurgerConstructor 
              isOpen = {orderModalIsOpen}
              onClose = {closeModal}
              openOrderModal = {openOrderModal}
            />
          </main>
        </DndProvider>
        <Preloader isLoading={isLoading} />
      </div>
    </>
  );
}

export default App;
