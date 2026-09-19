import { usePermissions } from '@transcendence/auth';
import type { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import type { Permissions } from '@transcendence/permissions';

export function RequirePermission({
  permission,
}: {
  permission: Permissions | Permissions[];
}): JSX.Element {
  const granted = usePermissions(permission);
  if (!granted) return <Navigate to={'/home'} replace />;
  return <Outlet />;
}
