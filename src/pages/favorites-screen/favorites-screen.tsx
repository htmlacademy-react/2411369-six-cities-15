import Footer from '../../components/footer/footer';
import { useDocumentTitle } from '../../hooks/document-title';
import { Fragment } from 'react';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { useAppSelector } from '../../hooks/store';
import { favoritesSelector } from '../../store/slice/favorites';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

function FavoritesScreen(): JSX.Element {
  useDocumentTitle('Favorites');

  const favorites = useAppSelector(favoritesSelector.favorites);
  const hasfavorites = Boolean(favorites.length);

  return (
    <Fragment>
      {!hasfavorites ? <FavoritesEmpty /> :
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList favorites={favorites} />
            </section>
          </div>
        </main>}
      <Footer />
    </Fragment>
  );
}

export default FavoritesScreen;
