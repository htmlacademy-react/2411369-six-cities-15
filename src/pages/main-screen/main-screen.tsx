import CardList from '../../components/card-list/card-list';
import Locations from '../../components/locations/locations';
import { useDocumentTitle } from '../../hooks/document-title';
import { Offers } from '../../types/offer';

type MainScreenProps = {
  offersCount: number;
  offers: Offers[];
}

function MainScreen({offersCount, offers}: MainScreenProps): JSX.Element {
  useDocumentTitle('Main page');

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <Locations />
        </section>
      </div>
      <div className="cities">
        <CardList offersCount={offersCount} offers={offers} />
      </div>
    </main>
  );
}

export default MainScreen;
