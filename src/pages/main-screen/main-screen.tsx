import CardList from '../../components/card-list/card-list';
import { CITIES, CityName, RequestStatus } from '../../const';
import { useDocumentTitle } from '../../hooks/document-title';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useActionCreators, useAppSelector } from '../../hooks/store';
import { offersActions, offersSelectors } from '../../store/slice/offers';
import { useEffect } from 'react';
import Header from '../../components/header/header';

type MainScreenProps = {
  city: CityName;
};

function MainScreen({ city }: MainScreenProps): JSX.Element {
  useDocumentTitle(`Offers in ${city}`);

  const offers = useAppSelector(offersSelectors.offers);
  const offersByCity = Object.groupBy(offers, (offer) => offer.city.name);
  const currentOffers = offersByCity[city] ?? [];
  const hasOffers = Boolean(currentOffers.length);
  const status = useAppSelector(offersSelectors.status);

  const { fetchAllOffers } = useActionCreators(offersActions);

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      fetchAllOffers();
    }
  }, [status, fetchAllOffers]);

  return (
    <div className='page page--gray page--main'>
      <Header />
      <main
        className={classNames('page__main', 'page__main--index', {
          'page__main--index-empty': !hasOffers,
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
            hasOffers={hasOffers}
          />
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
