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
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import { removeOrder } from '../../services/actions/sendOrder';
import { getUserData, getNewToken, removeTokenRequest } from '../../services/actions/auth';
import { removeOnClick } from '../../services/actions/location';
import AppHeader from '../../components/AppHeader/AppHeader.jsx';
import ProtectedRoute from '../ProtectedRoute';
import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";

function App() {

  const [orderModalIsOpen, setOrderModalIsOpen] = React.useState(false);
  const [ingredientModalIsOpen, setIngredientModalIsOpen] = React.useState(false);
  const { user, refreshToken, getUserDataRequestFailed } = useSelector(state => state.authReducer);
  const { emailSend } = useSelector(state => state.resetPasswordReducer);
  const { locations, onClick, itemData } = useSelector(state => state.locationReducer);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  useEffect(() => {
    if (getUserDataRequestFailed)
    {dispatch(getNewToken())}
  }, [getUserDataRequestFailed]);

  useEffect(() => {
    if (refreshToken.success) {
      localStorage.setItem('accessToken', refreshToken.accessToken.replace('Bearer ', ''));
      localStorage.setItem('refreshToken', refreshToken.refreshToken);
      dispatch(getUserData())}
      removeTokenRequest();
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

  /*function handleIngredientClick(data) {
    if (data) return (
      setIngredientModalIsOpen(true));
  }*/

  function closeModal() {
    setOrderModalIsOpen(false);
    setIngredientModalIsOpen(false);
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
              ingredientModalIsOpen = {ingredientModalIsOpen}
              onClose = {closeModal}
              openOrderModal = {openOrderModal}
              /*handleIngredientClick = {handleIngredientClick}*//>} />
          <Route exact path="/profile" element={
            <ProtectedRoute 
            loggedIn={user !== null && localStorage.getItem('accessToken') !== null}
            url={'/login'}>
              <ProfilePage />
            </ProtectedRoute>}>      
          </Route>
          <Route exact path="/login" element={
            <ProtectedRoute 
            loggedIn={user === null}
            url={`${locations[2]}`}>
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

/*
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          
          <Route exact path="/login" element={
            <ProtectedRoute 
            loggedIn={!isUserLoaded}
            url={'/'}>
              <LoginPage />
            </ProtectedRoute>}>      
          </Route>
          <Route exact path="/register" element={
            <ProtectedRoute 
            loggedIn={!isUserLoaded}
            url={'/'}>
              <RegisterPage />
            </ProtectedRoute>}>      
          </Route>
                    <Route exact path="/forgot-password" element={
            <ProtectedRoute 
            loggedIn={!isUserLoaded}
            url={'/'}>
              <ForgotPasswordPage />
            </ProtectedRoute>}>      
          </Route>
          <Route exact path="/reset-password" element={
            <ProtectedRoute 
            loggedIn={user === null && emailSend}
            url={'forgot-password'}>
              <ResetPasswordPage />
            </ProtectedRoute>}>      
          </Route>*/

          /*      {background && (
        <Route
          path='/ingredients/:ingredientId'
          element={
            <Modal onClose={onClose}>
              <IngredientsDetails />
            </Modal>
          }
        />
      )}
      
      
            {currentItem && <Modal
        isOpen={isOpen}
        onClose={onClose}
          children={
          <IngredientDetails
          />}>
      </Modal>}*/