import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login (props) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit (evt) {
    evt.preventDefault();

    if (!email || !password) {
      return
    }

    props.onLogin(email, password)
      .then((r) => {
        navigate('/', {replace: true});
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
      <h1 className="entry__title">Вход</h1>
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
        <button className="entry__button">Войти</button>
      </form>
    </div>
  )
}