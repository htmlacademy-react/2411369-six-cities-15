import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../navigation/navigation';
import { AppRoute } from '../../const';
import Logo from '../logo/logo';

function Header(): JSX.Element {
  const { pathname } = useLocation() as { pathname: AppRoute };

  const classPage = {
    [AppRoute.Main]: 'page--gray page--main',
    [AppRoute.Login]: 'page--gray page--login',
    [AppRoute.Favorites]: '',
    [AppRoute.Offer]: '',
    [AppRoute.NotFound]: ''
  };

  return (
    <div className={`page ${classPage[pathname]}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo pathname={pathname} />
            </div>
            <Navigation pathname={pathname} />
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Header;
