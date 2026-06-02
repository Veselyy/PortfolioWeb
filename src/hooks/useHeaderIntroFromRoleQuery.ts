import { useEffect } from 'react';

import { HEADER_CONTENT } from '../data/headerContent';

type HeaderIntro = (typeof HEADER_CONTENT)[keyof typeof HEADER_CONTENT];

export function useHeaderIntroFromRoleQuery(setIntro: (intro: HeaderIntro) => void) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const queryParams = new URLSearchParams(window.location.search);
    const roleParam = queryParams.get('role');

    if (!roleParam) return;

    if (Object.prototype.hasOwnProperty.call(HEADER_CONTENT, roleParam)) {
      setIntro(HEADER_CONTENT[roleParam as keyof typeof HEADER_CONTENT]);
    }
  }, [setIntro]);
}
