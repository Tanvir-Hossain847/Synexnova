"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Globe() {
  const canvasRef = useRef(null);

  // rotation state
  const phiRef = useRef(0);
  const thetaRef = useRef(0.2);

  // drag state
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);

  // velocity for inertia
  const velX = useRef(0);
  const velY = useRef(0);

  useEffect(() => {
    let globe;
    let animationFrameId;
    let isVisible = true;

    const dpr = Math.min(window.devicePixelRatio, 2);

    globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width: 600 * 3,
      height: 600 * 3,
      phi: 0,
      theta: 0.2,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 40000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.102, 0.239, 0.388],
      glowColor: [0.102, 0.239, 0.388],
      markers: [
        { location: [37.78, -122.44], size: 0.03, id: "sf" },
        { location: [40.71, -74.01], size: 0.03, id: "nyc" },
        { location: [51.51, -0.13], size: 0.03, id: "london" },
        { location: [35.68, 139.69], size: 0.03, id: "tokyo" },
        { location: [48.86, 2.35], size: 0.03, id: "paris" },
      ],
      arcs: [
        { from: [37.78, -122.44], to: [51.51, -0.13] },
        { from: [40.71, -74.01], to: [48.86, 2.35] },
        { from: [35.68, 139.65], to: [-33.87, 151.21], id: "tokyo-sydney" },
        { from: [37.78, -122.44], to: [19.43, -99.13] },
        { from: [19.43, -99.13], to: [-23.55, -46.63] },
      ],
      arcColor: [0.102, 0.239, 0.388],
      arcWidth: 0.3,
      arcHeight: 0.2,
    });

    function animate() {
      if (!isVisible || !globe) return;

      if (isDragging.current) {
        phiRef.current += velX.current;
        thetaRef.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, thetaRef.current + velY.current));
      } else {
        velX.current *= 0.90;
        velY.current *= 0.90;
        phiRef.current += velX.current;
        thetaRef.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, thetaRef.current + velY.current));
        if (Math.abs(velX.current) < 0.0001) {
          phiRef.current += 0.005;
        }
      }

      globe.update({ phi: phiRef.current, theta: thetaRef.current });
      animationFrameId = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) animate();
    });
    observer.observe(canvasRef.current);

    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (globe) globe.destroy();
      observer.disconnect();
    };
  }, []);

  const onPointerDown = (e) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    lastY.current = e.clientY;
    velX.current = 0;
    velY.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastX.current;
    const dy = e.clientY - lastY.current;
    lastX.current = e.clientX;
    lastY.current = e.clientY;
    velX.current = dx * 0.004;
    velY.current = dy * 0.003;
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: 1500,
      maxHeight: 1500,
      objectFit: "cover",
      margin: "0 auto",
      transform: "translateX(500px) translateY(-200px)",
      overflow: "hidden",
      height: 1000,
      opacity: "30%",
      marginBottom: "-200px",
    }}>
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{
          width: 1500,
          height: 1500,
          maxWidth: "100%",
          cursor: "grab",
        }}
      />
    </div>
  );
}
