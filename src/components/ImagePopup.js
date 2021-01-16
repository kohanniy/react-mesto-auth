import Popup from './Popup';

function ImagePopup({ card, onClose, isOpen }) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      isImagePopup={true}
      data={card}
    >
      <figure className="popup__pic-wrap">
        <img alt={card.name} src={card.link} className="popup__pic" />
        <figcaption className="popup__pic-caption">{card.name}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
