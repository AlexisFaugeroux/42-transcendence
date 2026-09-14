import { usePermissions } from '@transcendence/auth';
import type { Permissions } from '@transcendence/permissions';
import type { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function RequirePermission(permission: Permissions | Permissions[]): JSX.Element {
  const granted = usePermissions(permission);
  if (!granted) return <Navigate to={'/home'} replace />;
  return <Outlet />;
}
