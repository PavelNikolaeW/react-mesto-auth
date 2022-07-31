import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="popup__label">
        <input
          type="text"
          name="name"
          className="popup__input popup__input_type_name"
          required
          minLength="2"
          maxLength="40"
          placeholder="имя"
          value={name || ''}
          onChange={handleChangeName}
        />
        <span className="popup__input-error"> </span>
      </label>
      <label htmlFor="subtext" className="popup__label">
        <input
          type="text"
          name="about"
          className="popup__input popup__input_type_subtext"
          required
          minLength="2"
          maxLength="200"
          placeholder="подпись"
          value={about || ''}
          onChange={handleChangeAbout}
        />
        <span className="popup__input-error"> </span>
      </label>
    </PopupWithForm>
  );
}
