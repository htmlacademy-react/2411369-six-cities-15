import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, CITIES } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { PrivateRoute, PublicRoute } from '../private-route/private-route';

type AppScreenProps = {
  offersCount: number;
}

function App({offersCount}: AppScreenProps): JSX.Element {
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
            element={<MainScreen offersCount={offersCount} />}
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
          element={<OfferScreen />}
        />
        <Route
          path="*"
          element={<Navigate to='/404' />}
        />
        <Route
          path='/404'
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
