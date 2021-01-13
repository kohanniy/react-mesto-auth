import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ClosePopupButton from './ClosePopupButton';
import Input from './Input';


function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    resetForm();
    setValues(currentUser);
    setIsValid(true);
  }, [isOpen, resetForm, currentUser, setValues, setIsValid]);


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isDisabled={!isValid}
    >
      <Input
        name="name"
        type="text"
        placeholder="Валентин Петров"
        errors={errors}
        values={values}
        handleChange={handleChange}
        minLength="2" maxLength="40"
        isAuth={false}
      />
      <Input
        name="about"
        type="text"
        placeholder="Род занятий. Например, программист"
        errors={errors}
        values={values}
        handleChange={handleChange}
        minLength="2" maxLength="200"
        isAuth={false}
      />
      <ClosePopupButton onClose={onClose} />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
