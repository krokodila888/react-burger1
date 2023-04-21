import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ingredientPage.module.css';
import Preloader from '../../components/Preloader/Preloader';
import { IIngredient } from '../../types/types';

function IngredientPage() {

  const { ingredients, ingredientsRequest } = useSelector((state: any) => state.ingredientsReducer);
  const [ingredient1, setIngredient1] = useState<IIngredient | undefined>();
  const ingredientId = useParams() as any;
  const dispatch = useDispatch();

  const loadIngredientInfo = useCallback(
    () => {if (ingredients !== null) {
      let currentItem: IIngredient | undefined = ingredients.find((item: IIngredient) => item._id === ingredientId.ingredientID.replace(':', ''));
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
  
  return (
    <>
    {ingredientsRequest && ingredients === null && typeof(ingredients) === 'undefined' && ingredient1 === null ? (
      <>
        <p>Идет загрузка</p>
        <Preloader isLoading={ingredientsRequest} />
        </>
      ) : (    
      <div className={styles.container}>
        <h2 className="text text_type_main-large pt-3">
          Детали ингредиента
        </h2>
        {ingredient1 === undefined ? <p>Идет загрузка</p> :
        <>
        <img src={ingredient1.image_large} alt="Картинка с выбранным ингредиентом" />
        <h3 className="text text_type_main-medium pt-4">
          {ingredient1.name}
        </h3>
        <ul className={styles.dataBlock}>
          <li className={styles.li}>
            <p className="text text_type_main-default text_color_inactive">
              Каллории, ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient1.calories}
            </p>
          </li>
          <li className={styles.li}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient1.proteins}
            </p>
          </li>
          <li className={styles.li}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient1.fat}
            </p>
          </li>
          <li className={styles.li}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient1.carbohydrates}</p>
          </li>
        </ul>
        </>}
      </div>
  )} </>
  )
}

export default IngredientPage;
