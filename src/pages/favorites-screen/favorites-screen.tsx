import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
// import Card from '../../components/card/card';
import { useDocumentTitle } from '../../hooks/document-title';
import { Fragment } from 'react';

function FavoritesScreen(): JSX.Element {
  useDocumentTitle('Favorites');

  return (
    <Fragment>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    {/* Удалить */}
                    <Link className="locations__item-link" to="#">
                      <span>Amsterdam</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  {/* Временное решение */}
                  {/* {Array.from({ length: 2 }, getMockOffer).map((item) => (
                    <Card key={item.id} environment="favorites" {...item} />
                  ))} */}
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
                  {/* {Array.from({ length: 2 }, getMockOffer).map((item) => (
                    <Card key={item.id} environment="favorites" {...item} />
                  ))} */}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}

export default FavoritesScreen;
