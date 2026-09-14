import type { TranslationKey } from '@transcendence/i18n';
import { type Permissions as PermissionsType, Permissions } from '@transcendence/permissions';
import type { ReactNode } from 'react';
import { Users } from './Users';

export interface AdminTab {
  labelKey: TranslationKey;
  key: string;
  children: ReactNode;
  permission: PermissionsType[];
}

export const ADMIN_TABS: AdminTab[] = [
  {
    children: <Users />,
    key: 'users',
    labelKey: 'admin.dashboard.users',
    permission: [Permissions.USER_READ, Permissions.USER_WRITE, Permissions.USER_DELETE],
  },
];
