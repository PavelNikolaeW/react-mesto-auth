import React from 'react';

export default function Login({ handleLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({ email, password });
  }
  return (
    <form className="sign" onSubmit={handleSubmit}>
      <h2 className="sign__title">Вход</h2>
      <div className="sign__input-wrapper">
        <input
          className="sign__input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChangeEmail}
        />
        <input
          className="sign__input"
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChangePassword}
        />
      </div>
      <button className="sign__btn">Войти</button>
    </form>
  );
}
