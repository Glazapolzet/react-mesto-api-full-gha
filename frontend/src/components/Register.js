import {Link} from "react-router-dom";
import {useState} from "react";

export default function Register (props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit (evt) {
    evt.preventDefault();

    if (!email || !password) {
      return
    }

    props.onRegister(email, password)
      .then((r) => {
        setEmail("");
        setPassword("");
      })
  }

  function handleEmailChange (evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange (evt) {
    setPassword(evt.target.value);
  }

  return (
    <div className="entry">
      <h1 className="entry__title">Регистрация</h1>
      <form className="entry__form" onSubmit={handleSubmit}>
        <fieldset className="entry__input-area">
          <input
            type={"email"}
            className="entry__input"
            placeholder={'Email'}
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type={"password"}
            className="entry__input"
            placeholder={'Пароль'}
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </fieldset>
        <button className="entry__button">Зарегистрироваться</button>
        <Link to={"/sign-in"} className="entry__link">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  )
}