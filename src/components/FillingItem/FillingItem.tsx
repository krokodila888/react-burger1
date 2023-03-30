import React, { FC } from "react";
import PropTypes, { string } from 'prop-types';
import { useDrag, useDrop } from "react-dnd";
import styles from "./fillingItem.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "../../utils/constants";
import { IIngredient, TIngredient } from '../../types/types';

type TMoveCard = (dragIndex: number | undefined, hoverIndex: number) => void;
type TFillingItemProps = {
  item: TIngredient;
  index: number;
  removeItem: FC<TIngredient>;
  moveCard: any;
}

type THandlerId = number | string | null;

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
    const preventDefault = (e: any) => e.preventDefault();

  React.useEffect(() => {
    console.log(handlerId)
  }, []);

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

FillingItem.propTypes = {
  index: PropTypes.number.isRequired,
  removeItem: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  item: ingredientPropTypes.isRequired,
};
