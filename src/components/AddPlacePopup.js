import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import ClosePopupButton from './ClosePopupButton';
import Input from './Input';

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
      title="Новое место"
      buttonText={isLoading ? 'Сохранение...' : 'Создать'}
      isDisabled={!isValid}
    >
      <Input
        name="name"
        type="text"
        placeholder="Название"
        minLength="1"
        maxLength="30"
        errors={errors}
        values={values}
        handleChange={handleChange}
        isAuth={false}
      />
      <Input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        errors={errors}
        values={values}
        handleChange={handleChange}
        isAuth={false}
      />
      <ClosePopupButton onClose={onClose} />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
