import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { PrivateRoute, PublicRoute } from '../private-route/private-route';
import { Offers } from '../../types/offer';
import Header from '../header/header';

type AppScreenProps = {
  offers: Offers[];
}

function App({offers}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={
          <Header />
        }
        >
          <Route
            index
            path={AppRoute.Main}
            element={<MainScreen offers={offers} />}
          />
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
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferScreen offers={offers} />}
          />
          <Route
            path="*"
            element={<Navigate to={AppRoute.NotFound} />}
          />
          <Route
            path={AppRoute.NotFound}
            element={<NotFoundScreen />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
