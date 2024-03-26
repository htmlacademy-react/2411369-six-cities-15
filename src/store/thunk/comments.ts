import { Review } from '../../types/review';
import { APIRoute } from '../../const';
import { createAppAsyncThunk } from '../../hooks/store';
import { FullOffer } from '../../types/offer';

const fetchComments = createAppAsyncThunk<Review[], FullOffer['id']>(
  'comments/fetch',
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

const postComment = createAppAsyncThunk<Review, PostCommentProps>(
  'comments/post',
  async ({ body, offerId }, { extra: api }) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, body);
    return data;
  }
);

export const commentsThunks = { fetchComments, postComment };
