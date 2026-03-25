"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import { slideLeft, slideRight } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";

const ACCENT = "var(--color-accent)";
const SIZE = 560;

const markers = [
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
  { location: [35.68,   139.65], size: 0.04, label: "Tokyo",         region: "East Asia", id: "tokyo" },
];

const regions = [
  "North America", "Europe", "Middle East",
  "South Asia", "Southeast Asia", "Latin America",
];

// Project a lat/lng to 2D canvas coords given current phi/theta
function project(lat, lng, phi, theta, size) {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  // 3D point on unit sphere
  const x0 = Math.cos(latRad) * Math.sin(lngRad);
  const y0 = Math.sin(latRad);
  const z0 = Math.cos(latRad) * Math.cos(lngRad);

  // Rotate by theta (tilt) around X axis
  const y1 = y0 * Math.cos(theta) - z0 * Math.sin(theta);
  const z1 = y0 * Math.sin(theta) + z0 * Math.cos(theta);

  // Rotate by phi (spin) around Y axis
  const x2 = x0 * Math.cos(phi) + z1 * Math.sin(phi);
  const z2 = -x0 * Math.sin(phi) + z1 * Math.cos(phi);

  // z2 > 0 means facing us
  const visible = z2 > 0.05;

  const cx = size / 2 + (x2 * size) / 2.05;
  const cy = size / 2 - (y1 * size) / 2.05;

  return { x: cx, y: cy, visible, depth: z2 };
}

function GlobeCanvas() {
  const canvasRef  = useRef(null);
  const overlayRef = useRef(null);
  const phiRef     = useRef(0);
  const thetaRef   = useRef(0.3);
  const isDragging = useRef(false);
  const lastX      = useRef(0);
  const lastY      = useRef(0);
  const velX       = useRef(0);
  const velY       = useRef(0);

  useEffect(() => {
    let globe, rafId;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio, 2);

    // Read accent color from CSS variable at runtime and convert to cobe RGB [0-1]
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent").trim();
    const tmp = document.createElement("div");
    tmp.style.color = raw;
    document.body.appendChild(tmp);
    const computed = getComputedStyle(tmp).color; // "rgb(r, g, b)"
    document.body.removeChild(tmp);
    const [cr, cg, cb] = (computed.match(/\d+/g) || ["16","185","129"]).map(Number);
    const accentRGB = [cr / 255, cg / 255, cb / 255];

    globe = createGlobe(canvasRef.current, {      devicePixelRatio: dpr,
      width:  SIZE * dpr,
      height: SIZE * dpr,
      phi: 0, theta: 0.3,
      dark: 0, diffuse: 1.1,
      mapSamples: 30000, mapBrightness: 5,
      baseColor:   [0.97, 0.97, 0.97],
      markerColor: accentRGB,
      glowColor:   accentRGB,
      markers: markers.map(({ location, size, id }) => ({
        location, size, ...(id ? { id } : {}),
      })),
    });

    function updateLabels() {
      if (!overlayRef.current) return;
      const labels = overlayRef.current.querySelectorAll("[data-marker]");
      labels.forEach((el, i) => {
        const m = markers[i];
        const { x, y, visible: vis, depth } = project(
          m.location[0], m.location[1],
          phiRef.current, thetaRef.current, SIZE
        );
        el.style.left   = `${x}px`;
        el.style.top    = `${y}px`;
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
      updateLabels();
      rafId = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) animate();
    });
    observer.observe(canvasRef.current);
    animate();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
      // Detach canvas before cobe.destroy() so React doesn't conflict
      try {
        if (globe) {
          const canvas = canvasRef.current;
          if (canvas && canvas.parentNode) {
            const placeholder = document.createElement("canvas");
            canvas.parentNode.replaceChild(placeholder, canvas);
            globe.destroy();
            placeholder.parentNode && placeholder.parentNode.replaceChild(canvas, placeholder);
          } else {
            globe.destroy();
          }
        }
      } catch (_) {
        // swallow any residual removeChild errors
      }
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
      className="relative select-none"
      style={{ width: SIZE, height: SIZE, maxWidth: "100%" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <canvas
        ref={canvasRef}
        style={{ width: SIZE, height: SIZE, maxWidth: "100%", cursor: "grab", display: "block" }}
      />

      {/* Label overlay — city name pills only, dots rendered by cobe canvas */}
      <div ref={overlayRef} className="absolute inset-0 pointer-events-none">
        {markers.map((m, i) => (
          <div
            key={i}
            data-marker={i}
            className="absolute -translate-x-1/2 pointer-events-none"
            style={{ top: 0, left: 0, transition: "opacity 0.15s" }}
          >
            <div
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap"
              style={{
                backgroundColor: "rgba(255,255,255,0.92)",
                color: "#111",
                border: "1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)",
                boxShadow: "0 1px 6px rgba(0,0,0,0.12)",
                backdropFilter: "blur(4px)",
              }}
            >
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GlobePresence() {
  return (
    <section className="bg-white pt-10 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div
            variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <div>
              <span className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">
                Global Presence
              </span>
              <h2 className="mt-3 anta text-4xl md:text-5xl font-black tracking-tight text-black leading-tight">
                Serving startups<br />
                <span className="text-accent anta">across 6 regions.</span>
              </h2>
              <p className="mt-4 text-base anta text-gray-400 font-light leading-relaxed max-w-md">
                Our solutions are localized, compliant, and optimized for the
                markets you're entering — not just the one you're in. From San
                Francisco to Singapore, we're already there.
              </p>
            </div>

            <div className="space-y-2">
              {regions.map((r) => {
                const count = markers.filter((m) => m.region === r).length;
                return (
                  <div
                    key={r}
                    className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100 bg-gray-50
                      hover:border-accent/30 hover:bg-white transition-all duration-200 group cursor-default"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin size={13} className="text-gray-400 group-hover:text-accent transition-colors" />
                      <span className="text-sm font-medium text-gray-700">{r}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-400 group-hover:text-accent transition-colors">
                      {count} {count === 1 ? "city" : "cities"}
                    </span>
                  </div>
                );
              })}
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
            <div className="relative" style={{ width: SIZE, maxWidth: "100%" }}>
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
