import React, { useState, useCallback, useEffect } from "react";
import { useAppSelector } from '../../services/wsMiddleware';
import styles from './ingredientPage.module.css';
import Preloader from '../../components/Preloader/Preloader';
import { TIngredient } from '../../types/types';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import { setCurrentIngredient } from '../../services/actions/currentIngredient';
import { useAppDispatch } from '../../services/wsMiddleware';

function IngredientPage() {

  const { ingredients, ingredientsRequest } = useAppSelector((state) => state.ingredientsReducer);
  const [ingredient1, setIngredient1] = useState<TIngredient | undefined>();
  const { locations } = useAppSelector((state) => state.locationReducer);
  const dispatch = useAppDispatch();
  const { currentItem } = useAppSelector((state) => state.currentIngredientReducer);
  const ingredientID1 = locations[0].slice(14, 38);

  useEffect(() => {
    if(ingredients !== null && (ingredientID1 !== null) && ingredientID1 !== undefined) {
    let currentItem1: TIngredient | undefined = ingredients.find((item: TIngredient) => item._id === ingredientID1);
    if (currentItem1 !== undefined)
    dispatch(setCurrentIngredient(currentItem1));
    }
  }, [ingredientID1, ingredients]);

  return (
    <>
    {ingredientsRequest && ingredients === null && typeof(ingredients) === 'undefined' && ingredient1 === null /*&& currentItem === undefined */? (
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
