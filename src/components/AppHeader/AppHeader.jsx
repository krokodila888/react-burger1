import React, { useCallback, useState, useEffect } from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import "./AppHeader.css";
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLocation } from '../../services/actions/location';

function AppHeader() {
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLocation(location.pathname))
  }, [location]);

  React.useEffect(() => {
    console.log(location.state)
  }, [location]);

  return (
    <header className='appHeader__header'>
      <nav className='appHeader__nav pb-4 pt-4'>
        <div className='appHeader__left-links'>
          <NavLink to="/" className={({ isActive }) => 
            (isActive ? 'appHeader__link appHeader__active-link text text_type_main-default pl-5 pr-5 pb-5 pt-5' : "appHeader__link text text_type_main-default text_color_inactive pl-5 pr-5 pb-5 pt-5")} >
            <BurgerIcon/>Конструктор
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => 
            (isActive ? 'appHeader__link appHeader__active-link text text_type_main-default pl-5 pr-5 pb-5 pt-5' : "appHeader__link text text_type_main-default text_color_inactive pl-5 pr-5 pb-5 pt-5")} >
            <ListIcon/>Лента заказов
          </NavLink>
        </div>
          <Logo/>
          <NavLink to="/profile" className={({ isActive }) => 
            (isActive ? 'appHeader__link appHeader__active-link text text_type_main-default pl-5 pr-5 pb-5 pt-5 appHeader__padding-to-right' : "appHeader__link text text_type_main-default text_color_inactive pl-5 pr-5 pb-5 pt-5 appHeader__padding-to-right")} >
            <ProfileIcon/>Личный кабинет
          </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;

/* <a 
            href={"/"} 
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
        </a> */
