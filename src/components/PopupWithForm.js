import React from 'react';
import Form from "./Form";

function PopupWithForm(props) {
  const { isOpen, onClose, onSubmit, name, title, children, buttonText, isDisabled } = props;

  return (
    <div onClick={onClose} className={`popup ${isOpen ? 'popup_opened' : 'popup_closed'}`}>
      <Form
        onSubmit={onSubmit}
        name={name}
        title={title}
        children={children}
        buttonText={buttonText}
        isDisabled={isDisabled}
        onClose={onClose}
        formClasses={'popup__form'}
      />
    </div>
  );
}

export default PopupWithForm;
