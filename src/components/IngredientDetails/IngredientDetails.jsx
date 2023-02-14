import React from "react";
import PropTypes from 'prop-types';
import styles from "./ingredientDetails.module.css";
import {ingredientPropTypes} from "../../utils/constants";

function IngredientDetails(props) {
  const {selectedIngredient} = props;
  const {name, image_large, calories, carbohydrates, fat, proteins} = selectedIngredient;

  return (
    <div className={styles.test}>
      <h2 className="text text_type_main-large pt-3">
        Детали ингредиента
      </h2>
      <img src={image_large} alt="Картинка с выбранным ингредиентом" />
      <h3 className="text text_type_main-medium pt-4">
        {name}
      </h3>
      <ul className={styles.dataBlock}>
        <li className={styles.li}>
          <p className="text text_type_main-default text_color_inactive">
            Каллории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {calories}
          </p>
        </li>
        <li className={styles.li}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {proteins}
          </p>
        </li>
        <li className={styles.li}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {fat}
          </p>
        </li>
        <li className={styles.li}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  selectedIngredient: ingredientPropTypes.isRequired
};
