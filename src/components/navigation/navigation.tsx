import { Link } from 'react-router-dom';
import LoggedNavigation from '../logged-navigation/logged-navigation';
import { AppRoute } from '../../const';
import { useAuth } from '../../hooks/user-auth';

type NavigationProps = {
  pathname: string;
};

function Navigation({ pathname }: NavigationProps): JSX.Element {
  const location = pathname;
  const loginLink: string = AppRoute.Login;
  const isLoginPage = loginLink === location;

  const isAuthorized = useAuth();

  if (isLoginPage) {
    return <nav className="header__nav"></nav>;
  }

  return (
    <nav className="header__nav">
      {isAuthorized ? (
        <LoggedNavigation pathname={pathname} />
      ) : (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Login}
            >
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
