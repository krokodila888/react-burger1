import styles from "./ingredientDetails.module.css";
import { useAppSelector } from '../../services/wsMiddleware';
import React, { useState, useCallback, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Preloader from '../../components/Preloader/Preloader';
import { TIngredient } from '../../types/types';
import { setCurrentIngredient } from '../../services/actions/currentIngredient';
import { useAppDispatch } from '../../services/wsMiddleware';


function IngredientDetails() {
  //const { currentItem } = useAppSelector((state) => state.currentIngredientReducer);

  const { ingredients, ingredientsRequest } = useAppSelector((state) => state.ingredientsReducer);
  const [ingredient1, setIngredient1] = useState<TIngredient | undefined>();
  const ingredientID = useParams() as any;
  const dispatch = useAppDispatch();
  const { locations } = useAppSelector((state) => state.locationReducer);
  const ingredientID1 = locations[0].slice(14, 38);

  const { currentItem } = useAppSelector((state) => state.currentIngredientReducer);

  useEffect(() => {
    if(ingredients !== null && (ingredientID1 !== null) && ingredientID1 !== undefined && (currentItem === null || currentItem === undefined)) {
    let currentItem1: TIngredient | undefined = ingredients.find((item: TIngredient) => item._id === ingredientID1);
    if (currentItem1 !== undefined)
    dispatch(setCurrentIngredient(currentItem1));
    }
  }, [ingredientID1, ingredients, currentItem]);

  return (
    <div className={styles.test}>
      <h2 className="text text_type_main-large pt-3">
        Детали ингредиента
      </h2>
      {currentItem === null && currentItem === undefined && <p>Идет загрузка</p>} 
      {currentItem !== null &&
      <>
      <img src={currentItem.image_large} alt="Картинка с выбранным ингредиентом" />
      <h3 className="text text_type_main-medium pt-4">
        {currentItem.name}
      </h3>
      <ul className={styles.dataBlock}>
        <li className={styles.li}>
          <p className="text text_type_main-default text_color_inactive">
            Каллории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentItem.calories}
          </p>
        </li>
        <li className={styles.li}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentItem.proteins}
          </p>
        </li>
        <li className={styles.li}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentItem.fat}
          </p>
        </li>
        <li className={styles.li}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">{currentItem.carbohydrates}</p>
        </li>
      </ul>
      </>}
    </div>
  );
}

export default IngredientDetails;