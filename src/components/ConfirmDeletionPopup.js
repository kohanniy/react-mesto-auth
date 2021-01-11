import React from 'react';
import PopupWithForm from './PopupWithForm';

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
      onClose={onClose}
      title="Вы уверены?"
      buttonText={isLoading ? 'Удаление...' : 'Да'}
    >
    </PopupWithForm>
  );
}

export default ConfirmDeletionPopup;
