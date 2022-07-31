import logo from '../images/header/logo.svg';

export default function Header(props) {
  return (
    <header className="header container">
      <img src={logo} alt="МЕСТО росся" className="header__logo" />
    </header>
  );
}
