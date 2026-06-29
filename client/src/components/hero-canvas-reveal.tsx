import { useEffect, useRef } from "react";

const IMAGE_TOP = "/img1.png";
const IMAGE_BOTTOM = "/img2.png";

const TRAIL_MAX_AGE = 900;
const TRAIL_RADIUS = 90;
const TRAIL_MIN_RAD = 8;
const TRAIL_FEATHER = 30;
const IDLE_FADE_SPEED = 0.04;

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

export function HeroCanvasReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, rafId = 0;
    let trail: TrailPoint[] = [];
    let mouse: { x: number; y: number } | null = null;
    let lastMoveTime = 0;
    let globalAlpha = 1;

    const imgTop = new Image();
    const imgBot = new Image();
    let topLoaded = false;
    let botLoaded = false;

    imgTop.onload = () => { topLoaded = true; tryStart(); };
    imgBot.onload = () => { botLoaded = true; tryStart(); };
    imgTop.src = IMAGE_TOP;
    imgBot.src = IMAGE_BOTTOM;

    function tryStart() {
      if (topLoaded && botLoaded) { resize(); loop(); }
    }

    function resize() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }

    function drawCover(c: CanvasRenderingContext2D, img: HTMLImageElement) {
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = W / H;
      let sw: number, sh: number, sx: number, sy: number;
      if (ir > cr) {
        sh = img.naturalHeight;
        sw = sh * cr;
        sx = (img.naturalWidth - sw) / 2;
        sy = 0;
      } else {
        sw = img.naturalWidth;
        sh = sw / cr;
        sx = 0;
        sy = (img.naturalHeight - sh) * 0.5;
      }
      c.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
    }

    function buildRevealMask(): HTMLCanvasElement {
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const c = off.getContext("2d")!;
      c.clearRect(0, 0, W, H);
      if (trail.length === 0) return off;
      const now = Date.now();
      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i];
        const age = now - pt.t;
        const lifeFrac = 1 - age / TRAIL_MAX_AGE;
        if (lifeFrac <= 0) continue;
        const posFrac = i / Math.max(1, trail.length - 1);
        const radius = TRAIL_MIN_RAD + (TRAIL_RADIUS - TRAIL_MIN_RAD) * posFrac * lifeFrac;
        const feather = TRAIL_FEATHER * posFrac * lifeFrac;
        const totalR = radius + feather;
        const alpha = Math.min(1, lifeFrac * (0.5 + 0.5 * posFrac)) * globalAlpha;
        const g = c.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, totalR);
        g.addColorStop(0, `rgba(255,255,255,${alpha})`);
        g.addColorStop(radius / totalR, `rgba(255,255,255,${alpha})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        c.fillStyle = g;
        c.beginPath();
        c.arc(pt.x, pt.y, totalR, 0, Math.PI * 2);
        c.fill();
      }
      return off;
    }

    function drawEmberGlow(x: number, y: number, alpha: number) {
      ctx!.save();
      const r1 = TRAIL_RADIUS * 0.8;
      const r2 = TRAIL_RADIUS + TRAIL_FEATHER + 40;
      const g = ctx!.createRadialGradient(x, y, r1, x, y, r2);
      g.addColorStop(0, "rgba(100,180,255,0)");
      g.addColorStop(0.3, `rgba(100,180,255,${0.4 * alpha})`);
      g.addColorStop(0.7, `rgba(60,130,220,${0.15 * alpha})`);
      g.addColorStop(1, "rgba(60,130,220,0)");
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(x, y, r2, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    function drawCursor(x: number, y: number, alpha: number) {
      ctx!.save();
      ctx!.globalAlpha = alpha;
      ctx!.beginPath();
      ctx!.arc(x, y, TRAIL_RADIUS, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(100,180,255,0.6)";
      ctx!.lineWidth = 1.2;
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.arc(x, y, 3, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(100,180,255,0.9)";
      ctx!.fill();
      const s = 10;
      ctx!.strokeStyle = "rgba(100,180,255,0.4)";
      ctx!.lineWidth = 0.8;
      ctx!.beginPath(); ctx!.moveTo(x - s, y); ctx!.lineTo(x + s, y); ctx!.stroke();
      ctx!.beginPath(); ctx!.moveTo(x, y - s); ctx!.lineTo(x, y + s); ctx!.stroke();
      ctx!.restore();
    }

    function render() {
      const now = Date.now();
      trail = trail.filter((pt) => now - pt.t < TRAIL_MAX_AGE);
      const idleTime = now - lastMoveTime;
      if (idleTime > 100) {
        globalAlpha = Math.max(0, globalAlpha - IDLE_FADE_SPEED);
      } else {
        globalAlpha = Math.min(1, globalAlpha + 0.12);
      }
      ctx!.clearRect(0, 0, W, H);
      drawCover(ctx!, imgBot);
      ctx!.fillStyle = "rgba(6,4,10,0.30)";
      ctx!.fillRect(0, 0, W, H);
      if (mouse && globalAlpha > 0.01) {
        drawEmberGlow(mouse.x, mouse.y, globalAlpha);
      }
      const offTop = document.createElement("canvas");
      offTop.width = W;
      offTop.height = H;
      const ctxTop = offTop.getContext("2d")!;
      drawCover(ctxTop, imgTop);
      const offMasked = document.createElement("canvas");
      offMasked.width = W;
      offMasked.height = H;
      const ctxMasked = offMasked.getContext("2d")!;
      ctxMasked.drawImage(offTop, 0, 0);
      ctxMasked.globalCompositeOperation = "destination-out";
      ctxMasked.drawImage(buildRevealMask(), 0, 0);
      ctx!.drawImage(offMasked, 0, 0);
      if (mouse && globalAlpha > 0.01) {
        drawCursor(mouse.x, mouse.y, Math.min(1, globalAlpha * 1.5));
      }
    }

    function loop() {
      render();
      rafId = requestAnimationFrame(loop);
    }

    function addPoint(x: number, y: number) {
      const now = Date.now();
      const last = trail[trail.length - 1];
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        if (dx * dx + dy * dy < 16) return;
      }
      trail.push({ x, y, t: now });
      if (trail.length > 250) trail.shift();
      lastMoveTime = now;
      mouse = { x, y };
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= W && y >= 0 && y <= H) {
        addPoint(x, y);
      }
    }

    function handleMouseLeave() {
      mouse = null;
    }

    function handleTouchMove(e: TouchEvent) {
      const t = e.touches[0];
      const rect = canvas!.getBoundingClientRect();
      addPoint(t.clientX - rect.left, t.clientY - rect.top);
    }

    function handleTouchEnd() {
      mouse = null;
    }

    const resizeHandler = () => {
      resize();
      cancelAnimationFrame(rafId);
      loop();
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
