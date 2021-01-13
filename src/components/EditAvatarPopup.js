import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ClosePopupButton from './ClosePopupButton';
import Input from './Input';

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation();
  const currentUser = React.useContext(CurrentUserContext);


  React.useEffect(() => {
    resetForm();
    setValues(currentUser);
    setIsValid(true);
  }, [isOpen, resetForm, currentUser, setValues, setIsValid]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.avatar || ''
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="edit-avatar"
      title="Обновить аватар"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isDisabled={!isValid}
    >
      <Input
        name="avatar"
        type="url"
        errors={errors}
        placeholder="Ссылка на аватар"
        handleChange={handleChange}
        values={values}
        isAuth={false}
      />
      <ClosePopupButton onClose={onClose} />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
