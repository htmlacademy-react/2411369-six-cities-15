import { Link, useLocation } from 'react-router-dom';
import { CITIES } from '../../const';

const cityLink = CITIES.map((city) => (`/${city.slug}`));

function LogoComponent(): JSX.Element {
  const location = useLocation();
  const isCityPage = cityLink.includes(location.pathname);
  const imgLogo = <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />;

  if (isCityPage) {
    return imgLogo;
  } else {
    return (
      <Link to='/' className="header__logo-link header__logo-link--active">
        {imgLogo}
      </Link>
    );
  }
}

export default LogoComponent;
