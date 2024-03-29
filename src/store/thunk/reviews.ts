import { Review } from '../../types/review';
import { APIRoute } from '../../const';
import { createAppAsyncThunk } from '../../hooks/store';
import { FullOffer } from '../../types/offer';

export const fetchReviews = createAppAsyncThunk<Review[], FullOffer['id']>(
  'reviews/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  }
);

type PostCommentProps = {
  body: {
    comment: string;
    rating: number;
  };
  offerId: FullOffer['id'];
}

export const postReview = createAppAsyncThunk<Review, PostCommentProps>(
  'reviews/post',
  async ({ body, offerId }, { extra: api }) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, body);
    return data;
  }
);
