import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import Input from './Input';

function Login({onLoginFormSubmit, isLoading}) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLoginFormSubmit(values.password, values.email);
  }

  return (
    <section className="authentication">
      <Form
        name="login"
        title="Вход"
        buttonText={isLoading ? 'Вход...' : 'Войти'}
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
          autoComplete = "password"
        />
      </Form>
      <p className="authentication__text">
        Еще не зарегистрированы?&nbsp;
        <Link className="authentication__link" to="signup">Зарегистрироваться</Link>
      </p>
    </section>
  );
}

export default Login;
