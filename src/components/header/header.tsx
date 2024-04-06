import { useLocation } from 'react-router-dom';
import Navigation from '../navigation/navigation';
import { AppRoute, CITIES } from '../../const';
import Logo from '../logo/logo';

const citiesRotes = new Set(CITIES.map((city) => `/${city.id}`));

function Header(): JSX.Element {
  const { pathname } = useLocation();
  const pathName = pathname as AppRoute;
  const isOnMain = AppRoute.Main === pathName || citiesRotes.has(pathname);

  return (
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
  );
}

export default Header;
