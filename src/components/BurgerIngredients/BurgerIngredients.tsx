import React, { FC } from "react";
import styles from "./burgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from '../IngredientCard/IngredientCard';
import { useSelector, useDispatch } from 'react-redux';
import { TIngredient } from '../../types/types';

function BurgerIngredients() {
  const bunsScroll = React.useRef<HTMLDivElement>(null);
  const fillingScroll = React.useRef<HTMLDivElement>(null);
  const sauceScroll = React.useRef<HTMLDivElement>(null);  
  const fillingsBlock = React.useRef<HTMLDivElement>(null);
  const [current, setCurrent] = React.useState('bunsScroll');
  const { user } = useSelector((state: any) => state.authReducer);
  const { ingredients, ingredientsRequest } = useSelector((state: any) => state.ingredientsReducer);
  const [heightScroll, setHeightScroll] = React.useState(0);
  const dispatch = useDispatch();
  
  function getPosition() {
    if (fillingsBlock.current) {
    let currentHeightScroll = fillingsBlock.current.scrollTop;
    setHeightScroll(currentHeightScroll);}
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

  function onBunsClick() {if (typeof(ingredients) !== 'undefined' && bunsScroll.current !== null)
    {bunsScroll.current.scrollIntoView({block: "start", behavior: "smooth"});
    setCurrent('bunsScroll');}
  };
  
  function onFillingClick() { if (typeof(ingredients) !== 'undefined' && fillingScroll.current !== null)
    {fillingScroll.current.scrollIntoView({block: "start", behavior: "smooth"});
    setCurrent('fillingScroll');}
  };

  function onSauceClick() {if (typeof(ingredients) !== 'undefined' && sauceScroll.current !== null)
    {sauceScroll.current.scrollIntoView({block: "start", behavior: "smooth"});
    setCurrent('sauceScroll');}
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
          {typeof(ingredients) !== 'undefined' && (ingredients) !== null && ingredients.filter((item: TIngredient) => {return (item.type === "bun")}).map((item: TIngredient) => (
            <div key={item._id}>
              <IngredientCard 
                ingredient = {item}
              />
            </div>
          ))}
        </ul>
        <h2 className="text text_type_main-medium" ref={sauceScroll}>Соусы</h2>
        <ul className={styles.ul}>
          {typeof(ingredients) !== 'undefined' && (ingredients) !== null && ingredients.filter((item: TIngredient) => {return (item.type === "sauce")}).map((item: TIngredient) => (
            <div key={item._id}>
              <IngredientCard 
                ingredient = {item}
              />
            </div>
          ))}
        </ul>
        <h2 className="text text_type_main-medium" ref={fillingScroll}>Начинки</h2>
        <ul className={styles.ul}>
          {typeof(ingredients) !== 'undefined' && (ingredients) !== null && ingredients.filter((item: TIngredient) => {return (item.type === "main")}).map((item: TIngredient) => (
            <div key={item._id}>
              <IngredientCard 
                ingredient = {item}
              />
            </div>
          ))}
        </ul>
      </div>)}
    </section>
  );
}  

export default BurgerIngredients;
