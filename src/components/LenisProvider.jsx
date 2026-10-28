import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * LenisProvider — initialises Lenis smooth-scrolling once across the whole
 * customer-facing shell. Admin views take over a fixed overlay so Lenis
 * is intentionally paused/destroyed while admin is active.
 *
 * Rules:
 *  - Single instance, never recreated on re-renders.
 *  - Respects prefers-reduced-motion.
 *  - RAF loop is cleaned up on unmount.
 *  - Skips independently-scrollable containers (overflow:auto/scroll children)
 *    — Lenis does this automatically via its `prevent` option hook.
 */
export const LenisProvider = ({ children, isAdmin }) => {
  const lenisRef = useRef(null);
  const rafRef   = useRef(null);

  useEffect(() => {
    // Respect reduced-motion preference
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isAdmin || prefersReducedMotion) {
      // Destroy any existing instance when switching to admin
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    // Create Lenis instance
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      // Prevent Lenis from capturing scroll inside independently scrollable containers
      prevent: (node) => {
        if (!node) return false;
        const tag = node.tagName;
        // Always let modals/drawers/admin panels scroll natively
        return (
          node.closest?.('[data-lenis-prevent]') != null ||
          node.classList?.contains('admin-content-scroll') ||
          node.classList?.contains('cart-drawer') ||
          node.classList?.contains('modal-body') ||
          node.classList?.contains('modal-card') ||
          node.classList?.contains('modal-overlay') ||
          tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT'
        );
      },
    });

    lenisRef.current = lenis;

    // RAF loop
    const raf = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isAdmin]); // re-run only when admin mode toggles

  return children;
};
