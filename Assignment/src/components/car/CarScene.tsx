import { useEffect, useRef, type CSSProperties } from "react";
import { ANIM, HEADLINE, STATS } from "./config";
import { CarVisual } from "./CarVisual";

export function CarScene() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const Lenis = (await import("lenis")).default;
      const hero = heroRef.current;
      if (cancelled || !hero) return;
      gsap.registerPlugin(ScrollTrigger);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const q = gsap.utils.selector(hero);

      if (reduced) {
        const ctx = gsap.context(() => {
          gsap.from(q("[data-fade]"), { opacity: 0, duration: 0.6 });
        }, hero);
        cleanup = () => ctx.revert();
        return;
      }

      const lenis = new Lenis(ANIM.lenis);
      const tick = (t: number) => lenis.raf(t * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      lenis.stop();
      document.documentElement.style.overflow = "hidden";
      const unlock = () => {
        document.documentElement.style.overflow = "";
        lenis.start();
      };

      const mm = gsap.matchMedia();
      const ctx = gsap.context(() => {
        const { intro } = ANIM;
        const letters = q("[data-letter]");
        const car = q("[data-car]");
        const stats = q("[data-stat]");

        gsap.timeline({ onComplete: unlock })
          .from(letters, { opacity: 0, y: intro.letters.y, stagger: intro.letters.stagger, duration: intro.letters.duration, ease: intro.letters.ease })
          .from(car, { opacity: 0, y: intro.car.y, duration: intro.car.duration, ease: intro.car.ease, force3D: true }, intro.car.overlap)
          .from(stats, { opacity: 0, y: intro.stats.y, stagger: intro.stats.stagger, duration: intro.stats.duration, ease: intro.stats.ease }, intro.stats.overlap)
          .to(stats, { ...ANIM.statIdle, duration: 0.4 });

        (Object.keys(ANIM.breakpoints) as (keyof typeof ANIM.breakpoints)[]).forEach((key) => {
          mm.add(ANIM.breakpoints[key], () => {
            const r = ANIM.responsive[key];
            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: hero,
                start: ANIM.scroll.start,
                end: ANIM.scroll.end,
                pin: true,
                scrub: ANIM.scroll.scrub,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });
            tl.to(car, { y: () => window.innerHeight * r.travel, duration: 1, force3D: true }, 0)
              .to(car, { scale: r.scale, duration: 1, ease: "power1.inOut" }, 0)
              .to(car, { rotation: r.rotate, duration: 0.5, ease: "sine.inOut" }, 0)
              .to(car, { rotation: 0, duration: 0.5, ease: "sine.inOut" }, 0.5)
              .to(car, { x: r.sway, duration: 0.25, ease: "sine.inOut" }, 0)
              .to(car, { x: -r.sway, duration: 0.5, ease: "sine.inOut" }, 0.25)
              .to(car, { x: 0, duration: 0.25, ease: "sine.inOut" }, 0.75)
              .to(q("[data-headline]"), { opacity: 0, y: -40, duration: ANIM.scroll.headlineFadeEnd }, 0);
            stats.forEach((el, i) => {
              tl.fromTo(el, ANIM.statIdle, { opacity: 1, scale: 1, duration: ANIM.statRevealDuration, ease: "power2.out", immediateRender: false }, ANIM.statReveal[i]);
            });
          });
        });
      }, hero);

      cleanup = () => {
        mm.revert();
        ctx.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
        document.documentElement.style.overflow = "";
      };
    })();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <>
      <section ref={heroRef} className="relative h-svh w-full overflow-hidden bg-hero-bg text-ink">
        <h1
          data-headline
          data-fade
          className="absolute inset-x-0 top-[8%] z-10 text-center text-[clamp(1.25rem,3.2vw,2.75rem)] font-bold uppercase tracking-[0.25em] md:tracking-[0.5em]"
        >
          {HEADLINE.split("").map((c, i) => (
            <span key={i} data-letter className="inline-block">
              {c === " " ? "\u00A0\u00A0" : c}
            </span>
          ))}
        </h1>

        <div className="absolute left-1/2 top-[16%] z-0 -translate-x-1/2">
          <div data-car data-fade className="will-change-transform">
            <CarVisual />
          </div>
        </div>

        {/* Mobile: 2-col grid under the headline. Desktop: staggered either side of the car path. */}
        <div className="absolute inset-x-4 top-[18%] z-10 grid grid-cols-2 gap-x-24 gap-y-6 md:contents">
          {STATS.map((s, i) => (
            <div
              key={i}
              data-stat
              data-fade
              style={{ "--stat-top": s.top } as CSSProperties}
              className={`md:absolute md:top-[var(--stat-top)] md:w-[26vw] ${
                s.side === "left" ? "md:left-[8vw] md:text-right" : "md:right-[8vw] md:text-left"
              }`}
            >
              <div className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none text-accent-red">{s.value}</div>
              <p className="mt-2 text-sm text-muted-ink">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex min-h-svh items-center bg-background px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-accent-red">About</h2>
          <p className="mt-6 text-3xl font-semibold leading-snug text-ink md:text-4xl">
            Itz Fizz makes pickups simple, fast, and stress-free. We help customers collect their orders with less waiting, while businesses get fewer support calls thanks to clear updates and easy steps, with up to 40% fewer calls. More people now choose pick up points, and that number keeps growing. Less friction. More momentum.
          </p>
        </div>
      </section>

      <section className="flex min-h-svh items-center bg-section-alt px-6 py-24 text-section-alt-foreground">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-accent-red">Contact</h2>
          <p className="mt-6 text-3xl font-semibold leading-snug md:text-4xl">Let's build something that moves.</p>
          <a href="mailto:hello@itzfizz.com" className="mt-8 inline-block border-b-2 border-accent-red pb-1 text-lg">
            hello@itzfizz.com
          </a>
        </div>
      </section>
    </>
  );
}
