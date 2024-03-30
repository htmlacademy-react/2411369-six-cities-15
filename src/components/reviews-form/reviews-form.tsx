import { Fragment, useRef, useState } from 'react';
import { useActionCreators } from '../../hooks/store';
import { reviewsActions } from '../../store/slice/review';
import { FullOffer } from '../../types/offer';
import { toast } from 'react-toastify';

type ReviewsFormProps = {
  offerId: FullOffer['id'] | undefined;
}

type Form = HTMLFormElement & {
  rating: RadioNodeList;
  review: HTMLTextAreaElement;
}

const MAX_COMMENT_LENGTH = 300;
const MIN_COMMENT_LENGTH = 50;

const ratings = [
  {value: 5, label: 'perfect'},
  {value: 4, label: 'good'},
  {value: 3, label: 'not bad'},
  {value: 2, label: 'badly'},
  {value: 1, label: 'terribly'},
];

function ReviewsForm({ offerId }: ReviewsFormProps): JSX.Element {
  const { postReview } = useActionCreators(reviewsActions);
  const [ isSubmitDisabled, setSubmitDisabled ] = useState(true);
  const formRef = useRef(null);
  const [ isDisabled, setDisabled ] = useState(false);

  const handleFormChange = (evt: React.FormEvent<HTMLFormElement>) => {
    const form = evt.currentTarget as Form;
    const rating = form.rating.value;
    const review = form.review.value;
    setSubmitDisabled(review.length <= MIN_COMMENT_LENGTH || review.length > MAX_COMMENT_LENGTH || !rating);
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = evt.currentTarget as Form;
    const reviewToSend = {
      body: {
        comment: form.review.value,
        rating: +form.rating.value
      },
      offerId
    };
    setDisabled(true);
    toast.promise(postReview(reviewToSend).unwrap(), {
      pending: 'Sending review...',
      success: {
        render: () => {
          setDisabled(false);
          setSubmitDisabled(true);
          form.reset();
          return 'Review sent!';
        }
      },
      error: {
        render() {
          setDisabled(false);
          return 'Failed to send review. Please try again';
        }
      }
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onChange={handleFormChange} onSubmit={handleFormSubmit} ref={formRef} >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratings.map(({value, label}) => (
          <Fragment key={label}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={label}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isDisabled}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.</p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled || isDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
