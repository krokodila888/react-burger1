import React from "react";
import styles from "./ingredientDetails.module.css";
import { useAppSelector } from '../../services/wsMiddleware';

function IngredientDetails() {
  const { currentItem } = useAppSelector((state) => state.currentIngredientReducer);

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