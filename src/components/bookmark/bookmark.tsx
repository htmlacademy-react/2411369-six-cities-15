import classNames from 'classnames';
import { useState } from 'react';

type BookmarkProps = {
  isActive: boolean;
  place?: 'place-card' | 'offer';
}

function Bookmark({ isActive, place = 'place-card' }: BookmarkProps): JSX.Element {
  const [isBookmarked, setIsBookmarked] = useState(isActive);
  const classNameObject = {
    [`${place}__bookmark-button`]: true,
    [`${place}__bookmark-button--active`]: isBookmarked
  };
  const bookmarkClass = classNames('button', classNameObject);
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

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

export default Bookmark;
