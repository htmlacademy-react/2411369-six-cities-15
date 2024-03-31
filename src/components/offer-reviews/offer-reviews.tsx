import { memo } from 'react';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { reviewsSelector } from '../../store/slice/review';
import { userSelectors } from '../../store/slice/user';
import { FullOffer } from '../../types/offer';
import ReviewsForm from '../reviews-form/reviews-form';
import ReviewsList from '../reviews-list/reviews-list';

type ReviewListProps = {
  offerId: FullOffer['id'] | undefined;
}

function OfferReviews_({ offerId }: ReviewListProps): JSX.Element {
  const reviews = useAppSelector(reviewsSelector.lastReviews);

  const authStatus = useAppSelector(userSelectors.authorizationStatus);
  const isLogged = authStatus === AuthorizationStatus.Auth;

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ReviewsList reviews={reviews} />
      {isLogged && <ReviewsForm offerId={ offerId } />}
    </section>
  );
}

const OfferReviews = memo(OfferReviews_);

export default OfferReviews;
