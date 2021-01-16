import React from 'react';
import Form from './Form';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import Input from './Input';

function Login({onLoginFormSubmit, isLoading}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

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
          autoComplete = "current-password"
        />
      </Form>
    </section>
  );
}

export default Login;
