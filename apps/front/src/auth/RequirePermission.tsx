import { usePermission } from '@transcendence/auth';
import type { Permissions } from '@transcendence/permissions';
import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';

interface RequirePermissionProps {
  permission: Permissions | Permissions[];
}

export function RequirePermission({ permission }: RequirePermissionProps): JSX.Element {
  if (!usePermission(permission)) return <></>;
  return <Outlet />;
}