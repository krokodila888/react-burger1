import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import './IngredientCard.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientCard(props) {
  const {ingredient, onIngredientClick } = props;
  //const {name, price, image} = ingredient;

  function handleClick(ingredient) {
    onIngredientClick(ingredient);
  }

  return (
    <li className="ingredientCard__card" onClick={() => handleClick(ingredient)} >
      <img src={ingredient.image} alt="Изображение компонента бургера" className="ingredientCard__image"/>
      <Counter count={1} size="default" extraClass="m-1"/>
        <div className="ingredientCard__price pb-1 pt-1">
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default ingredientCard__name">{ingredient.name}</p>
    </li>
  )
}

export default IngredientCard;

IngredientCard.propTypes = {
  ingredient: PropTypes.object,
  onIngredientClick: PropTypes.func,
}; 