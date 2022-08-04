import ok from '../images/popup/ok.svg';
import error from '../images/popup/error.svg';

export default function InfoTooltip({ name, isOpen, status, onClose }) {
  return (
    <div className={'popup ' + (isOpen && 'popup_opened')} id={'popup-' + name}>
      <div className="popup__container">
        <div className="popup__body popup__body-small">
          <div className="popup__info-body">
            <img src={status ? ok : error} alt={status ? 'ok' : 'error'} />
            <p className="popup__message">
              {status
                ? 'Вы успешно зарегистрировались!'
                : 'Что-то пошло не так! Попробуйте ещё раз.'}
            </p>
          </div>
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
