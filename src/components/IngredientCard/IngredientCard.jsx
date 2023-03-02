import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import './IngredientCard.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropTypes} from "../../utils/constants";
import { setCurrentIngredient } from '../../services/actions/currentIngredient';

function IngredientCard(props) {
  const {ingredient, onIngredientClick } = props;
  const { currentBurger } = useSelector(state => state.currentBurgerReducer);
  const dispatch = useDispatch();
  const itemId = ingredient._id;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {itemId}
});

  function handleClick(ingredient) {
    dispatch(setCurrentIngredient(ingredient));
    onIngredientClick(ingredient);
  }

  function count() {
    if (ingredient.type === 'bun' && currentBurger.find((item) => (item._id === ingredient._id)))
    return 2;
    if (ingredient.type === 'bun' && !currentBurger.find((item) => (item._id === ingredient._id)))
    return 0;
    if ((ingredient.type === 'main' || 'sauce') && !currentBurger.find((item) => (item._id === ingredient._id)))
    return 0;
    if ((ingredient.type === 'main' || 'sauce') && currentBurger.find((item) => (item._id === ingredient._id)))
    return currentBurger.filter(item => (item._id === ingredient._id)).length;
  }

  return (
    <li ref={dragRef} className="ingredientCard__card" onClick={() => handleClick(ingredient)} >
      <img src={ingredient.image} alt="Изображение компонента бургера" className="ingredientCard__image"/>
      { (count() > 0) && <Counter count={count()} size="default" extraClass="m-1"/>}
        <div className="ingredientCard__price pb-1 pt-1">
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default ingredientCard__name">{ingredient.name}</p>
    </li>
  )
}

export default IngredientCard;

IngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};
