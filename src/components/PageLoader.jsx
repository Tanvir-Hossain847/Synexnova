"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Show loader on every route change
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white transition-opacity duration-300">
      <DotLottieReact
        src="/Loading Lottie animation.lottie"
        loop
        autoplay
        style={{ width: 120, height: 120 }}
      />
    </div>
  );
}
