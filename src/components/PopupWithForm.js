import React from 'react';
import { handleStopPropagation } from '../utils/utils';

function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  name,
  title,
  children,
  buttonText,
  isDisabled = false
}) {
  return (
      <div onClick={onClose} className={`popup ${isOpen ? 'popup_opened' : 'popup_closed'}`}>
        <form
          onClick={handleStopPropagation}
          onSubmit={onSubmit}
          name={name}
          className="popup__form"
          noValidate
        >
          <h3 className="popup__heading">{title}</h3>
          {children}
          <button
            type="submit"
            className={`popup__button ${isDisabled && 'popup__button_disabled'}`}
            disabled={isDisabled}
          >
            {buttonText}
          </button>
          <button
            onClick={onClose}
            type="button"
            aria-label="Закрыть" className="popup__close-btn"
          />
        </form>
      </div>
  );
}

export default PopupWithForm;
