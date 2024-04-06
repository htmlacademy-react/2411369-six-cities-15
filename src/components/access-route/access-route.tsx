import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { userSelectors } from '../../store/slice/user';
// import LoginScreen from '../../pages/login-screen/login-screen';
import Loading from '../loading/loading';

type AccessRouteProps = {
  children: JSX.Element;
};

const createAccessRoute = (status: AuthorizationStatus, fallback: AppRoute) =>
  function AccesRoute({ children }: AccessRouteProps) {
    const authorizationStatus = useAppSelector(
      userSelectors.authorizationStatus
    );

    if (authorizationStatus === AuthorizationStatus.Unknown) {
      return <Loading />;
    }

    return authorizationStatus === status ? (
      children
    ) : (
      <Navigate to={fallback} />
    );
  };

const PrivateRoute = createAccessRoute(
  AuthorizationStatus.Auth,
  AppRoute.Login
);
const PublicRoute = createAccessRoute(
  AuthorizationStatus.NoAuth,
  AppRoute.Main
);

export { PrivateRoute, PublicRoute };
