import React, { useState, useCallback, useEffect } from "react";
import { useAppSelector } from '../../services/wsMiddleware';
import { useParams } from 'react-router-dom';
import styles from './ingredientPage.module.css';
import Preloader from '../../components/Preloader/Preloader';
import { TIngredient } from '../../types/types';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import { setCurrentIngredient } from '../../services/actions/currentIngredient';
import { useAppDispatch } from '../../services/wsMiddleware';

function IngredientPage() {

  const { ingredients, ingredientsRequest } = useAppSelector((state) => state.ingredientsReducer);
  const [ingredient1, setIngredient1] = useState<TIngredient | undefined>();
  const ingredientId = useParams() as any;
  const dispatch = useAppDispatch();
  const { currentItem } = useAppSelector((state) => state.currentIngredientReducer);


  const loadIngredientInfo = useCallback(
    () => {if (ingredients !== null) {
      let currentItem: TIngredient | undefined = ingredients.find((item: TIngredient) => item._id === ingredientId.ingredientID.replace(':', ''));
      setIngredient1(currentItem);
    }},
    [ingredients]
  );

  useEffect(
    () => {
      loadIngredientInfo();
    },
    [ingredientId, loadIngredientInfo, ingredients]
  );

  useEffect(() => {
    if (ingredient1 !== undefined) {
      dispatch(setCurrentIngredient(ingredient1));}
  }, [ingredient1]);
  
  return (
    <>
    {ingredientsRequest && ingredients === null && typeof(ingredients) === 'undefined' && ingredient1 === null && currentItem === undefined ? (
      <>
        <p>Идет загрузка</p>
        <Preloader isLoading={ingredientsRequest} />
        </>
      ) : (
        <div className={styles.container}>
          <IngredientDetails/>
        </div>
  )} </>
  )
}

export default IngredientPage;
