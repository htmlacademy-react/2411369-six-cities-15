import CardList from '../../components/card-list/card-list';
import { CITIES, CityName } from '../../const';
import { useDocumentTitle } from '../../hooks/document-title';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/store';
import { offersSelectors } from '../../store/slice/offers';

type MainScreenProps = {
  city: CityName;
};

function MainScreen({ city }: MainScreenProps): JSX.Element {
  useDocumentTitle(`Offers in ${city}`);

  const offers = useAppSelector(offersSelectors.offers);

  const offersByCity = Object.groupBy(offers, (offer) => offer.city.name);
  const currentOffers = offersByCity[city] ?? [];

  const isEmpty = currentOffers.length === 0;

  return (
    <main
      className={classNames('page__main', 'page__main--index', {
        'page__main--index-empty': isEmpty,
      })}
    >
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {CITIES.map(({ id, name }) => (
              <li className="locations__item" key={id}>
                <NavLink
                  className={({ isActive }) =>
                    classNames('locations__item-link', 'tabs__item', {
                      'tabs__item--active': isActive,
                    })}
                  to={`/${id}`}
                >
                  <span>{name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <CardList
          currentCity={city}
          currentOffers={currentOffers}
          isEmpty={isEmpty}
        />
      </div>
    </main>
  );
}

export default MainScreen;
