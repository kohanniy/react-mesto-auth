import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
  return (
    <>
      <div>Войти</div>
      <p>
        Еще не зарегестрированы?&nbsp;
        <Link to="/signup">Зарегистрироваться</Link>
      </p>
    </>
  );
}

export default Login;
