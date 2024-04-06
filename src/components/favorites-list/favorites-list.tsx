import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ServerOffer } from '../../types/offer';
import { CityName } from '../../const';
import Card from '../card/card';

type FavoritesListProps = {
  favorites: ServerOffer[];
}

function FavoritesList_({favorites}: FavoritesListProps): JSX.Element {
  const favoritesByCity = Object.groupBy(favorites, (favorite) => favorite.city.name);
  const cities = Object.keys(favoritesByCity) as CityName[];

  return (
    <ul className="favorites__list">
      {cities.map((city) => {
        const slug = city.toLowerCase();

        return (
          <li className="favorites__locations-items" key={slug}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to={`/${slug}`}>
                  <span>{city}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {favoritesByCity[city]?.map((offer) =>
                <Card key={offer.id} environment="favorites" {...offer} />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

const FavoritesList = memo(FavoritesList_);

export default FavoritesList;
