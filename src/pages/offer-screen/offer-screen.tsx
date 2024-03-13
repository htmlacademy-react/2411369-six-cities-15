import { useDocumentTitle } from '../../hooks/document-title';
import Card from '../../components/card/card';
import { Offers } from '../../types/offer';
import { useParams } from 'react-router-dom';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { reviews } from '../../mocks/reviews';
import Bookmark from '../../components/bookmark/bookmark';
import { formatRating, getNearOffers } from '../../utils';
import classNames from 'classnames';
import Map from '../../components/map/map';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type OfferScreenProps = {
  offers: Offers[];
}

function OfferScreen({ offers }: OfferScreenProps): JSX.Element {
  useDocumentTitle('Offer');

  const { id } = useParams();
  const foundOffer = offers.find((item): boolean => item.id.toString() === id);

  if (!foundOffer) {
    return <NotFoundScreen />;
  }

  const offerPage = {offers, ...foundOffer};
  const { isFavorite, isPremium, description, goods, host, images, rating, maxAdults, price, title, type, bedrooms } = offerPage;
  const { name, avatarUrl, isPro } = host;

  const nearOffers = getNearOffers(offerPage);
  const nearOffersPlusCurrent = [offerPage, ...nearOffers];

  return (
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
              <Bookmark isActive={isFavorite} place='offer' />
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
                <div className={classNames('offer__avatar-wrapper', 'user__avatar-wrapper', {'offer__avatar-wrapper--pro': isPro})}>
                  <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  {name}
                </span>
                <span className="offer__user-status">
                  {isPro && 'Pro'}
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
            <ReviewsList reviews={ reviews } />
          </div>
        </div>
        <Map
          city={offerPage.city}
          offers={nearOffersPlusCurrent}
          activeOfferId={foundOffer.id}
          place='offer'
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearOffers.map((offer) =>
              <Card key={offer.id} environment='near-places' {...offer} />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferScreen;
