import { useState } from 'react';

import { HEADER_CONTENT } from '../data/headerContent';

export type HeaderRole = keyof typeof HEADER_CONTENT.cs;

function getRoleFromQuery(defaultRole: HeaderRole): HeaderRole {
  if (typeof window === 'undefined') return defaultRole;

  const queryParams = new URLSearchParams(window.location.search);
  const roleParam = queryParams.get('role');

  if (roleParam && Object.prototype.hasOwnProperty.call(HEADER_CONTENT.cs, roleParam)) {
    return roleParam as HeaderRole;
  }

  return defaultRole;
}

export function useHeaderRoleFromQuery(defaultRole: HeaderRole = 'frontend'): HeaderRole {
  const [role] = useState<HeaderRole>(() => getRoleFromQuery(defaultRole));

  return role;
}
