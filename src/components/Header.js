import logo from '../images/logo.svg';

function Header({headerButtonClick, loggedIn}) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <button onClick={headerButtonClick} type="button">{loggedIn ? 'Выйти' : 'Войти'}</button>
    </header>
  );
}

export default Header;
