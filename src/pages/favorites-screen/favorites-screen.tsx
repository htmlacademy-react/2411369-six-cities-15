import { Link } from 'react-router-dom';
import FooterComponent from '../../components/footer-component/footer-component';
import HeaderComponent from '../../components/header-component/header-component';
import CardComponent from '../../components/card-component/card-component';
import { useDocumentTitle } from '../../hooks/document-title';
import { getMockOffer } from '../../mocks/offers';

function FavoritesScreen(): JSX.Element {
  useDocumentTitle('Favorites');

  return (
    <div className="page">
      <HeaderComponent />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to="#">
                      <span>Amsterdam</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  {/* Временное решение */}
                  {Array.from({ length: 2 }, getMockOffer).map((item) => (
                    <CardComponent key={item.id} environment="favorites" {...item} />
                  ))}
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to="#">
                      <span>Cologne</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  {/* Временное решение */}
                  {Array.from({ length: 2 }, getMockOffer).map((item) => (
                    <CardComponent key={item.id} environment="favorites" {...item} />
                  ))}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <FooterComponent />
      </footer>
    </div>
  );
}

export default FavoritesScreen;
