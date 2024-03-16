import { RootState } from '../../types/store';

const selectorOffers = (state: RootState) => state.offers;
const selectorCity = (state: RootState) => state.city;

export { selectorCity, selectorOffers };
