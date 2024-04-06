import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { AppRoute, CITIES } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { PrivateRoute, PublicRoute } from '../access-route/access-route';
import { getToken } from '../../services/token';
import { useEffect } from 'react';
import { useActionCreators } from '../../hooks/store';
import { userActions } from '../../store/slice/user';

function App(): JSX.Element {
  const token = getToken();
  const { checkAuthorization, setUnauthorized } = useActionCreators(userActions);

  useEffect(() => {
    if (token) {
      checkAuthorization();
    } else {
      setUnauthorized();
    }
  }, [token, checkAuthorization, setUnauthorized]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index path={AppRoute.Main} element={<Navigate to={`/${CITIES[0].id}`} />} />
        {CITIES.map((city) => (
          <Route path={`/${city.id}`} index element={<MainScreen city={city.name} />} key={city.id} />
        ))}
        <Route
          path={AppRoute.Login}
          element={
            <PublicRoute>
              <LoginScreen />
            </PublicRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferScreen />} />
        <Route path="*" element={<Navigate to={AppRoute.NotFound} />} />
        <Route path={AppRoute.NotFound} element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
