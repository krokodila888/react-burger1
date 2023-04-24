import React, { useState, useEffect } from "react";
import { BrowserRouter, useLocation, Routes, Route, useNavigate } from 'react-router-dom';
import styles from "./app.module.css";
import { removeCurrentIngredient } from '../../services/actions/currentIngredient';
import Main from '../../pages/Main/Main';
import PageNotFound from '../../pages/PageNotFound/PageNotFound';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import FeedPage from '../../pages/FeedPage/FeedPage';
import ProfileOrdersPage from '../../pages/ProfileOrdersPage/ProfileOrdersPage';
import ProfileOrderPage from '../../pages/ProfileOrderPage/ProfileOrderPage';
import OrderPage from '../../pages/OrderPage/OrderPage';
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import { removeOrder } from '../../services/actions/sendOrder';
import { removeOrderInfo } from '../../services/actions/currentOrderInfo';
import { getUserDataThunk, getNewTokenThunk, removeTokenRequest, removeUserData } from '../../services/actions/auth';
import { removeOnClick } from '../../services/actions/location';
import AppHeader from '../AppHeader/AppHeader';
import ProtectedRoute from '../ProtectedRoute';
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderInfo from "../OrderInfo/OrderInfo";
import { getIngredients } from '../../services/actions/ingredients';
import { sendNewOrderThunk } from '../../services/actions/sendOrder';
import { wsActions } from "../../services/wsMiddleware";
import { wsUrl, wsUrlForUser } from "../../utils/constants";
import { useAppDispatch } from '../../services/wsMiddleware';
import { useAppSelector } from '../../services/wsMiddleware';

type ScriptEvent = () => void;

function App() {

  const { user, refreshToken, getUserDataRequestFailed } = useAppSelector((state) => state.authReducer);
  const { emailSend } = useAppSelector((state) => state.resetPasswordReducer);
  const { locations, onClick, itemType } = useAppSelector((state) => state.locationReducer);
  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(false);
  const [orderModalIsOpen, setOrderModalIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  let background = location.state && location.state.background;

  const { message, total, totalToday, orders } = useAppSelector((state) => state.wsReducer);
  const { sendLogin } = useAppSelector((state) => state.authReducer);

  /*useEffect(() => {
    if (sendLogin !== null && sendLogin.accessToken !== undefined && sendLogin.refreshToken !== undefined ) {
      localStorage.setItem('accessToken', sendLogin.accessToken.replace('Bearer ', ''));
      localStorage.setItem('refreshToken', sendLogin.refreshToken);
      dispatch(getUserDataThunk());
 }}, [sendLogin]);*/


  useEffect(() => {
    if (sendLogin !== null && sendLogin.success === true && sendLogin.accessToken !== undefined && sendLogin.refreshToken !== undefined) {
      console.log(localStorage.accessToken);
      localStorage.setItem('accessToken', sendLogin.accessToken.replace('Bearer ', ''));
      localStorage.setItem('refreshToken', sendLogin.refreshToken);
    dispatch(getUserDataThunk());
}}, [sendLogin]);

useEffect(() => {
  console.log(localStorage);
}, []);

useEffect(() => {
  /*if (user === null || user === undefined)*/
  dispatch(getUserDataThunk());
}, [/*user*/]);

  useEffect(()=> {
    dispatch(getIngredients());
  }, [])

  useEffect(() => {
    if (getUserDataRequestFailed)
    {dispatch(getNewTokenThunk())}
  }, [getUserDataRequestFailed]);

  useEffect(() => {
    if (refreshToken && refreshToken.success && refreshToken.accessToken !== undefined && refreshToken.refreshToken !== undefined) {
      localStorage.setItem('accessToken', refreshToken.accessToken.replace('Bearer ', ''));
      localStorage.setItem('refreshToken', refreshToken.refreshToken);
      dispatch(getUserDataThunk())
    }
  }, [refreshToken]);

  useEffect(() => {
    if (user !== null && localStorage.getItem('accessToken') !== null) {
      setIsUserLoaded(true)
    } else {setIsUserLoaded(false)}
  }, [user]);

  function openOrderModal(data: Array<string>) {
    dispatch(sendNewOrderThunk(data));
    setOrderModalIsOpen(true)
  }

  const closeModal: ScriptEvent = () => {
    if (onClick) {
      setOrderModalIsOpen(false);
      dispatch(removeCurrentIngredient());
      dispatch(removeOrderInfo());
      dispatch(removeOrder());
      dispatch(removeOnClick());
      navigate(-1);
      dispatch(removeOnClick()); }
    else {
      setOrderModalIsOpen(false);
      dispatch(removeCurrentIngredient());
      dispatch(removeOrderInfo());
      dispatch(removeOrder());
      dispatch(removeOnClick());
      navigate('/');
      dispatch(removeOnClick());
    }
  }

  return (
    <div className={styles.page}>

        <AppHeader/>
        <Routes location={background || location}>
          <Route path="/" element={
            <Main 
              onClose={closeModal}
              orderModalIsOpen={orderModalIsOpen}
              openOrderModal={openOrderModal}
              />} />
          <Route path="/profile" element={
            <ProtectedRoute 
              loggedIn={localStorage.getItem('accessToken') !== null/* && user !== null*/}
              url={'/login'}>
              <ProfilePage />
            </ProtectedRoute>}>      
          </Route>
          <Route path="/profile/orders" element={
            <ProtectedRoute 
              loggedIn={localStorage.getItem('accessToken') !== null /*&& user !== null*/}
              url={'/login'}>
              <ProfileOrdersPage />
            </ProtectedRoute>}>      
          </Route>
          <Route path="/login" element={
            <ProtectedRoute 
              loggedIn={user === null}
              url={`/`}>
              <LoginPage />
            </ProtectedRoute>}>      
          </Route>
          <Route path="/feed" element={
            <FeedPage />}>
           </Route>
          <Route path="/register" element={
            <ProtectedRoute 
              loggedIn={user === null}
              url={'/'}>
              <RegisterPage />
            </ProtectedRoute>}>      
          </Route>
          <Route path="/forgot-password" element={
            <ProtectedRoute 
            loggedIn={user === null}
            url={'/'}>
              <ForgotPasswordPage />
            </ProtectedRoute>}>      
          </Route>
          <Route path="/reset-password" element={
            <ProtectedRoute 
            loggedIn={user === null && emailSend}
            url={'/forgot-password'}>
              <ResetPasswordPage />
            </ProtectedRoute>}>      
          </Route>
          <Route path="*" element={<PageNotFound />} />
          {!onClick && (locations[0].slice(0, 5) === '/ingr') && <Route path="/ingredients/:ingredientID" element={<IngredientPage />} />}
          {!onClick &&/* (locations[0].slice(0, 5) === '/feed') && */<Route path="/feed/:orderID" element={
          <OrderPage />} />}
          {!onClick && /*(locations[0].slice(0, 16) === '/profile/orders/') && (*/<Route path="/profile/orders/:orderId" element={
            <ProtectedRoute 
              loggedIn={localStorage.getItem('accessToken') !== null}
              url={'/login'}>
              <ProfileOrderPage />
            </ProtectedRoute>}>      
          </Route>}
        </Routes>
        {background && (
        <Routes>
          {/*onClick && (itemType === 'ingredient') &&*/ (
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal 
                  isOpen={(locations[0].slice(0, 14) === '/ingredients/:')}
                  onClose={closeModal}>
                    <IngredientDetails />
                </Modal>
            }/>)}
          {/*locations[1] !== '' && *//*onClick && (itemType === 'orderProfile') && */(<Route path="/profile/orders/:orderId" element={
            <ProtectedRoute 
              loggedIn={localStorage.getItem('accessToken') !== null}
              url={'/login'}>
              <Modal 
                  isOpen={(locations[0].slice(0, 17) === '/profile/orders/:')}
                  onClose={closeModal}>
                    <OrderInfo />
                </Modal>
            </ProtectedRoute>}>      
          </Route>)}
          {/*onClick && (itemType === 'order') && */(
            <Route
              path='/feed/:orderId'
              element={
                <Modal 
                  isOpen={(locations[0].slice(0, 7) === '/feed/:')}
                  onClose={closeModal}>
                    <OrderInfo />
                </Modal>
              }
            />
          )}
        </Routes>
      )}

    </div>
  );
}

export default App;

/*
<Route path="/login" element={
            <ProtectedRoute 
              loggedIn={user === null}
              url={`/`}>
              <LoginPage />
            </ProtectedRoute>}>      
          </Route>
          */