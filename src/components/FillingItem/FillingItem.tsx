import React, { FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "./fillingItem.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from '../../types/types';

type TMoveCard = (dragIndex: number, hoverIndex: number) => void;
type TRemoveCard = (item: TIngredient) => void;

type ScriptEvent = () => void;
type ScriptEventModalOpen = (data: Array<string>) => void;

type TFillingItemProps = {
  item: TIngredient;
  index: number;
  removeItem: TRemoveCard;
  moveCard: TMoveCard;
}

function FillingItem(props: TFillingItemProps) {
  const { item, index, removeItem, moveCard } = props;

  const ref = React.useRef<HTMLLIElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;
      if (dragIndex !== undefined && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex !== undefined && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })
    // Задаем функционал перетаскивания для элементов внутри списка
    // ингредиентов заказа
    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: () => ({ id: item.id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    if (item.type !== 'bun') drag(drop(ref));
    const preventDefault = (e: Event) => e.preventDefault();

  return (
    <li className={styles.li} ref={ref}>
    <DragIcon type="primary" />
    <ConstructorElement
      text={item.name}
      price={item.price}
      thumbnail={item.image}
      handleClose={() => removeItem(item)}
    />
  </li>
  )
}

export default FillingItem;
