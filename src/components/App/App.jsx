import React, { useEffect, useState } from "react";
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import styles from "./app.module.css";
import { api } from '../../utils/Api';
import Preloader from '../Preloader/Preloader';

function App() {

  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderModalIsOpen, setOrderModalIsOpen] = React.useState(false);
  const [ingredientModalIsOpen, setIngredientModalIsOpen] = React.useState(false);
  const [selectedIngredient, setSelectedIngredient] = React.useState();

  function getAllIngredients() {
    setIsLoading(true);
    api.getIngredients()
      .then((res) => {
        setIngredients(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err)})
      .then(() => {
        setIsLoading(() => false)
      })
  }

  useEffect(() => {
    getAllIngredients()
  }, [])

  function openOrderModal() {
    setOrderModalIsOpen(true)
  }

  function openIngredientModal() {
    setIngredientModalIsOpen(true)
  }

  function handleIngredientClick(data) {
    if (data) return (openIngredientModal(), 
    setSelectedIngredient(data));
  }

  function closeModal() {
    setOrderModalIsOpen(false);
    setIngredientModalIsOpen(false);
  }

  return (
    <>
      <div className={styles.page}>
        <AppHeader/>
        <main className={styles.main}>
          <BurgerIngredients 
            ingredients={ingredients}
            isOpen = {ingredientModalIsOpen}
            onClose = {closeModal}
            selectedIngredient = {selectedIngredient}
            handleIngredientClick = {handleIngredientClick} 
          />
          <BurgerConstructor 
            ingredients={ingredients}
            isOpen = {orderModalIsOpen}
            onClose = {closeModal}
            openOrderModal = {openOrderModal}
          />
        </main>
        <Preloader isLoading={isLoading} />
        
      </div>
    </>
  );
}

export default App;
