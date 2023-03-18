import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, useLocation, Route, useNavigate } from 'react-router-dom';
import { Navigate, useHistory, useParams } from "react-router";
import styles from "./app.module.css";
import Preloader from '../Preloader/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { sendNewOrder1 } from '../../services/actions/sendOrder';
import { removeCurrentIngredient } from '../../services/actions/currentIngredient';
import Main from '../../pages/Main/Main';
import PageNotFound from '../../pages/PageNotFound/PageNotFound';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import ProfileOrdersPage from '../../pages/ProfileOrdersPage/ProfileOrdersPage';
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import { removeOrder } from '../../services/actions/sendOrder';
import { getUserData, getNewToken, removeTokenRequest, removeUserData } from '../../services/actions/auth';
import { removeOnClick } from '../../services/actions/location';
import AppHeader from '../../components/AppHeader/AppHeader.jsx';
import ProtectedRoute from '../ProtectedRoute';
import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import { getIngredients } from '../../services/actions/ingredients';

function App() {

  const [orderModalIsOpen, setOrderModalIsOpen] = React.useState(false);
  //const [ingredientModalIsOpen, setIngredientModalIsOpen] = React.useState(false);
  const { user, refreshToken, getUserDataRequestFailed } = useSelector(state => state.authReducer);
  const { emailSend } = useSelector(state => state.resetPasswordReducer);
  const { locations, onClick, itemData } = useSelector(state => state.locationReducer);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
    console.log(user, localStorage)
  }, []);

  React.useEffect(()=> {
    dispatch(getIngredients());
  }, [])

  useEffect(() => {
    if (getUserDataRequestFailed)
    {dispatch(getNewToken())}
  }, [getUserDataRequestFailed]);

  useEffect(() => {
    if (refreshToken.success) {
      localStorage.setItem('accessToken', refreshToken.accessToken.replace('Bearer ', ''));
      localStorage.setItem('refreshToken', refreshToken.refreshToken);
      dispatch(getUserData())
    }
    /*else {
      //localStorage.clear();
      //removeUserData()
    }*/
    //removeTokenRequest();
  }, [refreshToken]);

  useEffect(() => {
    console.log(user)
  }, []);

  useEffect(() => {
    if (user !== null && localStorage.getItem('accessToken') !== null) {
      setIsUserLoaded(true)
    } else {setIsUserLoaded(false)}
  }, [user]);

  function openOrderModal(data) {
    dispatch(sendNewOrder1(data));
    setOrderModalIsOpen(true)
  }

  function closeModal() {
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
              orderModalIsOpen = {orderModalIsOpen}
              onClose = {closeModal}
              openOrderModal = {openOrderModal}/>} />
          <Route exact path="/profile" element={
            <ProtectedRoute 
              loggedIn={user !== null && localStorage.getItem('accessToken') !== null}
              url={'/login'}>
              <ProfilePage />
            </ProtectedRoute>}>      
          </Route>
          <Route exact path="/profile/orders" element={
            <ProtectedRoute 
              loggedIn={user !== null && localStorage.getItem('accessToken') !== null}
              url={'/login'}>
              <ProfileOrdersPage />
            </ProtectedRoute>}>      
          </Route>
          <Route exact path="/login" element={
            <ProtectedRoute 
              loggedIn={user === null}
              url={`/`}>
              <LoginPage />
            </ProtectedRoute>}>      
          </Route>
          <Route exact path="/register" element={
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
          <Route exact path="/forgot-password" element={
            <ProtectedRoute 
            loggedIn={user === null}
            url={'/'}>
              <ForgotPasswordPage />
            </ProtectedRoute>}>      
          </Route>
          <Route exact path="/reset-password" element={
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
