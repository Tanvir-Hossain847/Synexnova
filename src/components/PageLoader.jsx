"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip the very first render — page is already loaded
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 600);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white">
      <DotLottieReact
        src="/Loading Lottie animation.lottie"
        loop
        autoplay
        style={{ width: 120, height: 120 }}
      />
      <p className="mt-2 text-sm text-gray-400 anta tracking-wide">Loading...</p>
    </div>
  );
}
