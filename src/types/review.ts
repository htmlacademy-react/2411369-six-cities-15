export type UserReview = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type Review = {
  id?: string;
  date: string;
  user: UserReview;
  comment: string;
  rating: number;
}
