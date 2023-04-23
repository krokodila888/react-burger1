import { useDrag } from "react-dnd";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './IngredientCard.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { setCurrentIngredient } from '../../services/actions/currentIngredient';
import { setOnClick, setItemType } from '../../services/actions/location';
import { IIngredient, TIngredient } from '../../types/types';
import React, { FC } from 'react';
import { useAppDispatch } from '../../services/wsMiddleware';
import { useAppSelector } from '../../services/wsMiddleware';

type TIngredientCardProps = {
  ingredient: TIngredient
}

function IngredientCard (props: TIngredientCardProps) {
  const {ingredient } = props;
  const location = useLocation();
  const { currentBurger } = useAppSelector((state: any) => state.currentBurgerReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const itemId: string = ingredient._id;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {itemId}
});

  function handleClick(ingredient: TIngredient) {
    dispatch(setCurrentIngredient(ingredient));
    dispatch(setItemType('ingredient'));
    dispatch(setOnClick(ingredient));
  };

  function count() {
    const aaa = currentBurger.filter((item: TIngredient) => (item !== null && item !== undefined && item._id !== undefined));

    {if (ingredient.type === 'bun' && currentBurger.find((item: TIngredient) => (item !== null && item !== undefined && item._id !== undefined && item._id === ingredient._id)))
    return 2;
    if (ingredient.type === 'bun' && !currentBurger.find((item: TIngredient) => (item !== null && item !== undefined && item._id !== undefined && item._id === ingredient._id)))
    return 0;
    if ((ingredient.type === 'main' || 'sauce') && !currentBurger.find((item: TIngredient) => (item !== null && item !== undefined && item._id !== undefined && item._id === ingredient._id)))
    return 0;
    if ((ingredient.type === 'main' || 'sauce') && aaa.find((item: TIngredient) => (item !== null && item !== undefined && item._id !== undefined && item._id === ingredient._id)))
  return aaa.filter((item: TIngredient) => (item._id === ingredient._id)).length;}
  }

  return (
    <li 
      ref={dragRef} 
      className="ingredientCard__card"
    >
      <Link
        to={`/ingredients/:${ingredient._id}`} 
        state={{ background: location }} 
        onClick={() => handleClick(ingredient)} 
        className='ingredientCard__link'
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
      </Link>
    </li>
  )
}

export default IngredientCard;
