import { gsap } from 'gsap';

export function crossfadeBackground(
  fromEl: HTMLElement | null,
  toEl: HTMLElement | null
) {
  if (toEl) {
    gsap.fromTo(
      toEl,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.inOut' }
    );
  }
  if (fromEl && fromEl !== toEl) {
    gsap.to(fromEl, { opacity: 0, duration: 0.6, ease: 'power2.inOut' });
  }
}
