"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import { slideLeft, slideRight } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";

const ACCENT = "var(--color-accent)";
// SIZE is now dynamic — read from container at runtime

// City data — used only for HTML label projection, NOT passed to cobe
const cities = [
  { location: [37.78,  -122.44], size: 0.04, label: "San Francisco", region: "North America" },
  { location: [40.71,   -74.01], size: 0.04, label: "New York",      region: "North America" },
  { location: [51.51,    -0.13], size: 0.05, label: "London",        region: "Europe" },
  { location: [48.86,     2.35], size: 0.04, label: "Paris",         region: "Europe" },
  { location: [25.20,    55.27], size: 0.05, label: "Dubai",         region: "Middle East" },
  { location: [28.61,    77.21], size: 0.04, label: "New Delhi",     region: "South Asia" },
  { location: [23.81,    90.41], size: 0.03, label: "Dhaka",         region: "South Asia" },
  { location: [ 1.35,   103.82], size: 0.04, label: "Singapore",     region: "Southeast Asia" },
  { location: [ 3.14,   101.69], size: 0.03, label: "Kuala Lumpur",  region: "Southeast Asia" },
  { location: [-23.55,  -46.63], size: 0.04, label: "São Paulo",     region: "Latin America" },
  { location: [19.43,   -99.13], size: 0.04, label: "Mexico City",   region: "Latin America" },
  { location: [35.68,   139.65], size: 0.04, label: "Tokyo",         region: "East Asia" },
];

const regions = [
  "North America", "Europe", "Middle East",
  "South Asia", "Southeast Asia", "Latin America",
];

function project(lat, lng, phi, theta, size) {
  const latR = (lat * Math.PI) / 180;
  const lngR = (lng * Math.PI) / 180;
  const x0 = Math.cos(latR) * Math.sin(lngR);
  const y0 = Math.sin(latR);
  const z0 = Math.cos(latR) * Math.cos(lngR);
  const y1 = y0 * Math.cos(theta) - z0 * Math.sin(theta);
  const z1 = y0 * Math.sin(theta) + z0 * Math.cos(theta);
  const x2 = x0 * Math.cos(phi) + z1 * Math.sin(phi);
  const z2 = -x0 * Math.sin(phi) + z1 * Math.cos(phi);
  return {
    x: size / 2 + (x2 * size) / 2.05,
    y: size / 2 - (y1 * size) / 2.05,
    visible: z2 > 0.05,
    depth: z2,
  };
}

function GlobeCanvas() {
  const wrapRef    = useRef(null);   // outer div — drives size
  const canvasRef  = useRef(null);
  const overlayRef = useRef(null);
  const phiRef     = useRef(0);
  const thetaRef   = useRef(0.3);
  const isDragging = useRef(false);
  const lastX      = useRef(0);
  const lastY      = useRef(0);
  const velX       = useRef(0);
  const velY       = useRef(0);
  const sizeRef    = useRef(320);    // current pixel size

  useEffect(() => {
    if (!wrapRef.current || !canvasRef.current) return;
    let globe, rafId;
    let visible = false;
    const dpr = Math.min(window.devicePixelRatio, 2);

    // Read accent from CSS var at runtime
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim();
    const tmp = document.createElement("div");
    tmp.style.color = raw;
    document.body.appendChild(tmp);
    const computed = getComputedStyle(tmp).color;
    document.body.removeChild(tmp);
    const [cr, cg, cb] = (computed.match(/\d+/g) || ["89","131","157"]).map(Number);
    const accentRGB = [cr / 255, cg / 255, cb / 255];

    // Init size from container
    sizeRef.current = wrapRef.current.clientWidth || 320;

    const s = sizeRef.current;

    globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width:  s * dpr,
      height: s * dpr,
      phi: 0, theta: 0.3,
      dark: 0, diffuse: 1.1,
      mapSamples: 30000, mapBrightness: 5,
      baseColor: [0.97, 0.97, 0.97],
      markerColor: accentRGB,
      glowColor:   accentRGB,
      markers: cities.map(({ location, size }) => ({ location, size })),
    });

    // Resize globe when container changes
    const resizeObserver = new ResizeObserver(() => {
      const newSize = wrapRef.current?.clientWidth || sizeRef.current;
      if (newSize !== sizeRef.current && globe) {
        sizeRef.current = newSize;
        globe.update({ width: newSize * dpr, height: newSize * dpr });
        if (canvasRef.current) {
          canvasRef.current.style.width  = `${newSize}px`;
          canvasRef.current.style.height = `${newSize}px`;
        }
      }
    });
    resizeObserver.observe(wrapRef.current);

    function updateLabels() {
      if (!overlayRef.current) return;
      const sz = sizeRef.current;
      overlayRef.current.querySelectorAll("[data-city]").forEach((el, i) => {
        const c = cities[i];
        const { x, y, visible: vis, depth } = project(
          c.location[0], c.location[1], phiRef.current, thetaRef.current, sz
        );
        el.style.left    = `${x}px`;
        el.style.top     = `${y}px`;
        el.style.opacity = vis ? Math.min(1, (depth - 0.05) * 8).toString() : "0";
        el.style.pointerEvents = vis ? "auto" : "none";
      });
    }

    function animate() {
      if (!visible || !globe) return;
      if (isDragging.current) {
        phiRef.current  += velX.current;
        thetaRef.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, thetaRef.current + velY.current));
      } else {
        velX.current *= 0.88;
        velY.current *= 0.88;
        phiRef.current  += velX.current;
        thetaRef.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, thetaRef.current + velY.current));
        if (Math.abs(velX.current) < 0.0001) phiRef.current += 0.004;
      }
      globe.update({ phi: phiRef.current, theta: thetaRef.current });
      // Throttle DOM label updates to every 3rd frame to reduce layout thrashing
      if (!animate._frame) animate._frame = 0;
      animate._frame++;
      if (animate._frame % 3 === 0) updateLabels();
      rafId = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) animate();
    });
    observer.observe(canvasRef.current);
    // Don't call animate() here — let IntersectionObserver start it

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
      resizeObserver.disconnect();
      try {
        if (globe) {
          const canvas = canvasRef.current;
          if (canvas && canvas.parentNode) {
            const ph = document.createElement("canvas");
            canvas.parentNode.replaceChild(ph, canvas);
            globe.destroy();
            ph.parentNode && ph.parentNode.replaceChild(canvas, ph);
          } else {
            globe.destroy();
          }
        }
      } catch (_) {}
    };
  }, []);

  const onPointerDown = (e) => {
    isDragging.current = true;
    lastX.current = e.clientX; lastY.current = e.clientY;
    velX.current = velY.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    velX.current = (e.clientX - lastX.current) * 0.004;
    velY.current = (e.clientY - lastY.current) * 0.003;
    lastX.current = e.clientX; lastY.current = e.clientY;
  };
  const onPointerUp = () => { isDragging.current = false; };

  return (
    <div
      ref={wrapRef}
      className="relative select-none w-full aspect-square"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", cursor: "grab", display: "block" }}
      />

      {/* City name label overlay */}
      <div ref={overlayRef} className="absolute inset-0 pointer-events-none">
        {cities.map((c, i) => (
          <div
            key={i}
            data-city={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ top: 0, left: 0, transition: "opacity 0.15s" }}
          >
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap block"
              style={{
                backgroundColor: "rgba(255,255,255,0.88)",
                color: "#111",
                border: "1px solid color-mix(in srgb, var(--color-accent) 35%, transparent)",
                boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
                backdropFilter: "blur(4px)",
              }}
            >
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GlobePresence() {
  return (
    <section className="bg-white pt-10 pb-16 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div
            variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <div>
              <span className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">
                Global Presence
              </span>
              <h2 className="mt-3 odibee text-4xl md:text-6xl text-black">
                Serving startups<br />
                <span className="text-accent odibee">across 6 regions.</span>
              </h2>
              <p className="mt-4 text-base anta text-gray-400 font-light leading-relaxed max-w-md">
                Our solutions are localized, compliant, and optimized for the
                markets you're entering — not just the one you're in. From San
                Francisco to Singapore, we're already there.
              </p>
            </div>

            <div className="space-y-2">
              {regions.map((r) => (
                <div
                  key={r}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50
                    hover:border-accent/30 hover:bg-white transition-all duration-200 group cursor-default"
                >
                  <MapPin size={13} className="text-gray-400 group-hover:text-accent transition-colors" />
                  <span className="text-sm font-medium text-gray-700 anta">{r}</span>
                </div>
              ))}
            </div>

            <Button
              className="rounded-full px-7 font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: ACCENT }}
            >
              Explore Global Plans <ArrowRight size={14} className="ml-2" />
            </Button>
          </motion.div>

          {/* Right — globe */}
          <motion.div
            variants={slideRight} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[560px] mx-auto">
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 12%, transparent) 0%, transparent 70%)",
                }}
              />
              <GlobeCanvas />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
