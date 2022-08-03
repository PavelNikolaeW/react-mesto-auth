import { useLocation, NavLink } from 'react-router-dom';

import logo from '../images/header/logo.svg';

export default function Header({ authUser, handleLogout, loggedIn }) {
  const location = useLocation();
  return (
    <header className="header container">
      <img src={logo} alt="МЕСТО росся" className="header__logo" />
      <nav className="header__nav">
        {location.pathname === '/sign-in' && (
          <NavLink className="header__btn" to="/sign-up">
            Зарегистрироваться
          </NavLink>
        )}
        {location.pathname === '/sign-up' && (
          <NavLink className="header__btn" to="/sign-in">
            Войти
          </NavLink>
        )}
        {location.pathname === '/' && (
          <>
            <p className="header__email">{authUser.email}</p>
            <button className="header__btn" onClick={handleLogout}>
              Выйти
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
