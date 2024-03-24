import { Link } from 'react-router-dom';
import LoggedNavigation from '../logged-navigation/logged-navigation';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { userSelectors } from '../../store/slice/user';

type NavigationProps = {
  pathname: string;
}

function Navigation({pathname}: NavigationProps): JSX.Element {
  const location = pathname;
  const loginLink: string = AppRoute.Login;
  const isLoginPage = loginLink === location;

  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);
  if (isLoginPage) {
    return (
      <nav className="header__nav"></nav>
    );
  }

  return (
    <nav className="header__nav">
      {authorizationStatus === AuthorizationStatus.Auth ? (
        <LoggedNavigation pathname={pathname} />
      ) : (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__signout">Sign in</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
