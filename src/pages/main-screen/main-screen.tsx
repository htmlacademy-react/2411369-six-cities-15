import CardContainerComponent from '../../components/card-container-component/card-container-component';
import LocationsComponent from '../../components/locations-component/locations-component';
import { useDocumentTitle } from '../../hooks/document-title';
import { ListOffers } from '../../types/offer';

type MainScreenProps = {
  offersCount: number;
  offers: ListOffers[];
}

function MainScreen({offersCount, offers}: MainScreenProps): JSX.Element {
  useDocumentTitle('Main page');

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <LocationsComponent />
        </section>
      </div>
      <div className="cities">
        <CardContainerComponent offersCount={offersCount} offers={offers} />
      </div>
    </main>
  );
}

export default MainScreen;
