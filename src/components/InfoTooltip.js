import ok from '../images/popup/ok.svg';
import error from '../images/popup/error.svg';

export default function InfoTooltip({ name, isOpen, status, onClose }) {
  return (
    <div className={'popup ' + (isOpen && 'popup_opened')} id={'popup-' + name}>
      <div className="popup__container">
        <div className="popup__body popup__body-small">
          {status ? (
            <div className="popup__info-body">
              <img src={ok} alt="ok" />
              <p className="popup__message">Вы успешно зарегистрировались!</p>
            </div>
          ) : (
            <div className="popup__info-body">
              <img src={error} alt="error" />
              <div className="popup__message">
                Что-то пошло не так! Попробуйте ещё раз.
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
