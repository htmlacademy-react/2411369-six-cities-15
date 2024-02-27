import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, CITIES } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { PrivateRoute, PublicRoute } from '../private-route/private-route';
import { Review } from '../../types/review';
import { ListOffers } from '../../types/offer';

type AppScreenProps = {
  offersCount: number;
  offers: ListOffers[];
  reviews: Review[];
}

function App({offersCount, offers, reviews}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Navigate to={`/${CITIES[0].slug}`} />}
        />
        {CITIES.map((city) => (
          <Route
            key={city.name}
            path={`/${city.slug}`}
            element={<MainScreen offersCount={offersCount} offers={offers} />}
          />
        ))};
        <Route
          path={AppRoute.Login}
          element={
            <PublicRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <LoginScreen />
            </PublicRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              // Верни NoAuth
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen offers={offers} reviews={reviews} />}
        />
        <Route
          path="*"
          element={<Navigate to={AppRoute.NotFound} />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
