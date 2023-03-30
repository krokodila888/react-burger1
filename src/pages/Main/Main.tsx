import React, { useState, FC } from "react";
import AppHeader from '../../components/AppHeader/AppHeader.jsx';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import styles from "./main.module.css";
import Preloader from '../../components/Preloader/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { sendNewOrder1 } from '../../services/actions/sendOrder';
import { removeOnClick } from '../../services/actions/location';
import { removeCurrentIngredient } from '../../services/actions/currentIngredient';
import { removeOrder } from '../../services/actions/sendOrder';

type ScriptEvent = () => void;
type ScriptEventModalOpen = (data: boolean) => void;

interface IMainProps {
  onClose: ScriptEvent;
  orderModalIsOpen: boolean;
  openOrderModal: ScriptEventModalOpen;
}

const Main: FC<IMainProps> = ({onClose, orderModalIsOpen, openOrderModal}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch() as any;

  return (
    <div>
      <div className={styles.page} >
        <DndProvider backend={HTML5Backend}>
          <div className={styles.main}>
            <BurgerIngredients 
            />
            <BurgerConstructor 
              isOpen = {orderModalIsOpen}
              onClose = {onClose}
              openOrderModal = {openOrderModal}
            />
          </div>
        </DndProvider>
        <Preloader isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Main;
