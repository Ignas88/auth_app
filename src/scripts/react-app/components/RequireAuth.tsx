import { type FC, PropsWithChildren } from 'react';
import {useLocation, Navigate} from 'react-router-dom';
import {useAppSelector} from '@app/store/hooks';

export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}