import { Route, Switch, NavLink } from 'react-router-dom';

import logo from '../images/header/logo.svg';

export default function Header({ authUser, handleLogout, loggedIn }) {
  return (
    <header className="header container">
      <img src={logo} alt="МЕСТО росся" className="header__logo" />
      <nav className="header__nav">
        <Switch>
          <Route path="/sign-in">
            <NavLink className="header__btn" to="/sign-up">
              Зарегистрироваться
            </NavLink>
          </Route>
          <Route path="/sign-up">
            <NavLink className="header__btn" to="/sign-in">
              Войти
            </NavLink>
          </Route>
          <Route path="/">
            <>
              <p className="header__email">{authUser.email}</p>
              <button className="header__btn" onClick={handleLogout}>
                Выйти
              </button>
            </>
          </Route>
        </Switch>
      </nav>
    </header>
  );
}
