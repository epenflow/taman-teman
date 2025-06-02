"use client";
import { useGSAP } from "@gsap/react";
import gsap, { Flip } from "gsap/all";
import React from "react";
import TMContact from "~/components/tm-contact";
import TMLoader from "~/components/tm-loader";

export default function Home() {
  const scope = React.useRef<HTMLElement>(null);
  const [gTL, setGTL] = React.useState<GSAPTimeline | null>(null);

  React.useLayoutEffect(() => {
    const tl = gsap.timeline({
      id: "Global TL",
      defaults: {
        ease: "none",
      },
    });

    setGTL(tl);
    return () => {
      tl.kill();
    };
  }, [setGTL]);

  useGSAP(
    () => {
      if (!scope.current || !gTL) return;
      const tl = gsap.timeline({
        id: "Local TL",
      });

      const tmLoader = scope.current.querySelector("[data-tm-loader]");
      const tmHero = scope.current.querySelector("[data-tm-hero]");
      const loader = scope.current.querySelector("[data-loader]");

      if (!tmLoader && !tmHero && !loader)
        console.warn("Flip animation with the element not found.");

      tl.call(() => {
        const tmState = Flip.getState(tmLoader);

        tmHero?.appendChild(tmLoader!);
        tmLoader?.classList.remove("tm__loader");
        tmLoader?.classList.add("tm__hero");

        Flip.from(tmState, {
          duration: 0.75,
          absolute: true,
          scale: true,
          onStart: () => {
            [
              "[data-first-part]",
              "[data-second-part]",
              "[data-third-part]",
            ].forEach((e) => {
              gsap.fromTo(
                e,
                {
                  stroke: "#ffffff",
                  fill: "#ffffff",
                  delay: 0.0025,
                  duration: 0.0025,
                  ease: "power2.out",
                },
                {
                  stroke: "#0d542b",
                  fill: "#0d542b",
                  delay: 0.025,
                  duration: 0.25,
                  ease: "power1.in",
                },
              );
            });
          },
          onComplete: () => {
            loader?.remove();
          },
        });
      });

      gTL.add(["flip", tl], "<");
    },
    { scope, dependencies: [gTL] },
  );

  return (
    <main ref={scope}>
      <TMLoader gTL={gTL} />
      <TMContact gTL={gTL} />
    </main>
  );
}
