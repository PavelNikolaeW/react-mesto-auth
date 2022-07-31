import PopupWithForm from './PopupWithForm';

export default function ConfirmPopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены ?"
      btnText="Да"
      onClose={onClose}
      isOpen={isOpen}
    ></PopupWithForm>
  );
}
