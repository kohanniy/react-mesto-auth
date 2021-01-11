import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  return (
    <>
      <div>Зарегистрироваться</div>
      <p>
        Уже зарегистрированы?&nbsp;
        <Link to="sign-in">Войти</Link>
      </p>
    </>
  );
}

export default Register;
