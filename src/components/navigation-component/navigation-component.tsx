import { Link } from 'react-router-dom';
import LoggedNavigationComponent from '../../logged-navigation-component/logged-navigation-component';
import useAuth from '../../hooks/user-authorization';
import { AppRoute } from '../../const';

type NavigationComponentProps = {
  pathname: string;
}

function NavigationComponent({pathname}: NavigationComponentProps): JSX.Element {
  const location = pathname;
  const loginLink: string = AppRoute.Login;
  const isLoginPage = loginLink === location;
  const [authState, login, logout] = useAuth();

  if (isLoginPage) {
    return (
      <nav className="header__nav"></nav>
    );
  }

  return (
    <nav className="header__nav">
      {authState.isAuthenticated ? (
        <LoggedNavigationComponent logout={logout} />
      ) : (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to='#' onClick={() => login('test')}>
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__signout">Sign in</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavigationComponent;
