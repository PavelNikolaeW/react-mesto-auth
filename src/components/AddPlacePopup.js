import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNewPlace(e) {
    setName(e.target.value);
  }

  function handleNewPlaceLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="add"
      title="Новое место"
      btnText="Создать"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="title" className="popup__label">
        <input
          type="text"
          placeholder="Название"
          name="name"
          className="popup__input popup__input_type_title"
          required
          minLength="2"
          maxLength="30"
          onChange={handleNewPlace}
          value={name}
        />
        <span className="popup__input-error"> </span>
      </label>
      <label htmlFor="link" className="popup__label">
        <input
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_link"
          required
          onChange={handleNewPlaceLink}
          value={link}
        />
        <span className="popup__input-error"> </span>
      </label>
    </PopupWithForm>
  );
}
