import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {avatarRef.current.value = ""}, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="avatar" className="popup__label">
        <input
          ref={avatarRef}
          type="url"
          name="avatar"
          className="popup__input popup__input_type_link"
          required
          placeholder="Ссылка на картинку"
        />
        <span className="popup__input-error"> </span>
      </label>
    </PopupWithForm>
  );
}
