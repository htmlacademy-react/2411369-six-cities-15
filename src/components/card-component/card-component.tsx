import { Link } from 'react-router-dom';
import { ListOffers } from '../../types/offer';
import classNames from 'classnames';
import { useState } from 'react';

type CardComponentProps = ListOffers & {
  environment: 'cities' | 'favorites' | 'near-places';
};

const MAX_RATING = 5;

const cardClass = {
  cities: 'cities',
  favorites: 'favorites',
  near: 'near-places'
};

const sizeImg = {
  [cardClass.cities]: {
    width: 260,
    height: 200
  },
  [cardClass.favorites]: {
    width: 150,
    height: 110
  },
  [cardClass.near]: {
    width: 260,
    height: 200
  }
};

function CardComponent({
  id,
  title,
  type,
  price,
  isFavorite,
  isPremium,
  rating,
  previewImage,
  environment
}: CardComponentProps): JSX.Element {
  const ratingPercentage = (rating / MAX_RATING) * 100;

  const [isBookmarked, setIsBookmarked] = useState(isFavorite);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const bookmarkClass = classNames('button', 'place-card__bookmark-button', {
    'place-card__bookmark-button--active': isBookmarked
  });

  return (
    <article className={`${environment}__card place-card`}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={`${environment}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={sizeImg[environment].width} height={sizeImg[environment].height} alt="Place image" />
        </Link>
      </div>
      <div className={`${isFavorite ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={bookmarkClass} type="button" onClick={toggleBookmark}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">${isBookmarked ? 'In' : 'To'} bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{
              width: `${ratingPercentage}%`
            }}
            />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default CardComponent;
