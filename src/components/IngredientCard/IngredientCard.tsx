import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './IngredientCard.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropTypes} from "../../utils/constants";
import { setCurrentIngredient } from '../../services/actions/currentIngredient';
import { setOnClick } from '../../services/actions/location';
import { IIngredient, TIngredient } from '../../types/types';
import React, { FC } from 'react';

type TIngredientCardProps = {
  ingredient: TIngredient
}

function IngredientCard (props: TIngredientCardProps) {
  const {ingredient } = props;
  const { currentBurger } = useSelector((state: any) => state.currentBurgerReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemId: string = ingredient._id;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {itemId}
});

  function handleClick(ingredient: TIngredient) {
    dispatch(setCurrentIngredient(ingredient));
    dispatch(setOnClick(ingredient));
    navigate(`/ingredients/:${ingredient._id}`)
  }

  function count() {
    if (ingredient.type === 'bun' && currentBurger.find((item: TIngredient) => (item._id === ingredient._id)))
    return 2;
    if (ingredient.type === 'bun' && !currentBurger.find((item: TIngredient) => (item._id === ingredient._id)))
    return 0;
    if ((ingredient.type === 'main' || 'sauce') && !currentBurger.find((item: TIngredient) => (item._id === ingredient._id)))
    return 0;
    if ((ingredient.type === 'main' || 'sauce') && currentBurger.find((item: TIngredient) => (item._id === ingredient._id)))
    return currentBurger.filter((item: TIngredient) => (item._id === ingredient._id)).length;
  }

  return (
    <li 
      ref={dragRef} 
      className="ingredientCard__card" 
      onClick={() => handleClick(ingredient)} 
    >
      <img 
        src={ingredient.image} 
        alt="Изображение компонента бургера" 
        className="ingredientCard__image"/>
      { (count() > 0) && <Counter count={count()} size="default" extraClass="m-1"/>}
      <div className="ingredientCard__price pb-1 pt-1">
        <p className="text text_type_digits-default">
          {ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default ingredientCard__name">
        {ingredient.name}
      </p>
    </li>
  )
}

export default IngredientCard;

IngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired
};
