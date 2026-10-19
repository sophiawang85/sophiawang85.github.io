'use client';
import { useEffect, useRef, useState } from 'react';

type Ripple = { x: number; y: number; t: number; big: boolean };

/** Painterly background, cursor ripples, and a motion switch (honours prefers-reduced-motion). */
export function Ambient() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    let on = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    try {
      const saved = localStorage.getItem('motion');
      if (saved) on = saved === 'on';
    } catch {}
    setMotion(on);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('still', !motion);
    try {
      localStorage.setItem('motion', motion ? 'on' : 'off');
    } catch {}
    const c = canvas.current;
    const ctx = c?.getContext('2d');
    if (!motion || !c || !ctx) return;

    const ripples: Ripple[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, last = 0, lx = -999, ly = -999;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i], life = r.big ? 3200 : 2200, p = (now - r.t) / life;
        if (p >= 1) { ripples.splice(i, 1); continue; }
        const R = (r.big ? 12 : 6) + p * (r.big ? 200 : 95);
        for (let k = 0; k < (r.big ? 3 : 2); k++) {
          const rr = R - k * 18, a = (1 - p) * (1 - k * 0.3);
          if (rr <= 0) continue;
          // each ring is a crest: a faint violet shadow edge plus a white highlight, squashed like water seen at an angle
          ctx.beginPath();
          ctx.ellipse(r.x, r.y + 1.5, rr + 2, (rr + 2) * 0.6, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(91,75,209,${0.2 * a})`;
          ctx.lineWidth = 2.4;
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(r.x, r.y, rr, rr * 0.6, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${0.85 * a})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }
      }
      raf = ripples.length ? requestAnimationFrame(draw) : 0;
    };
    const add = (x: number, y: number, big = false) => {
      ripples.push({ x, y, t: performance.now(), big });
      if (ripples.length > 40) ripples.shift();
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < 70 || Math.hypot(e.clientX - lx, e.clientY - ly) < 30) return;
      last = now; lx = e.clientX; ly = e.clientY;
      add(lx, ly);
    };
    const onDown = (e: PointerEvent) => add(e.clientX, e.clientY, true);

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      ctx.clearRect(0, 0, w, h);
    };
  }, [motion]);

  return <>
    <div className="wash" aria-hidden="true"><i /><i /><i /><i /><i /></div>
    <canvas ref={canvas} className="ripples" aria-hidden="true" />
    <button className="motion-toggle" type="button" aria-pressed={motion} onClick={() => setMotion(m => !m)}>
      ✦ motion: {motion ? 'on' : 'off'}
    </button>
  </>;
}

/** Highlights the nav pill of the section currently in view. */
export function NavSpy() {
  useEffect(() => {
    const links = [...document.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]')];
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
      }
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(a => {
      const section = document.querySelector(a.getAttribute('href') || '');
      if (section) io.observe(section);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
