import { useState } from 'react';
import CardList from '../../components/card-list/card-list';
import { AppRoute, CityLocation } from '../../const';
import { useDocumentTitle } from '../../hooks/document-title';
import { Offers } from '../../types/offer';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type MainScreenProps = {
  offers: Offers[];
}

const DEFAULT_CITY = CityLocation[2];

function MainScreen({offers}: MainScreenProps): JSX.Element {
  useDocumentTitle('Main page');

  const [currentLocation, setCurrentLocation] = useState(DEFAULT_CITY);
  const currentOffers = offers.filter((offer) => offer.city.name === currentLocation.name);
  const isActive = (city: string) => city === currentLocation.name;
  const isEmpty = currentOffers.length === 0;

  return (
    <main className={classNames('page__main', 'page__main--index', {'page__main--index-empty': isEmpty})}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {CityLocation.map((city) => (
              <li className="locations__item" key={city.name}>
                <Link
                  className={classNames('locations__item-link', 'tabs__item', {'tabs__item--active': isActive(city.name)})}
                  to={AppRoute.Main}
                  onClick={(evt) => {
                    evt.preventDefault();
                    setCurrentLocation(city);
                  }}
                >
                  <span>{city.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <CardList currentLocation={currentLocation} currentOffers={currentOffers} isEmpty={isEmpty} />
      </div>
    </main>
  );
}

export default MainScreen;
