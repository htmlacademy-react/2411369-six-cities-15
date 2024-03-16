import { RootState } from '../../types/store';

const selectorOffers = (state: RootState) => state.offers.offers;
const selectorCity = (state: RootState) => state.offers.city;

export { selectorCity, selectorOffers };
