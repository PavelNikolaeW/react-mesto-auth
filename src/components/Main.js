import pencil from '../images/profile/pencil.svg';
import plus from '../images/profile/plus.svg';

import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main container">
      <section className="profile">
        <div className="profile__person person">
          <div className="person__avatar-vrapper">
            <img className="person__img" src={currentUser.avatar} alt="" />
            <button
              type="button"
              className="person__avatar-btn popup-link"
              id="avatar"
              title="Изменить аватар"
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="person__text">
            <div className="person__group">
              <h1 className="person__name"> {currentUser.name} </h1>
              <button
                type="button"
                className="person__button popup-link"
                id="edit"
                title="Редактировать профиль"
                onClick={onEditProfile}
              >
                <img src={pencil} alt="карандаш" className="person__button-img" />
              </button>
            </div>
            <p className="person__subtext"> {currentUser.about} </p>
          </div>
        </div>
        <button
          type="button"
          className="profile__button popup-link"
          id="add"
          title="Добавить фото"
          onClick={onAddPlace}
        >
          <img src={plus} alt="плюс" className="profile__button-img" />
        </button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
