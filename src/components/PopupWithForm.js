export default function PopupWithForm({
  name,
  title,
  btnText,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={'popup ' + (isOpen && 'popup_opened')} id={`popup-${name}`}>
      <div className="popup__card-container">
        <div className="popup__body popup__body-small">
          <h2 className="popup__title"> {title} </h2>
          <form action="#" name={`${name}Form`} className="popup__form" onSubmit={onSubmit}>
            {children}
            <button type="submit" className="popup__submit">
              {btnText}
            </button>
          </form>
        </div>
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  );
}
