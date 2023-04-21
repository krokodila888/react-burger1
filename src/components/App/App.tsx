import React, { useState, useEffect, FC } from "react";
import { BrowserRouter, Routes, useLocation, Route, useNavigate } from 'react-router-dom';
import { Navigate, useParams } from "react-router";
import styles from "./app.module.css";
import Preloader from '../Preloader/Preloader';
import { useDispatch, useSelector } from 'react-redux';
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
import { wsUrl } from "../../utils/constants";

type ScriptEvent = () => void;

function App() {

  const { user, refreshToken, getUserDataRequestFailed } = useSelector((state: any) => state.authReducer);
  const { emailSend } = useSelector((state: any) => state.resetPasswordReducer);
  const { locations, onClick, itemData, itemType } = useSelector((state: any) => state.locationReducer);
  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(false);
  const [orderModalIsOpen, setOrderModalIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch() as any;

  const { message, total, totalToday, orders } = useSelector((state: any) => state.wsReducer);

  useEffect(() => {
    dispatch({ type: wsActions.wsInit, payload: wsUrl });
  }, []);

  /*useEffect(() => {
    if (message && message[0] !== null)
    console.log(message);
  }, [message]);*/

  useEffect(() => {
    dispatch(getUserDataThunk());
  }, []);

  useEffect(()=> {
    dispatch(getIngredients());
  }, [])

  useEffect(()=> {
  console.log(localStorage.getItem('accessToken'))
}, [])

  useEffect(() => {
    if (getUserDataRequestFailed)
    {dispatch(getNewTokenThunk())}
  }, [getUserDataRequestFailed]);

  useEffect(() => {
    if (refreshToken.success) {
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

  function openOrderModal(data: boolean) {
    dispatch(sendNewOrderThunk(data));
    setOrderModalIsOpen(true)
  }

  const closeModal: ScriptEvent = () => {
    setOrderModalIsOpen(false);
    dispatch(removeCurrentIngredient());
    dispatch(removeOrderInfo());
    dispatch(removeOrder());
    dispatch(removeOnClick())
  }

  return (
    <div className={styles.page}>
      <BrowserRouter>
        <AppHeader/>
        <Routes>
          <Route path="/" element={
            <Main 
              onClose={closeModal}
              orderModalIsOpen={orderModalIsOpen}
              openOrderModal={openOrderModal}
              />} />
          <Route path="/profile/*" element={
            <ProtectedRoute 
              loggedIn={localStorage.getItem('accessToken') !== null}
              url={'/login'}>
              <ProfilePage />
            </ProtectedRoute>}>      
          </Route>
          <Route path="/profile/orders" element={
            <ProtectedRoute 
              loggedIn={localStorage.getItem('accessToken') !== null}
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
          {onClick && (itemType === 'ingredient') && (
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal 
                  isOpen={onClick}
                  onClose={closeModal}>
                    <IngredientDetails />
                </Modal>
              }
            />
          )}
          {onClick && (itemType === 'orderProfile') && (<Route path="/profile/orders/:orderId" element={
            <ProtectedRoute 
              loggedIn={localStorage.getItem('accessToken') !== null}
              url={'/login'}>
              <Modal 
                  isOpen={onClick}
                  onClose={closeModal}>
                    <OrderInfo />
                </Modal>
            </ProtectedRoute>}>      
          </Route>)}

          {onClick && (itemType === 'order') && (
            <Route
              path='/feed/:orderId'
              element={
                <Modal 
                  isOpen={onClick}
                  onClose={closeModal}>
                    <OrderInfo />
                </Modal>
              }
            />
          )}
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
          </Route>*/
          <Route path="*" element={<PageNotFound />} />
          {!onClick && (locations[0].slice(0, 5) === '/ingr') && <Route path="/ingredients/:ingredientID" element={<IngredientPage />} />}
          {!onClick && (locations[0].slice(0, 5) === '/feed') && <Route path="/feed/:orderID" element={<OrderPage />} />}
          {!onClick && (locations[0].slice(0, 5) === '/prof') && <Route path="/profile/orders/:orderID" element={<ProfileOrderPage />} />}
        </Routes>
      </BrowserRouter>
      <div id="react-modals"></div>
    </div>
  );
}

export default App;

/*
          {onClick && (itemType === 'orderProfile') && (
            <Route
              path='/profile/orders/:orderId'
              element={
                <Modal 
                  isOpen={onClick}
                  onClose={closeModal}>
                    <OrderInfo />
                </Modal>
              }
            />
          )}
*/

/*
user !== null && 
*/