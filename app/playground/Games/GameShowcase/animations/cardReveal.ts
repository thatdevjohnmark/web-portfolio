import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function animateCardsIn(container: HTMLElement) {
  const cards = container.querySelectorAll('.game-card');
  gsap.fromTo(
    cards,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.07,
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        once: true,
      },
    }
  );
}
