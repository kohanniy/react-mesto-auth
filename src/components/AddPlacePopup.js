import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation'

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="add-card"
      onClose={onClose}
      title="Новое место"
      buttonText={isLoading ? 'Сохранение...' : 'Создать'}
      isDisabled={!isValid}
    >
      <input
        onChange={handleChange}
        id="place-name"
        type="text"
        name="name"
        className="popup__input"
        placeholder="Название"
        minLength="1"
        maxLength="30"
        value={values.name || ''}
        required
      />
      <span
        id="place-name-error"
        className="popup__input-error">
          {errors.name || ''}
        </span>
      <input
        onChange={handleChange}
        id="picture-link"
        type="url"
        name="link"
        className="popup__input"
        placeholder="Ссылка на картинку"
        value={values.link || ''}
        required
      />
      <span
        id="picture-link-error"
        className="popup__input-error">
          {errors.link || ''}
        </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
