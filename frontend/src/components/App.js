import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import authSuccess from "../images/success.svg";
import authFailed from "../images/failed.svg";

export default function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupVisibility] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupVisibility] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupVisibility] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupVisibility] = useState(false);
  const [isAuthPopupOpen, setAuthPopupVisibility] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const [isAuthSuccess, setAuthSuccess] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    auth.getUser()
      .then((res) => {
        if (!res) {
          return;
        }

        getContent()
          .then((r) => {
            setEmail(res['email']);
            setLoggedIn(true);
            navigate('/', {replace: true});
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  function getContent () {
    return Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => console.log(err))
  }

  function closeAllPopups() {
    setEditAvatarPopupVisibility(false);
    setEditProfilePopupVisibility(false);
    setAddPlacePopupVisibility(false);
    setDeleteCardPopupVisibility(false);
    setAuthPopupVisibility(false);
    setSelectedCard({});
  }

  function handleCardClick(cardId) {
    setSelectedCard(cardId);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupVisibility(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupVisibility(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupVisibility(true);
  }

  function handleCardLike(card) {
    const isLiked = card['likes'].some(i => i['_id'] === currentUser['_id']);

    api.updateLike(card['_id'], isLiked ? 'DELETE' : 'PUT')
      .then((newCard) => {
        setCards((state) =>  state.map((c) => c['_id'] === card['_id'] ? newCard : c));
    })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card['_id'])
      .then(() => {
        setCards((state) => state.filter((c) => c['_id'] !== card['_id']));
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser(userData) {
    api.editProfile(userData.name, userData.about)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(userAvatar) {
    api.editAvatar(userAvatar)
      .then((updatedAvatar) => {
        setCurrentUser(updatedAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(card) {
    api.postCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleError () {
    setAuthSuccess(false);
    setAuthMessage("Что-то пошло не так!\n" + "Попробуйте ещё раз.");
    setAuthPopupVisibility(true);
  }

  function handleLogin (email, password) {
    return auth.authorize(email, password)
      .then((res) => {
        getContent()
          .then((r) => {
            setLoggedIn(true);
            setEmail(email);
            return res;
          })
          .catch((err) => {
            handleError();
            console.log(err)
          });
      })
      .catch((err) => {
        handleError();
        console.log(err);
      });
  }

  function handleSignOut (evt) {
    evt.preventDefault();

    auth.signout()
      .then((r) => {
        setLoggedIn(false);
        navigate('/sign-in', {replace: true});
      })
      .catch((err) => {
        handleError();
        console.log(err);
      })
  }

  function handleRegister (email, password) {
    return auth.register(email, password)
      .then((res) => {
        if (!res) {
          return;
        }

        setAuthSuccess(true);
        setAuthMessage("Вы успешно зарегистрировались!");
        setAuthPopupVisibility(true);

        return res;
      })
      .catch((err) => {
        handleError();
        console.log(err);
      });
  }

  function handleAuthPopupClose () {
    closeAllPopups();
    if (isAuthSuccess) {
      navigate('/sign-in', {replace: true});
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path={'/'} element={<ProtectedRoute
          loggedIn={isLoggedIn}
          element={
          <>
            <Header
              linkName={"Выйти"}
              linkTo={'/sign-in'}
              isMain={true}
              onSignOut={handleSignOut}
            >
              {email}
            </Header>
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
            <Footer />
          </>
        }
        />}/>
        <Route path={'/sign-up'} element={
          <>
            <Header
              linkName={"Войти"}
              linkTo={'/sign-in'}
              isMain={false}
            />
            <Register onRegister={handleRegister}/>
          </>
        }/>
        <Route path={'/sign-in'} element={isLoggedIn
          ? <Navigate to={'/'} replace />
          : (
            <>
              <Header
                linkName={"Регистрация"}
                linkTo={'/sign-up'}
                isMain={false}
              />
              <Login onLogin={handleLogin}/>
            </>
          )
        }/>
      </Routes>

      <InfoTooltip
        isOpen={isAuthPopupOpen}
        title={authMessage}
        icon={isAuthSuccess ? authSuccess : authFailed}
        onClose={handleAuthPopupClose}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        title={"Вы уверены?"}
        name={"delete-card"}
        buttonText={"Да"}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );

}
