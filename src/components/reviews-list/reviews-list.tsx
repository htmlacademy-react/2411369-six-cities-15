import { memo } from 'react';
import { Review } from '../../types/review';
import { formatDate, formatRating } from '../../utils';

type ReviewListProps = {
  reviews: Review[];
}

const MAX_COUNT_REVIEWS = -3;

function ReviewsList_({ reviews }: ReviewListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map(({rating, id, user, comment, date}) => (
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
      )).slice(MAX_COUNT_REVIEWS)}
    </ul>
  );
}

const ReviewsList = memo(ReviewsList_);

export default ReviewsList;
