import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import "./AppHeader.css";

function AppHeader() {

  return (
    <header className='appHeader__header'>
      <nav className='appHeader__nav pb-4 pt-4'>
        <div className='appHeader__left-links'>
          <a 
            href={"/burger-constructor"} 
            className="appHeader__link appHeader__active-link text text_type_main-default pl-5 pr-5 pb-5 pt-5">
              <BurgerIcon/>
              Конструктор
          </a>
          <a 
            className="appHeader__link text text_type_main-default text_color_inactive pl-5 pr-5 pb-5 pt-5"
            href={"/orders"}>
              <ListIcon/>
              Лента заказов
          </a>
        </div>
        <Logo/>
        <a 
          className="text_color_inactive appHeader__link text text_type_main-default pr-5 pb-5 pt-5 appHeader__padding-to-right"
          href={"/profile"}>
            <ProfileIcon/>
            Личный кабинет
        </a>
      </nav>
    </header>
  );
}

export default AppHeader;
