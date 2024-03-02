import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type LogoComponentProps = {
  pathname: AppRoute;
}

function LogoComponent({pathname}: LogoComponentProps): JSX.Element {
  const imgLogo = <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />;
  const linkLogo = (
    <Link to='/' className="header__logo-link header__logo-link--active">
      {imgLogo}
    </Link>
  );

  return (
    pathname === AppRoute.Main ? imgLogo : linkLogo
  );
}

export default LogoComponent;
