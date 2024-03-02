import { Outlet, useLocation } from 'react-router-dom';
import NavigationComponent from '../navigation-component/navigation-component';
import { AppRoute } from '../../const';
import LogoComponent from '../logo-component/logo-component';

function HeaderComponent(): JSX.Element {
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
              <LogoComponent pathname={pathname} />
            </div>
            <NavigationComponent pathname={pathname} />
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default HeaderComponent;
