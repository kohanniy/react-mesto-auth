import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import Input from './Input';

function Register({onRegisterFormSubmit, isLoading}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegisterFormSubmit(values.password, values.email);
  }

  return (
    <section className="authentication">
      <Form
        name="register"
        title="Регистрация"
        buttonText={isLoading ? 'Сохранение...' : 'Зарегистрироваться'}
        isDisabled={!isValid}
        formClasses={'authentication__form form_auth'}
        isAuth={true}
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          name="email"
          placeholder="Email"
          handleChange={handleChange}
          values={values}
          autoComplete="email"
          errors={errors}
          isAuth={true}
        />
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          handleChange={handleChange}
          values={values}
          errors={errors}
          isAuth={true}
          minLength="6" maxLength="200"
          autoComplete = "new-password"
        />
      </Form>
      <p className="authentication__text">
        Уже зарегистрированы?&nbsp;
        <Link className="authentication__link" to="signin">Войти</Link>
      </p>
    </section>
  );
}

export default Register;
