import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({signOut, loggedIn, userEmail }) {
  const location = useLocation();
  console.log(location);
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      {
        loggedIn
          ? <>
              <p>{userEmail}</p>
              <button onClick={signOut} type="button">Выйти</button>
            </>
          : location.pathname === '/signin' ? <Link to="/signup">Регистрация</Link> : <Link to="/signin">Войти</Link>
      }

    </header>
  );
}

export default Header;
