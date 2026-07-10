import { useUser } from '@transcendence/auth';
import type { JSX } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function RequireAuth(): JSX.Element | null {
  const { loading, user } = useUser();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  return <Outlet />;
}
