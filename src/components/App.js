import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Registration from './Registration';
import ProtectedRoute from './ProtectedRoute';
import { api } from '../utils/Api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [statusInfoTooltip, setStatusInfoTooltip] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [authUser, setAuthUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const history = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((userInfo) => setCurrentUser(userInfo))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function handleUpdateAvatar(avatar) {
    api
      .changeAvatar(avatar)
      .then((userInfo) => setCurrentUser(userInfo))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function handleAddPlace(cardData) {
    api
      .addCard(cardData)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() =>
        setCards((state) => state.filter((elem) => elem._id !== card._id)),
      )
      .catch((err) => console.log(err));
  }

  function handleRegistration(data) {
    auth
      .registration(data)
      .then((data) => {
        setAuthUser(data.data);
        setStatusInfoTooltip(true);
        setIsInfoTooltipOpen(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setStatusInfoTooltip(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(data) {
    auth
      .login(data)
      .then((res) => {
        setLoggedIn(true);
        setAuthUser(data);
        localStorage.setItem('jwt', res.token);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        setStatusInfoTooltip(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn('false');
    history.push('/sign-in');
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          setAuthUser(data.data);
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  useEffect(() => {
    if (loggedIn) {
        api
          .getData([api.getUserInfo(), api.getInitialCards()])
          .then(([userInfo, cards]) => {
            setCurrentUser(userInfo);
            setCards(cards);
          })
          .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        authUser={authUser}
        handleLogout={handleLogout}
        loggedIn={loggedIn}
      />
      <Switch>
        <Route path="/sign-in">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/sign-up">
          <Registration handleRegistration={handleRegistration} />
        </Route>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={Main}
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
      </Switch>

      <Footer />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
        name="registr"
        isOpen={isInfoTooltipOpen}
        status={statusInfoTooltip}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
