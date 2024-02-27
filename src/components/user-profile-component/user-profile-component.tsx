import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useLocation } from 'react-router-dom';

function UserProfileComponent(): JSX.Element {
  const location = useLocation();
  const loginLink: string = AppRoute.Login;
  const isLoginPage = loginLink === location.pathname;

  if (isLoginPage) {
    // Как вывести null?
    return (
      <ul className="header__nav-list"></ul>
    );
  }

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to="#">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
          <span className="header__favorite-count">3</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link className="header__nav-link" to="#">
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
}

export default UserProfileComponent;
