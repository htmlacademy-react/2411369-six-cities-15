import { AuthorizationStatus } from '../const';
import { userSelectors } from '../store/slice/user';
import { useAppSelector } from './store';

export function useAuth() {
  const status = useAppSelector(userSelectors.authorizationStatus);

  return status === AuthorizationStatus.Auth;
}
