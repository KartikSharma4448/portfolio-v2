import { useEffect, useRef } from 'react';

function SubtleParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(50, Math.floor((canvas.width * canvas.height) / 20000));
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.0 + 0.4,
      a: Math.random() * 0.3 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of dots) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${p.a})`;
        ctx.fill();
      }
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(99,130,200,${(1 - d/110) * 0.10})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {/* Base */}
      <div className="absolute inset-0 bg-[#060b18]" />

      {/* Dot-grid mesh */}
      <div className="hero-dot-grid" />

      {/* Soft color blobs */}
      <div className="absolute" style={{ width: 650, height: 650, top: '-20%', left: '-12%', borderRadius: '60% 40% 70% 30%/50% 60% 40% 50%', background: 'radial-gradient(ellipse, rgba(37,99,235,0.16) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div className="absolute" style={{ width: 500, height: 500, top: '20%', right: '-10%', borderRadius: '40% 60% 30% 70%/60% 40% 70% 30%', background: 'radial-gradient(ellipse, rgba(99,102,241,0.13) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div className="absolute" style={{ width: 400, height: 400, bottom: '-5%', left: '35%', background: 'radial-gradient(ellipse, rgba(14,165,233,0.10) 0%, transparent 70%)', filter: 'blur(55px)', pointerEvents: 'none' }} />

      {/* Particles */}
      <SubtleParticles />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, rgba(6,11,24,0.85) 0%, transparent 100%)' }} />

      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 52%, rgba(4,7,16,0.65) 100%)', pointerEvents: 'none' }} />
    </div>
  );
}
