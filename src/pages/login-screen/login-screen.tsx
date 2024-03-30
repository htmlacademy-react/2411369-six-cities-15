import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/document-title';
import { FormEvent, ReactEventHandler, useState } from 'react';
import { userActions } from '../../store/slice/user';
import { useActionCreators } from '../../hooks/store';
import { RandomCity } from '../../components/random-city/random-city';

type HTMLLoginForm = HTMLFormElement & {
  email: HTMLInputElement;
  password: HTMLInputElement;
};

type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

function LoginScreen(): JSX.Element {
  useDocumentTitle('Login');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useActionCreators(userActions);

  const handleChange: ChangeHandler = (evt) => {
    const { name, value } = evt.currentTarget;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLLoginForm>) => {
    evt.preventDefault();
    login(formData);
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                pattern="^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$"
                onChange={handleChange}
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                pattern="^(?=.*[a-zA-Z])(?=.*\d).+$"
                onChange={handleChange}
                required
              />
            </div>
            <button className="login__submit form__submit button" type="submit">
              Sign in
            </button>
          </form>
        </section>
        <RandomCity />
      </div>
    </main>
  );
}

export default LoginScreen;
