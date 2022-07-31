export default function ImagePopup({ card, onClose }) {
  return (
    <div className={'popup popup_card ' + (card._id && 'popup_opened')}>
      <div className="popup__card-container">
        <figure className="popup__figure">
          <img src={card.link} alt={card.title} className="popup__img" />
          <figcaption className="popup__caption">{card.title}</figcaption>
        </figure>
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  );
}
