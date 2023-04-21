import React, { useState, FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import styles from "./main.module.css";
import Preloader from '../../components/Preloader/Preloader';
import { useDispatch } from 'react-redux';

type ScriptEvent = () => void;
type ScriptEventModalOpen = (data: boolean) => void;

interface IMainProps {
  onClose: ScriptEvent;
  orderModalIsOpen: boolean;
  openOrderModal: ScriptEventModalOpen;
}

const Main: FC<IMainProps> = ({onClose, orderModalIsOpen, openOrderModal}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
