// Every duration, ease, offset and breakpoint for the hero lives here.
export const ANIM = {
  intro: {
    letters: { y: 30, stagger: 0.05, duration: 0.9, ease: "power3.out" },
    car: { y: -80, duration: 1.1, ease: "expo.out", overlap: "-=0.5" },
    stats: { y: 40, stagger: 0.15, duration: 0.8, ease: "power3.out", overlap: "-=0.6" },
  },
  scroll: { start: "top top", end: "+=300%", scrub: 1, headlineFadeEnd: 0.3 },
  statIdle: { opacity: 0.15, scale: 0.95 },
  statReveal: [0.2, 0.4, 0.6, 0.8], // timeline progress when the car reaches each stat
  statRevealDuration: 0.08,
  breakpoints: {
    desktop: "(min-width: 1024px)",
    tablet: "(min-width: 768px) and (max-width: 1023px)",
    mobile: "(max-width: 767px)",
  },
  // travel = fraction of viewport height the car moves down
  responsive: {
    desktop: { travel: 0.6, scale: 1.35, rotate: 4, sway: 12 },
    tablet: { travel: 0.5, scale: 1.25, rotate: 3, sway: 10 },
    mobile: { travel: 0.35, scale: 1.15, rotate: 2, sway: 6 },
  },
  lenis: { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) },
};

export const HEADLINE = "WELCOME ITZFIZZ";

export const STATS = [
  { value: "58%", label: "Increase in pick up point use", side: "left", top: "30%" },
  { value: "23%", label: "Decreased in customer phone calls", side: "right", top: "42%" },
  { value: "27%", label: "Increase in pick up point use", side: "left", top: "58%" },
  { value: "40%", label: "Decreased in customer phone calls", side: "right", top: "70%" },
] as const;
