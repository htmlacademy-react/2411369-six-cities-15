import HeaderComponent from '../../components/header-component/header-component';
import { useDocumentTitle } from '../../hooks/document-title';
import CardComponent from '../../components/card-component/card-component';
import { getMockOffer } from '../../mocks/offers';
import { Review } from '../../types/review';
import { ListOffers } from '../../types/offer';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import ReviewsListComponent from '../../components/reviews-list-component/reviews-list-component';
import ReviewsFormComponent from '../../components/reviews-form-component/reviews-form-component';

type OfferScreenProps = {
  offers: ListOffers[];
  reviews: Review[];
}

const MAX_RATING = 5;

function OfferScreen({offers, reviews}: OfferScreenProps): JSX.Element {
  useDocumentTitle('Offer');

  const {id} = useParams();
  const offer = offers.filter((item) => item.id.toString() === id);
  const [{ isFavorite, isPremium, description, goods, host, images, rating, maxAdults, price, title, type, bedrooms }] = offer;
  const { name, avatarUrl, isPro } = host;
  const countReviews = reviews;

  const ratingPercentage = (rating / MAX_RATING) * 100;
  const [isBookmarked, setIsBookmarked] = useState(isFavorite);
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const bookmarkClass = classNames('button', 'offer__bookmark-button', {
    'offer__bookmark-button--active': isBookmarked
  });

  return (
    <div className="page">
      <HeaderComponent />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
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
                <button className={bookmarkClass} type="button" onClick={toggleBookmark}>
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">${isFavorite ? 'In' : 'To'} bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{
                    width: `${ratingPercentage}%`
                  }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
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
                  <div className={`offer__avatar-wrapper ${isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {name}
                  </span>
                  <span className="offer__user-status">
                    {isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{countReviews.length}</span></h2>
                <ReviewsListComponent reviews={reviews} />
                <ReviewsFormComponent />
              </section>
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {/* Временное решение */}
              {Array.from({ length: 3 }, getMockOffer).map((item) => (
                <CardComponent key={item.id} environment="near-places" {...item} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
