import { useCallback } from 'react';
import { animateScroll } from 'react-scroll';

export function useSmoothScrollTo() {
  return useCallback((element: HTMLElement, duration = 500) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.scrollIntoView({ block: 'start' });
      return;
    }

    const targetY = window.scrollY + element.getBoundingClientRect().top;
    const html = document.documentElement;

    // The global `scroll-behavior: smooth` (index.css) applies even to scripted scrollTop
    // updates, which would otherwise re-smooth every step of react-scroll's own easing and
    // make it stall/jump. Suspend it for the duration of this animation, then restore it.
    const previousScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    animateScroll.scrollTo(targetY, {
      duration,
      smooth: 'easeInOutQuad',
      container: html,
    });

    window.setTimeout(() => {
      html.style.scrollBehavior = previousScrollBehavior;
    }, duration + 50);
  }, []);
}
