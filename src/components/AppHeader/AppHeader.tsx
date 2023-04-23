import React, { useEffect } from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import "./AppHeader.css";
import { NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import { setLocation } from '../../services/actions/location';
import { useAppDispatch } from '../../services/wsMiddleware';

function AppHeader() {
  let location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLocation(location.pathname));
  }, [location]);

  return (
    <header className='appHeader__header'>
      <nav className='appHeader__nav pb-4 pt-4'>
        <div className='appHeader__left-links'>
          <NavLink to="/" className={({ isActive }) => 
            (isActive ? 'appHeader__link appHeader__active-link text text_type_main-default pl-5 pr-5 pb-5 pt-5' : "appHeader__link text text_type_main-default text_color_inactive pl-5 pr-5 pb-5 pt-5")} >
            <BurgerIcon type="secondary"/>Конструктор
          </NavLink>
          <NavLink to="/feed" className={({ isActive }) => 
            (isActive ? 'appHeader__link appHeader__active-link text text_type_main-default pl-5 pr-5 pb-5 pt-5' : "appHeader__link text text_type_main-default text_color_inactive pl-5 pr-5 pb-5 pt-5")} >
            <ListIcon type="secondary"/>Лента заказов
          </NavLink>
        </div>
        <Link
          to={`/`}>
          <Logo />
        </Link>
        <NavLink to="/profile" className={({ isActive }) => 
          (isActive ? 'appHeader__link appHeader__active-link text text_type_main-default pl-5 pr-5 pb-5 pt-5 appHeader__padding-to-right' : "appHeader__link text text_type_main-default text_color_inactive pl-5 pr-5 pb-5 pt-5 appHeader__padding-to-right")} >
          <ProfileIcon type="secondary"/>Личный кабинет
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
