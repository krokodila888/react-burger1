import React from "react";
import PropTypes from 'prop-types';
import styles from "./burgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from '../IngredientCard/IngredientCard.jsx';
import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

function BurgerIngredients(props) {
  const bunsScroll = React.useRef();
  const fillingScroll = React.useRef();
  const sauceScroll = React.useRef();  
  const fillingsBlock = React.useRef();
  const { isOpen, onClose, handleIngredientClick } = props;
  const [current, setCurrent] = React.useState('bunsScroll');
  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest } = useSelector(state => state.ingredientsReducer);
  const { currentItem } = useSelector(state => state.currentIngredientReducer);
  const [heightScroll, setHeightScroll] = React.useState(0);
  
  function getPosition() {
    let currentHeightScroll = fillingsBlock.current.scrollTop;
    setHeightScroll(currentHeightScroll);
  };

  function setPosition() {
    if (heightScroll < 130)
    setCurrent('bunsScroll');
    if (heightScroll >= 130 && heightScroll < 540)
    setCurrent('sauceScroll');
    if (heightScroll >= 540)
    setCurrent('fillingScroll');
  };

  React.useEffect(() => {
    getPosition();
  }, []);

  React.useEffect(() => {
    setPosition();
  }, [heightScroll]);

  React.useEffect(()=> {
    dispatch(getIngredients());
    console.log(ingredients);
  }, [])

  function handleClick(data) {
    handleIngredientClick(data);
  }

  function onBunsClick() {
    bunsScroll.current.scrollIntoView({block: "start", behavior: "smooth"});
    setCurrent('bunsScroll');
  };
  
  function onFillingClick() {
    fillingScroll.current.scrollIntoView({block: "start", behavior: "smooth"});
    setCurrent('fillingScroll');
  };

  function onSauceClick() {
    sauceScroll.current.scrollIntoView({block: "start", behavior: "smooth"});
    setCurrent('sauceScroll');
  };
  
  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large">
        Соберите бургер
      </h1>
      <nav className={styles.nav}>
        <Tab 
          value="bunsScroll" 
          active={current === 'bunsScroll'}
          onClick={() => {setCurrent('bunsScroll'); onBunsClick()}}>
            Булки
        </Tab>
        <Tab 
          value="sauceScroll" 
          active={current === 'sauceScroll'} 
          onClick={() => {setCurrent('sauceScroll'); onSauceClick()}}>
            Соусы
        </Tab>
        <Tab 
          value="fillingScroll" 
          active={current === 'fillingScroll'}
          onClick={() => {setCurrent('fillingScroll'); onFillingClick()}}>
            Начинки
        </Tab>
      </nav>
      {ingredientsRequest ? (
        <p>Идет загрузка</p>
      ) : (
      <div className={styles.scroll} ref={fillingsBlock} onScroll={getPosition}>
        <h2 className="text text_type_main-medium" ref={bunsScroll}>Булки</h2>
        <ul className={styles.ul}>
          {typeof(ingredients) !== 'undefined' && (ingredients) !== null && ingredients.filter((item) => {return (item.type === "bun")}).map((item) => (
            <div key={item._id}>
              <IngredientCard 
                ingredient = {item}
                onIngredientClick = {handleIngredientClick}
              />
            </div>
          ))}
        </ul>
        <h2 className="text text_type_main-medium" ref={sauceScroll}>Соусы</h2>
        <ul className={styles.ul}>
          {typeof(ingredients) !== 'undefined' && (ingredients) !== null && ingredients.filter((item) => {return (item.type === "sauce")}).map((item) => (
            <div key={item._id}>
              <IngredientCard 
                ingredient = {item}                
                onIngredientClick = {handleIngredientClick}
              />
            </div>
          ))}
        </ul>
        <h2 className="text text_type_main-medium" ref={fillingScroll}>Начинки</h2>
        <ul className={styles.ul}>
          {typeof(ingredients) !== 'undefined' && (ingredients) !== null && ingredients.filter((item) => {return (item.type === "main")}).map((item) => (
            <div key={item._id}>
              <IngredientCard 
                ingredient = {item}
                onIngredientClick = {handleClick}
              />
            </div>
          ))}
        </ul>
      </div>)}
      {currentItem && <Modal
        isOpen={isOpen}
        onClose={onClose}
          children={
          <IngredientDetails
          />}>
      </Modal>}
      <div id="react-modals"></div>
    </section>
  );
}  

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  handleIngredientClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
