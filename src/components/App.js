import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import {rejectPromise} from '../utils/utils';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletionPopup from './ConfirmDeletionPopup';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';


function App() {
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddCardPopupOpen, setIsAddCardPopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ isConfirmDeletionPopup, setIsConfirmDeletionPopup ] = React.useState(false);
  const [ selectedCard, setSelectedCard ] = React.useState(false);
  const [ currentUser, setCurrentUser ] = React.useState('');
  const [ cards, setCards ] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const history = useHistory();

  function handleHeaderButtonClick() {
    setLoggedIn(!loggedIn);
  }

  function handleRegisterFormSubmit(password, email) {
    setIsLoading(!isLoading);
    auth.register(password, email)
      .then((res) => {
        history.push('/signin');
      })
      .catch((err) => {
        rejectPromise(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleLoginFormSubmit(password, email) {
    setIsLoading(!isLoading);
    auth.authorize(password, email)
      .then((data) => {
        setLoggedIn(!loggedIn);
        history.push('/');
      })
      .catch((err) => {
        rejectPromise(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(!isAddCardPopupOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setSelectedCard(false);
    setIsConfirmDeletionPopup(false);
  }


  function handleUpdateUser({name, about}) {
    setIsLoading(!isLoading);
    api.setUserInfo({name, about})
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        rejectPromise(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(!isLoading);
    api.setAvatar({avatar})
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        rejectPromise(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        rejectPromise(err);
      })
  }

  function confirmDeletionPopupOpen(cardData) {
    setIsConfirmDeletionPopup(cardData);
  }

  function handleCardDelete(card) {
    setIsLoading(!isLoading);
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        setIsConfirmDeletionPopup(false);
      })
      .catch((err) => {
        rejectPromise(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit({name, link}) {
    setIsLoading(!isLoading);
    api.addCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        rejectPromise(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  //закрытие по Esc
  React.useEffect(() => {
    function handlePopupsEscClose(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handlePopupsEscClose);

    return () => document.removeEventListener('keydown', handlePopupsEscClose);
  }, []);

  //получение и отрисовка данных при загрузке страницы
  React.useEffect(() => {
    api.getDataForRendered()
      .then((data) => {
        const [ cardsData, userData ] = data;
        setCards(cardsData);
        setCurrentUser(userData);
      })
      .catch((err) => {
        rejectPromise(err);
      })
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        headerButtonClick={handleHeaderButtonClick}
        loggedIn={loggedIn}
      />
      <main className="main-content">
        <ProtectedRoute
          exact path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddCard={handleAddCardClick}
          cards={cards}
          onConfirmDeletionPopupOpen={confirmDeletionPopupOpen}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
        />
        <Route path='/signup'>
          <Register
            onRegisterFormSubmit={handleRegisterFormSubmit}
          />
        </Route>
        <Route path='/signin'>
          <Login
            onLoginFormSubmit={handleLoginFormSubmit}
          />
        </Route>
        <Route path="/">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
      </main>
      <Footer />
      {
        loggedIn &&
        <>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <ConfirmDeletionPopup
            isOpen={isConfirmDeletionPopup}
            onClose={closeAllPopups}
            cardDelete={handleCardDelete}
            isLoading={isLoading}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </>
      }
    </CurrentUserContext.Provider>
  );
}

export default App;
