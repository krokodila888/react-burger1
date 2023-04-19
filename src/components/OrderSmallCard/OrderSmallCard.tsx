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

type TOrderItem = {
  createdAt: string;
  ingredients: Array<TIngredient>;
  name: string;
  number: number; 
  status: string;
  updatedAt: string; 
  _id: string
}

type TOrderCardProps = {
  orderItem: TOrderItem
}

function OrderSmallCard (props: TOrderCardProps) {

  const {orderItem } = props;
  const { ingredients, ingredientsRequest } = useSelector((state: any) => state.ingredientsReducer);  
  //const { currentBurger } = useSelector((state: any) => state.currentBurgerReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemId: string = orderItem._id;

  function handleClick(ingredient: TIngredient) {
    dispatch(setCurrentIngredient(ingredient));
    console.log(ingredient);
    dispatch(setOnClick(ingredient));
    navigate(`/ingredients/:${ingredient._id}`)
  }

  /*function count() {
    if (ingredient.type === 'bun' && currentBurger.find((item: TIngredient) => (item._id === ingredient._id)))
    return 2;
    if (ingredient.type === 'bun' && !currentBurger.find((item: TIngredient) => (item._id === ingredient._id)))
    return 0;
    if ((ingredient.type === 'main' || 'sauce') && !currentBurger.find((item: TIngredient) => (item._id === ingredient._id)))
    return 0;
    if ((ingredient.type === 'main' || 'sauce') && currentBurger.find((item: TIngredient) => (item._id === ingredient._id)))
    return orderItem.ingredients.filter((item: TIngredient) => (item._id === ingredient._id)).length;
  }*/

  return (
    <li 
      className="ingredientCard__card"  
    >

    </li>
  )
}

export default OrderSmallCard;

/*
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
      */