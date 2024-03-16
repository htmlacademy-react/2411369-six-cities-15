import CardList from '../../components/card-list/card-list';
import { AppRoute, CITIES } from '../../const';
import { useDocumentTitle } from '../../hooks/document-title';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { offersActions, offersSelectors } from '../../store/slice/offers';

function MainScreen(): JSX.Element {
  useDocumentTitle('Main page');

  const offers = useAppSelector(offersSelectors.offers);
  const currentCity = useAppSelector(offersSelectors.city);
  const currentOffers = offers.filter((offer) => offer.city.name === currentCity);

  const dispatch = useAppDispatch();

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
            {CITIES.map((city) => (
              <li className="locations__item" key={city.name}>
                <Link
                  className={classNames('locations__item-link', 'tabs__item', {
                    'tabs__item--active': city.name === currentCity,
                  })}
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(offersActions.setCity(city.name));
                  }}
                  to={AppRoute.Main}
                >
                  <span>{city.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <CardList
          currentCity={currentCity}
          currentOffers={currentOffers}
          isEmpty={isEmpty}
        />
      </div>
    </main>
  );
}

export default MainScreen;
