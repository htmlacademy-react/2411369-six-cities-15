import { FullOffer } from './offer';

export type FavoriteData = {
  offerId: FullOffer['id'];
  isFavorite: boolean;
}
