import React from 'react';
import PopupWithForm from './PopupWithForm';
import ClosePopupButton from './ClosePopupButton';

function ConfirmDeletionPopup({ isOpen, onClose, cardDelete, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    cardDelete(isOpen);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="confirm-deletion"
      title="Вы уверены?"
      buttonText={isLoading ? 'Удаление...' : 'Да'}
    >
      <ClosePopupButton onClose={onClose} />
    </PopupWithForm>
  );
}

export default ConfirmDeletionPopup;
