import classNames from 'classnames';
import { useBoolean } from '../../hooks';
import { memo } from 'react';

type BookmarkProps = {
  isActive: boolean;
  place?: 'place-card' | 'offer';
}

function Bookmark_({ isActive, place = 'place-card' }: BookmarkProps): JSX.Element {
  const {isOn: isBookmarked, toggle: toggleBookmark} = useBoolean(isActive);
  const classNameObject = {
    [`${place}__bookmark-button`]: true,
    [`${place}__bookmark-button--active`]: isBookmarked
  };
  const bookmarkClass = classNames('button', classNameObject);
  const iconWidth = place === 'offer' ? '31' : '18';
  const iconHeight = place === 'offer' ? '33' : '19';

  return (
    <button className={bookmarkClass} type="button" onClick={toggleBookmark}>
      <svg className={`${place}__bookmark-icon`} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isBookmarked ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

const Bookmark = memo(Bookmark_);

export default Bookmark;
