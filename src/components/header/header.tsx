import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../navigation/navigation';
import { AppRoute, CITIES } from '../../const';
import Logo from '../logo/logo';
import classNames from 'classnames';

const classPage: Record<string, string> = {
  [AppRoute.Login]: 'page--gray page--login',
  [AppRoute.Favorites]: '',
};

const citiesRotes = new Set(CITIES.map((city) => `/${city.id}`));

function Header(): JSX.Element {
  const { pathname } = useLocation();
  const pathName = pathname as AppRoute;
  const isOnMain = AppRoute.Main === pathName || citiesRotes.has(pathname);

  return (
    <div className={classNames('page', classPage[pathname], {
      'page--gray page--main': isOnMain,
    })}
    >
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo isOnMain={isOnMain} />
            </div>
            <Navigation pathname={pathName} />
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Header;
