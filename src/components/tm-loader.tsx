"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import React from "react";
import { cn } from "~/lib/utils";
import TMLogo from "./tm-logo";

type TMLoaderProps = {
  gTL: GSAPTimeline | null;
};
const TMLoader: React.FC<TMLoaderProps> = ({ gTL }) => {
  const scope = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!scope.current || !gTL) return;

      const tl = gsap.timeline({
        id: "Loader TL",
      });

      const fPath = scope.current.querySelector("[data-first-part]");
      const sPath = scope.current.querySelector("[data-second-part]");
      const tPath = scope.current.querySelector("[data-third-part]");
      const boxContainer = scope.current.querySelector("[data-box-container]");

      const boxes: HTMLDivElement[] = [];

      function gBox() {
        const boxSize = parseInt(
          getComputedStyle(boxContainer!).getPropertyValue("--box-size"),
        );

        const nRows = Math.ceil(window.innerHeight / boxSize);
        const nCols = Math.ceil(window.innerWidth / boxSize);
        const nBox = nRows * nCols;

        for (let i = 0; i < nBox; i++) {
          const box = document.createElement("div");
          box.classList.add("box");
          boxContainer?.appendChild(box);
          boxes.push(box);
        }
      }

      /**
       * ---------------------------------------------------
       * Improve performance
       * ---------------------------------------------------
       */
      gBox();
      window.addEventListener("resize", () => {
        gBox();
      });

      gsap.set([fPath, sPath, tPath], {
        drawSVG: "0%",
      });

      tl.to([fPath, sPath, tPath], {
        drawSVG: "100%",
        duration: 0.95,
        ease: "sine.inOut",
        stagger: (i) => (i % 2 === 0 ? 0.75 : 0),
      })
        .to(
          [fPath, sPath, tPath],
          {
            fillOpacity: 1,
            fill: "#16a34a",
            ease: "power1.in",
          },
          "-=0.25",
        )
        .to(
          boxes,
          {
            backgroundColor: (i) => (i % 2 === 0 ? "#16a34a" : "#14532d"),
            delay: 0.75,
            duration: 0.0025,
            ease: "power4.out",
            stagger: {
              each: 0.0025,
              from: "random",
            },
            onStart: () => {
              gsap.to([fPath, sPath, tPath], {
                fill: "#032e15",
                stroke: "#032e15",
                ease: "sine.inOut",
              });
            },
          },
          "-=0.25",
        )
        .to(
          boxes,
          {
            autoAlpha: 0,
            duration: 0.95,
            delay: 0.25,
            stagger: 0.0025,
            ease: "power1.in",
            clipPath: (i) =>
              i % 2 === 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
            onStart: () => {
              gsap.to([fPath, sPath, tPath], {
                fill: "#16a34a",
                stroke: "#16a34a",
                ease: "sine.inOut",
              });
            },
          },
          "+=0.5",
        )
        .to(
          ["[data-clip-path]"],
          {
            clipPath: "inset(0% 0% 100% 0%)",
            ease: "power1.out",
            stagger: 0.25,
          },
          "-=0.25",
        );

      gTL.add(["loader", tl], 0);
    },

    { scope, dependencies: [gTL] },
  );

  return (
    <section
      data-loader
      ref={scope}
      className={cn(
        "h-dvh w-full z-50 fixed top-0 left-0",
        "flex items-center justify-center perspective-normal",
      )}>
      <TMLogo data-tm-loader className="tm__loader" />
      <div
        data-box-container
        className={cn(
          "[--box-size:25px] md:[--box-size:50px] lg:[--box-size:100px]",
          "[&_.box]:w-(--box-size) [&_.box]:h-(--box-size) [&_.box]:grow",
          "w-full h-full relative flex flex-wrap z-10",
        )}
      />
      {Array.from({ length: 3 }).map((_, key) => (
        <div
          key={key}
          data-clip-path={key}
          style={{
            zIndex: -key,
          }}
          className={cn(
            "w-full h-full absolute top-1/2 left-1/2 -translate-1/2 -z-10",
            key % 2 === 0 ? "bg-green-950" : "bg-green-900",
          )}
        />
      ))}
    </section>
  );
};
export default TMLoader;
