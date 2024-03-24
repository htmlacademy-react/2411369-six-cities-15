import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, CITIES } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { PrivateRoute, PublicRoute } from '../access-route/access-route';
import Header from '../header/header';
import { useAppSelector } from '../../hooks/store';
import { userSelectors } from '../../store/slice/user';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <LoginScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route index path={AppRoute.Main} element={<Navigate to={`/${CITIES[0].id}`} />} />
          {CITIES.map((city) => (
            <Route path={`/${city.id}`} index element={<MainScreen city={city.name} />} key={city.id} />
          ))}
          <Route
            path={AppRoute.Login}
            element={
              <PublicRoute authorizationStatus={authorizationStatus}>
                <LoginScreen />
              </PublicRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Offer} element={<OfferScreen />} />
          <Route path="*" element={<Navigate to={AppRoute.NotFound} />} />
          <Route path={AppRoute.NotFound} element={<NotFoundScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
