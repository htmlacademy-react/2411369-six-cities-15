// import { useAppSelector } from '../../hooks/store';
// import { userSelectors } from '../../store/slice/user';
import { Review } from '../../types/review';
import { formatDate, formatRating, sortReviewsDate } from '../../utils';
import ReviewsForm from '../reviews-form/reviews-form';

type ReviewListProps = {
  reviews: Review[];
}

const MAX_COUNT_REVIEWS = 3;

function ReviewsList({ reviews }: ReviewListProps): JSX.Element {

  // const sortedReviews = [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const sortedReviews = sortReviewsDate(reviews).slice(0, MAX_COUNT_REVIEWS);


  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {sortedReviews.map(({rating, id, user, comment, date}) => (
          <li className="reviews__item" key={id}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
              </div>
              <span className="reviews__user-name">
                {user.name}
              </span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{
                    width: formatRating(rating)
                  }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {comment}
              </p>
              <time className="reviews__time" dateTime={date}>{formatDate(date)}</time>
            </div>
          </li>
        )).slice(0, 3)}
      </ul>
      <ReviewsForm />
    </section>
  );
}

export default ReviewsList;
