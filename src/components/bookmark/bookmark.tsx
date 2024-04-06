import classNames from 'classnames';
import { useBoolean } from '../../hooks';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useActionCreators, useAppSelector } from '../../hooks/store';
import { userSelectors } from '../../store/slice/user';
import { FullOffer } from '../../types/offer';
import { favoritesActions } from '../../store/slice/favorites';

type BookmarkProps = {
  isActive: boolean;
  offerId: FullOffer['id'];
  place?: 'place-card' | 'offer';
}

function Bookmark_({ isActive, offerId, place = 'place-card' }: BookmarkProps): JSX.Element {
  const {isOn: isBookmarked, toggle: toggleBookmark} = useBoolean(isActive);
  const classNameObject = {
    [`${place}__bookmark-button`]: true,
    [`${place}__bookmark-button--active`]: isBookmarked
  };
  const bookmarkClass = classNames('button', classNameObject);
  const iconWidth = place === 'offer' ? '31' : '18';
  const iconHeight = place === 'offer' ? '33' : '19';

  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);
  const { postFavorite } = useActionCreators(favoritesActions);
  const navigate = useNavigate();
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const handleClick = () => {
    if (!isAuth) {
      return navigate(AppRoute.Login);
    }
    postFavorite({id: offerId, isFavorite: !isBookmarked});
    toggleBookmark();
  };

  return (
    <button className={bookmarkClass} type="button" onClick={handleClick}>
      <svg className={`${place}__bookmark-icon`} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isBookmarked ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

const Bookmark = memo(Bookmark_);

export default Bookmark;
