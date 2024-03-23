import { Link } from 'react-router-dom';

type LogoProps = {
  isOnMain: boolean;
}

function Logo({isOnMain}: LogoProps): JSX.Element {
  const imgLogo = <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />;
  const linkLogo = (
    <Link to='/' className="header__logo-link header__logo-link--active">
      {imgLogo}
    </Link>
  );

  return (
    isOnMain ? imgLogo : linkLogo
  );
}

export default Logo;
