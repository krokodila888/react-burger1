import React from "react";
import PropTypes from 'prop-types';
import styles from "./burgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from '../IngredientCard/IngredientCard.jsx';
import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";

function BurgerIngredients(props) {
  const { ingredients, buns, filling, sauce, isOpen, onClose, selectedIngredient, handleIngredientClick } = props;
  const [current, setCurrent] = React.useState("one");

  function handleClick(data) {
    handleIngredientClick(data);
  }
  
  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large">
        Соберите бургер
      </h1>
      <nav className={styles.nav}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>
      <div className={styles.scroll}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={styles.ul}>
          {typeof(ingredients) !== 'undefined' && (buns) !== null && buns.map((item) => (
            <div key={item._id}>
              <IngredientCard 
                ingredient = {item}
                onIngredientClick = {handleIngredientClick}
              />
            </div>
          ))}
        </ul>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={styles.ul}>
          {typeof(sauce) !== 'undefined' && (sauce) !== null && sauce.map((item) => (
            <div key={item._id}>
              <IngredientCard 
                ingredient = {item}                
                onIngredientClick = {handleIngredientClick}
              />
            </div>
          ))}
        </ul>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={styles.ul}>
          {typeof(filling) !== 'undefined' && (filling) !== null && filling.map((item) => (
            <div key={item._id}>
              <IngredientCard 
                ingredient = {item}
                onIngredientClick = {handleClick}
              />
            </div>
          ))}
        </ul>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
          children={
          <IngredientDetails
            selectedIngredient={selectedIngredient}
          />}>
      </Modal>
      <div id="react-modals"></div>
    </section>
  );
}  

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  ingredients: PropTypes.array,
  buns: PropTypes.array.isRequired,
  filling: PropTypes.array.isRequired,
  sauce: PropTypes.array.isRequired,
  handleIngredientClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedIngredient: PropTypes.object,
};
