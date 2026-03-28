"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loader({ size = 80, text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16">
      <DotLottieReact
        src="/Loading Lottie animation.lottie"
        loop
        autoplay
        style={{ width: size, height: size }}
      />
      {text && <p className="text-sm text-gray-400 anta">{text}</p>}
    </div>
  );
}
