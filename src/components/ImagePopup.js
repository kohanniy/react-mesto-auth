import { handleStopPropagation } from '../utils/utils';

function ImagePopup({ card, onClose}) {
  return (
    <div
      onClick={onClose}
      className={`popup ${card ? 'popup_opened' : 'popup_closed'}`}
    >
      <div onClick={handleStopPropagation} className="popup__container">
        <figure className="popup__pic-wrap">
          <img alt={card.name} src={card.link} className="popup__pic" />
          <figcaption className="popup__pic-caption">{card.name}</figcaption>
        </figure>
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
          className="popup__close-btn"
        />
      </div>
    </div>
  );
}

export default ImagePopup;
