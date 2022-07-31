import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__urn ${isOwn ? '' : 'card__urn_display_none'}`;

  const isLike = card.likes.some((elem) => elem._id === currentUser._id);
  const cardButtonClassName = `card__button ${isLike ? 'card__button_type_active' : ''}`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleCardDelete}
      ></button>
      <img src={card.link} alt={card.name} className="card__img" onClick={handleCardClick}></img>
      <div className="card__footer">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button type="button" className={cardButtonClassName} onClick={handleCardLike}></button>
          <span className="card__counter"> {card.likes.length} </span>
        </div>
      </div>
    </li>
  );
}
