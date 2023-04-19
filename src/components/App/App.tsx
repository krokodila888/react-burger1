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
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import { removeOrder } from '../../services/actions/sendOrder';
import { getUserDataThunk, getNewTokenThunk, removeTokenRequest, removeUserData } from '../../services/actions/auth';
import { removeOnClick } from '../../services/actions/location';
import AppHeader from '../AppHeader/AppHeader';
import ProtectedRoute from '../ProtectedRoute';
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { getIngredients } from '../../services/actions/ingredients';
import { sendNewOrderThunk } from '../../services/actions/sendOrder';

type ScriptEvent = () => void;

function App() {

  const { user, refreshToken, getUserDataRequestFailed } = useSelector((state: any) => state.authReducer);
  const { emailSend } = useSelector((state: any) => state.resetPasswordReducer);
  const { locations, onClick, itemData } = useSelector((state: any) => state.locationReducer);
  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(false);
  const [orderModalIsOpen, setOrderModalIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch() as any;

  useEffect(() => {
    dispatch(getUserDataThunk());
  }, []);

  useEffect(()=> {
    dispatch(getIngredients());
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
              loggedIn={user !== null && localStorage.getItem('accessToken') !== null}
              url={'/login'}>
              <ProfilePage />
            </ProtectedRoute>}>      
          </Route>
          <Route path="/profile/orders" element={
            <ProtectedRoute 
              loggedIn={user !== null && localStorage.getItem('accessToken') !== null}
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
          {onClick && (
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
          {!onClick && <Route path="/ingredients/:ingredientID" element={<IngredientPage />} />}
        </Routes>
      </BrowserRouter>
      <div id="react-modals"></div>
    </div>
  );
}

export default App;
