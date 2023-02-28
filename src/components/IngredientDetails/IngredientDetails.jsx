import React from "react";
import styles from "./ingredientDetails.module.css";
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { setCurrentIngredient } from '../../services/actions/currentIngredient';

function IngredientDetails() {
  const { name, image_large, calories, carbohydrates, fat, proteins } =
  useSelector((state) => state.currentIngredientReducer.currentItem);

  return (
    <div className={styles.test}>
      <h2 className="text text_type_main-large pt-3">
        Детали ингредиента
      </h2>
      {name === null ? <p>Идет загрузка</p> :
      <>
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
      </>}
    </div>
  );
}

const mapStateToProps = (store, ownProps) => {
  return { 
    currentItem: store.currentItem
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrentIngredient: () => dispatch(setCurrentIngredient),
  };
}; 

export default connect(mapDispatchToProps, mapStateToProps) (IngredientDetails);