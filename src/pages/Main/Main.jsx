import React, { useState } from "react";
import AppHeader from '../../components/AppHeader/AppHeader.jsx';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients.jsx';
import styles from "./main.module.css";
import Preloader from '../../components/Preloader/Preloader';

function Main(props) {
  const { orderModalIsOpen, ingredientModalIsOpen, onClose, openOrderModal, handleIngredientClick } = props;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className={styles.page}>
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
            <BurgerIngredients 
              isOpen = {ingredientModalIsOpen}
              onClose = {onClose}
              handleIngredientClick = {handleIngredientClick} 
            />
            <BurgerConstructor 
              isOpen = {orderModalIsOpen}
              onClose = {onClose}
              openOrderModal = {openOrderModal}
            />
          </main>
        </DndProvider>
        <Preloader isLoading={isLoading} />
      </div>
    </>
  );
}

export default Main;
