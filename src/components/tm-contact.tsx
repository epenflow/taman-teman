"use client";
import { useGSAP } from "@gsap/react";
import gsap, { SplitText } from "gsap/all";
import Link from "next/link";
import React from "react";
import { cn } from "~/lib/utils";

type TMContactProps = {
  gTL: GSAPTimeline | null;
};
const TMContact: React.FC<TMContactProps> = ({ gTL }) => {
  const scope = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!scope.current || !gTL) return;

      const tl = gsap.timeline({
        id: "Contact TL",
        defaults: {
          ease: "none",
        },
      });

      const tmHeading = SplitText.create("[data-tm-heading]", {
        type: "chars, words",
      });
      const texts = SplitText.create("[data-texts]", {
        type: "lines",
      });

      gsap.set(tmHeading.words, {
        xPercent: 100,
      });
      gsap.set(tmHeading.chars, {
        autoAlpha: 0,
        y: "random(-100,100)",
        rotate: "random(-45,45)",
      });

      texts.lines.forEach((e) => {
        const pTag = document.createElement("div");
        pTag.textContent = e.textContent;
        pTag.classList.add("text__lines");
        e.classList.add("overflow-clip");
        e.textContent = "";
        e.appendChild(pTag);

        gsap.set(pTag, {
          yPercent: 100,
          display: "block",
          position: "relative",
        });
      });

      tl.to("[data-tm-bg]", {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power1.in",
        duration: 0.5,
      })
        .to(tmHeading.words, {
          xPercent: 0,
          duration: 0.5,
          ease: "power4.out",
        })
        .to(
          tmHeading.chars,
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.25,
            ease: "power4.in",
            rotate: 0,
          },
          "<",
        )
        .to(".text__lines", {
          yPercent: 0,
          stagger: 0.25,
          ease: "power2.in",
        });

      gTL.add(["contact", tl], "+=0.25");
    },
    { scope, dependencies: [gTL] },
  );

  return (
    <section
      data-contact
      ref={scope}
      className={cn("container max-w-md p-8 min-h-dvh flex")}>
      <div className="border p-4 my-auto">
        <div className="border">
          <div className="text-green-900 p-4 space-y-4 overflow-clip relative">
            <div
              data-tm-hero
              className="flex items-center justify-center relative z-10">
              <svg viewBox="0 0 1079.99 967.43" className="w-full h-full" />
            </div>
            <h1
              data-tm-heading
              className="text-center font-anton font-black text-5xl z-10 relative overflow-clip">
              TAMAN TEMAN
            </h1>
            <div
              data-tm-bg
              className={cn(
                "[clip-path:inset(100%_0%_0%_0%)]",
                "absolute top-0 left-0 w-full h-full bg-background",
              )}
            />
          </div>
          <div className="p-4 border-b flex flex-col space-y-4">
            <p
              data-texts
              className="text-xs text-pretty font-medium text-primary-foreground/80">
              Step into a world where every leaf tells a story, every bloom
              whispers a secret. At Taman Teman, we believe a home isn&lsquo;t
              truly alive until it breathes with green. We&lsquo;re not just
              selling plants; we&lsquo;re cultivating joy, one pot at a time.
              Come, find the green soulmate that&lsquo;s waiting to begin its
              story with you. 🌱
            </p>
          </div>
          <div className="text-xs font-medium p-4 flex flex-col gap-2 text-primary-foreground/80 ">
            {resources.contacts.map((contact, key) => (
              <Link data-texts key={key} href={contact.href}>
                {contact.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default TMContact;

const resources = {
  contacts: [
    {
      href: "https://maps.app.goo.gl/9RsnXCwYBUoXyMty6",
      label:
        "Location Jl. Tirta Alas Arum No.10, Bebalang, Kec. Bangli, Kabupaten Bangli, Bali 80614",
    },
    {
      href: "https://api.whatsapp.com/send/?phone=%2B6285739422424&text&type=phone_number&app_absent=0",
      label: "CP 1 (+62) 857 3942 2424",
    },
    {
      href: "https://api.whatsapp.com/send/?phone=%2B6281337006364&text&type=phone_number&app_absent=0",
      label: "CP 2 (+62) 813 3700 6364",
    },
  ] satisfies { href: string; label: string }[],
};
