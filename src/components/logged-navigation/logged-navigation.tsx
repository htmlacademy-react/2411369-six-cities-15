import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useActionCreators, useAppSelector } from '../../hooks/store';
import { userActions, userSelectors } from '../../store/slice/user';
import { useCallback } from 'react';
import { favoritesSelector } from '../../store/slice/favorites';

type LoggedNavigationProps = {
  pathname: AppRoute;
};

function LoggedNavigation({ pathname }: LoggedNavigationProps): JSX.Element {
  const userData = useAppSelector(userSelectors.userData);
  const { logout } = useActionCreators(userActions);
  const favorites = useAppSelector(favoritesSelector.favorites);
  const countFavorites = favorites.length;

  const handleLogout = useCallback(() => {
    logout();
  }, []);

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={AppRoute.Favorites}
        >
          <div className="header__avatar-wrapper user__avatar-wrapper">
            <img
              src={userData?.avatarUrl}
              alt="avatar"
              width={20}
              height={20}
              style={{ borderRadius: '50%' }}
            />
          </div>
          <span className="header__user-name user__name">
            {userData?.email}
          </span>
          <span className="header__favorite-count">{countFavorites}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link className="header__nav-link" to={pathname} onClick={handleLogout}>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
}

export default LoggedNavigation;
