import CardComponent from '../../components/card-component/card-component';
import HeaderComponent from '../../components/header-component/header-component';
import LocationsComponent from '../../components/locations-component/locations-component';
import SortComponent from '../../components/sort-component/sort-component';
import { useDocumentTitle } from '../../hooks/document-title';
import { OFFERS } from '../../mocks/offers';

type MainScreenProps = {
  offersCount: number;
}

function MainScreen({offersCount}: MainScreenProps): JSX.Element {
  useDocumentTitle('Main page');

  return (
    <div className="page page--gray page--main">
      <HeaderComponent />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsComponent />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in Amsterdam</b>
              <SortComponent />
              <div className="cities__places-list places__list tabs__content">
                {OFFERS.map((item) => (
                  <CardComponent key={item.id} environment="cities" {...item} />
                ))}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
