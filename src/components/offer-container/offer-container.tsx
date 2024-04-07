import classNames from 'classnames';
import { FullOffer } from '../../types/offer';
import { formatRating, ucFirst } from '../../utils';
import Bookmark from '../bookmark/bookmark';
import { memo } from 'react';
import OfferReviews from '../offer-reviews/offer-reviews';

type OfferContainerProps = {
  offer: FullOffer;
  offerId: FullOffer['id'];
}

function OfferContainer_({offer, offerId}: OfferContainerProps): JSX.Element {
  const { bedrooms, description, goods, host, isFavorite, isPremium, maxAdults, price, rating, title, type } = offer;
  const { name, avatarUrl, isPro } = host;

  return (
    <div className="offer__container container">
      <div className="offer__wrapper">
        {isPremium && (
          <div className="offer__mark">
            <span>Premium</span>
          </div>
        )}

        <div className="offer__name-wrapper">
          <h1 className="offer__name">
            {title}
          </h1>
          <Bookmark isFavorite={isFavorite} offerId={offerId} place='offer' />
        </div>
        <div className="offer__rating rating">
          <div className="offer__stars rating__stars">
            <span style={{
              width: formatRating(rating)
            }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
          <span className="offer__rating-value rating__value">{rating}</span>
        </div>
        <ul className="offer__features">
          <li className="offer__feature offer__feature--entire">
            {ucFirst(type)}
          </li>
          <li className="offer__feature offer__feature--bedrooms">
            {bedrooms > 1 ? `${bedrooms} Bedrooms` : `${bedrooms} Bedroom`}
          </li>
          <li className="offer__feature offer__feature--adults">
            {maxAdults > 1 ? `Max ${maxAdults} adults` : `Max ${maxAdults} adult`}
          </li>
        </ul>
        <div className="offer__price">
          <b className="offer__price-value">&euro;{price}</b>
          <span className="offer__price-text">&nbsp;night</span>
        </div>
        <div className="offer__inside">
          <h2 className="offer__inside-title">What&apos;s inside</h2>
          <ul className="offer__inside-list">
            {goods.map((item) => (
              <li className="offer__inside-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="offer__host">
          <h2 className="offer__host-title">Meet the host</h2>
          <div className="offer__host-user user">
            <div className={classNames('offer__avatar-wrapper', 'user__avatar-wrapper', {'offer__avatar-wrapper--pro': isPro})}>
              <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
            </div>
            <span className="offer__user-name">
              {name}
            </span>
            {isPro && (
              <span className="offer__user-status">
                Pro
              </span>
            )}
          </div>
          <div className="offer__description">
            <p className="offer__text">
              {description}
            </p>
          </div>
        </div>
        <OfferReviews offerId={ offerId } />
      </div>
    </div>
  );
}

const OfferContainer = memo(OfferContainer_);

export default OfferContainer;
