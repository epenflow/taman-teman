"use client";
import { useGSAP } from "@gsap/react";
import gsap, { DrawSVGPlugin, Flip, GSDevTools, SplitText } from "gsap/all";
import React from "react";

const RegisterGSAP = () => {
  React.useLayoutEffect(() => {
    gsap.registerPlugin(useGSAP, GSDevTools, DrawSVGPlugin, Flip, SplitText);

    // GSDevTools.create();
  });

  return null;
};
export default RegisterGSAP;
