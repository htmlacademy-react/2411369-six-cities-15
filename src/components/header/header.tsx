import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../navigation/navigation';
import { AppRoute, CITIES } from '../../const';
import Logo from '../logo/logo';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/store';
import { favoritesSelector } from '../../store/slice/favorites';

const classPage: Record<string, string> = {
  [AppRoute.Login]: 'page--gray page--login',
};

const citiesRotes = new Set(CITIES.map((city) => `/${city.id}`));

function Header(): JSX.Element {
  const { pathname } = useLocation();
  const countFavorites = useAppSelector(favoritesSelector.favorites);
  const hasFavorites = Boolean(countFavorites.length);
  const pathName = pathname as AppRoute;
  const isOnMain = AppRoute.Main === pathName || citiesRotes.has(pathname);

  return (
    <div className={classNames('page', classPage[pathname], {
      'page--gray page--main': isOnMain,
      'page--favorites-empty': hasFavorites
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
