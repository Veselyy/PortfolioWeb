/**
 * Role-specific header copy is picked by a URL query parameter, e.g. `?role=backend`
 * (see useHeaderRoleFromQuery.ts). The valid roles are the keys of `HEADER_CONTENT`.
 */
export const HEADER_ROLE_QUERY_PARAM = 'role';

/** Used when the parameter is missing or names an unknown role. */
export const DEFAULT_HEADER_ROLE = 'frontend';
