'use client';
import { useEffect, useRef, useState } from 'react';

const CLUSTER = ['#8f7be8', '#e889ae', '#6fb6e6'] as const;  // node colors = three "clusters"
const LINK = 110, REACH = 160;                                 // px: node-to-node and pointer-to-node link distance

type Node = { x: number; y: number; vx: number; vy: number; c: number };
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

/** Drifting graph: nearby nodes link (same-cluster links in color), and the pointer joins in as a node. */
function constellation(w: number, h: number) {
  const n = Math.round(Math.min(110, Math.max(40, (w * h) / 16000)));
  const nodes: Node[] = Array.from({ length: n }, () => ({ x: rnd(0, w), y: rnd(0, h), vx: rnd(-0.22, 0.22), vy: rnd(-0.22, 0.22), c: Math.floor(Math.random() * 3) }));
  return (ctx: CanvasRenderingContext2D, mx: number, my: number) => {
    ctx.clearRect(0, 0, w, h);
    for (const p of nodes) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      const dx = mx - p.x, dy = my - p.y, d = Math.hypot(dx, dy);
      if (d < REACH && d > 1) { p.x += (dx / d) * 0.3; p.y += (dy / d) * 0.3; }  // gentle pull toward the pointer
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d >= LINK) continue;
      const same = a.c === b.c;
      ctx.strokeStyle = same ? CLUSTER[a.c] : '#b8b2cc';
      ctx.globalAlpha = (1 - d / LINK) * (same ? 0.62 : 0.26);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    for (const p of nodes) {
      const d = Math.hypot(mx - p.x, my - p.y);
      if (d >= REACH) continue;
      ctx.strokeStyle = CLUSTER[p.c]; ctx.globalAlpha = (1 - d / REACH) * 0.55;
      ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(p.x, p.y); ctx.stroke();
    }
    ctx.globalAlpha = 0.85;
    for (const p of nodes) { ctx.fillStyle = CLUSTER[p.c]; ctx.beginPath(); ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2); ctx.fill(); }
    ctx.globalAlpha = 1;
  };
}

/** Painterly background, the constellation layer, and a motion switch (honours prefers-reduced-motion). */
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
    try { localStorage.setItem('motion', motion ? 'on' : 'off'); } catch {}
    const c = canvas.current;
    const ctx = c?.getContext('2d');
    if (!motion || !c || !ctx) return;

    let draw = constellation(1, 1), raf = 0, mx = -9999, my = -9999;
    const loop = () => {
      raf = 0;  // cleared first, so a throwing frame can never leave the loop stuck
      draw(ctx, mx, my);
      raf = requestAnimationFrame(loop);
    };
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight, dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw = constellation(w, h);
    };
    const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => { mx = -9999; my = -9999; };

    resize();
    raf = requestAnimationFrame(loop);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, c.width, c.height);
    };
  }, [motion]);

  return <>
    <div className="wash" aria-hidden="true"><i /><i /><i /><i /><i /></div>
    <canvas ref={canvas} className="constellation" aria-hidden="true" />
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
