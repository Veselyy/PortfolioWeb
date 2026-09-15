import { useState } from 'react';

import { DEFAULT_HEADER_ROLE, HEADER_ROLE_QUERY_PARAM } from '../constants/headerRole';
import { HEADER_CONTENT } from '../data/headerContent';

export type HeaderRole = keyof typeof HEADER_CONTENT.cs;

function getRoleFromQuery(defaultRole: HeaderRole): HeaderRole {
  if (typeof window === 'undefined') return defaultRole;

  const queryParams = new URLSearchParams(window.location.search);
  const roleParam = queryParams.get(HEADER_ROLE_QUERY_PARAM);

  if (roleParam && Object.prototype.hasOwnProperty.call(HEADER_CONTENT.cs, roleParam)) {
    return roleParam as HeaderRole;
  }

  return defaultRole;
}

export function useHeaderRoleFromQuery(defaultRole: HeaderRole = DEFAULT_HEADER_ROLE): HeaderRole {
  const [role] = useState<HeaderRole>(() => getRoleFromQuery(defaultRole));

  return role;
}
