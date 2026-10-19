'use client';
import { useEffect, useRef, useState } from 'react';

const PAL = ['#f6a98c', '#b9a3f5', '#8cc8f2', '#93dcb8', '#f2a3c0', '#f5d48a'] as const;
const CLUSTER = ['#8f7be8', '#e889ae', '#6fb6e6'] as const;
const EFFECTS = { blooms: 'ink blooms', stars: 'constellation', petals: 'petals', flow: 'flow field', ripples: 'ripples' } as const;
type Effect = keyof typeof EFFECTS;
type Engine = {
  frame(ctx: CanvasRenderingContext2D, now: number, mx: number, my: number): boolean;  // false = idle until the next pointer event
  move?(x: number, y: number, now: number): void;
  down?(x: number, y: number, now: number): void;
};

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(a: readonly T[]) => a[Math.floor(Math.random() * a.length)];
const TAU = Math.PI * 2;

/** One small simulation per effect, sized to the viewport (counts scale with area). */
function makeEngine(kind: Effect, w: number, h: number): Engine {
  if (kind === 'blooms') {  // watercolor drops that spread and fade, layered with multiply like wet pigment
    const blooms: { x: number; y: number; t: number; max: number; c: string; seed: number }[] = [];
    const add = (x: number, y: number, now: number, big: boolean) => {
      blooms.push({ x, y, t: now, max: big ? rnd(80, 130) : rnd(28, 48), c: pick(PAL), seed: rnd(0, 10) });
      if (blooms.length > 80) blooms.shift();
    };
    return {
      move: (x, y, now) => add(x, y, now, false),
      down: (x, y, now) => add(x, y, now, true),
      frame(ctx, now) {
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'multiply';
        for (let i = blooms.length - 1; i >= 0; i--) {
          const b = blooms[i], age = (now - b.t) / 5200;
          if (age >= 1) { blooms.splice(i, 1); continue; }
          const R = b.max * (1 - Math.pow(1 - Math.min(age * 2.2, 1), 3));
          ctx.fillStyle = b.c;
          for (let k = 0; k < 6; k++) {
            const ang = b.seed + k * 1.05, j = R * (0.18 + 0.1 * Math.sin(b.seed * 3 + k));
            ctx.globalAlpha = 0.12 * (1 - age);
            ctx.beginPath();
            ctx.arc(b.x + Math.cos(ang) * j, b.y + Math.sin(ang) * j, R * (0.75 + 0.08 * k), 0, TAU);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
        return blooms.length > 0;
      },
    };
  }
  if (kind === 'stars') {  // drifting graph; same-cluster edges are colored, the pointer joins as a node
    const n = Math.round(Math.min(110, Math.max(40, (w * h) / 16000)));
    const nodes = Array.from({ length: n }, () => ({ x: rnd(0, w), y: rnd(0, h), vx: rnd(-0.22, 0.22), vy: rnd(-0.22, 0.22), c: Math.floor(Math.random() * 3) }));
    return {
      frame(ctx, _now, mx, my) {
        ctx.clearRect(0, 0, w, h);
        for (const p of nodes) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          const dx = mx - p.x, dy = my - p.y, d = Math.hypot(dx, dy);
          if (d < 160 && d > 1) { p.x += (dx / d) * 0.3; p.y += (dy / d) * 0.3; }
        }
        ctx.lineWidth = 1;
        for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
          const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d >= 110) continue;
          const same = a.c === b.c;
          ctx.strokeStyle = same ? CLUSTER[a.c] : '#b8b2cc';
          ctx.globalAlpha = (1 - d / 110) * (same ? 0.62 : 0.26);
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
        for (const p of nodes) {
          const d = Math.hypot(mx - p.x, my - p.y);
          if (d < 160) {
            ctx.strokeStyle = CLUSTER[p.c]; ctx.globalAlpha = (1 - d / 160) * 0.55;
            ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(p.x, p.y); ctx.stroke();
          }
        }
        ctx.globalAlpha = 0.85;
        for (const p of nodes) { ctx.fillStyle = CLUSTER[p.c]; ctx.beginPath(); ctx.arc(p.x, p.y, 3.2, 0, TAU); ctx.fill(); }
        ctx.globalAlpha = 1;
        return true;
      },
    };
  }
  if (kind === 'petals') {  // petals fall and sway; the pointer is a breeze that pushes them away
    const n = Math.round(Math.min(60, Math.max(24, (w * h) / 30000)));
    const petals = Array.from({ length: n }, () => ({ x: rnd(0, w), y: rnd(-h, h), s: rnd(10, 17), a: rnd(0, TAU), va: rnd(-0.02, 0.02), vy: rnd(0.35, 0.8), ph: rnd(0, TAU), c: pick(PAL) }));
    return {
      frame(ctx, _now, mx, my) {
        ctx.clearRect(0, 0, w, h);
        for (const p of petals) {
          p.ph += 0.02; p.y += p.vy; p.x += Math.sin(p.ph) * 0.5; p.a += p.va;
          const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
          if (d < 120 && d > 1) { p.x += (dx / d) * 2.2; p.y += (dy / d) * 1.4; }
          if (p.y > h + 20) { p.y = -20; p.x = rnd(0, w); }
          if (p.x < -20) p.x = w + 20;
          if (p.x > w + 20) p.x = -20;
          ctx.save();
          ctx.translate(p.x, p.y); ctx.rotate(p.a);
          ctx.globalAlpha = 0.75; ctx.fillStyle = p.c;
          ctx.beginPath(); ctx.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, TAU); ctx.fill();
          ctx.globalAlpha = 0.35; ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.ellipse(-p.s * 0.25, -p.s * 0.12, p.s * 0.45, p.s * 0.18, 0, 0, TAU); ctx.fill();
          ctx.restore();
        }
        return true;
      },
    };
  }
  if (kind === 'flow') {  // particles follow a smooth trigonometric vector field; the pointer adds a swirl
    const n = Math.round(Math.min(900, (w * h) / 1400));
    const parts = Array.from({ length: n }, () => ({ x: rnd(0, w), y: rnd(0, h), c: pick(PAL), l: rnd(40, 160) }));
    return {
      frame(ctx, now, mx, my) {
        ctx.globalCompositeOperation = 'destination-out';  // fade old strokes into soft trails
        ctx.fillStyle = 'rgba(0,0,0,0.06)';
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'source-over';
        const t = now * 0.00012;
        ctx.lineWidth = 1.3; ctx.globalAlpha = 0.5;
        for (const p of parts) {
          let ang = Math.sin(p.x * 0.008 + t * 3) * 1.6 + Math.cos(p.y * 0.011 - t * 2) * 1.6 + Math.sin((p.x + p.y) * 0.004 + t);
          const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
          if (d < 130) ang += Math.atan2(dy, dx) + Math.PI * (1 - d / 130);
          const nx = p.x + Math.cos(ang) * 1.4, ny = p.y + Math.sin(ang) * 1.4;
          ctx.strokeStyle = p.c;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(nx, ny); ctx.stroke();
          p.x = nx; p.y = ny;
          if (--p.l < 0 || p.x < 0 || p.x > w || p.y < 0 || p.y > h) { p.x = rnd(0, w); p.y = rnd(0, h); p.l = rnd(40, 160); }
        }
        ctx.globalAlpha = 1;
        return true;
      },
    };
  }
  // ripples: crests of a water surface seen at an angle, a violet shadow edge plus a white highlight
  const ripples: { x: number; y: number; t: number; big: boolean }[] = [];
  const add = (x: number, y: number, now: number, big: boolean) => { ripples.push({ x, y, t: now, big }); if (ripples.length > 40) ripples.shift(); };
  return {
    move: (x, y, now) => add(x, y, now, false),
    down: (x, y, now) => add(x, y, now, true),
    frame(ctx, now) {
      ctx.clearRect(0, 0, w, h);
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i], life = r.big ? 3200 : 2200, p = (now - r.t) / life;
        if (p >= 1) { ripples.splice(i, 1); continue; }
        const R = (r.big ? 12 : 6) + p * (r.big ? 200 : 95);
        for (let k = 0; k < (r.big ? 3 : 2); k++) {
          const rr = R - k * 18, a = (1 - p) * (1 - k * 0.3);
          if (rr <= 0) continue;
          ctx.beginPath(); ctx.ellipse(r.x, r.y + 1.5, rr + 2, (rr + 2) * 0.6, 0, 0, TAU);
          ctx.strokeStyle = `rgba(91,75,209,${0.2 * a})`; ctx.lineWidth = 2.4; ctx.stroke();
          ctx.beginPath(); ctx.ellipse(r.x, r.y, rr, rr * 0.6, 0, 0, TAU);
          ctx.strokeStyle = `rgba(255,255,255,${0.85 * a})`; ctx.lineWidth = 1.8; ctx.stroke();
        }
      }
      return ripples.length > 0;
    },
  };
}

/** Painterly background, an interactive effect layer, and a motion switch (honours prefers-reduced-motion). */
export function Ambient() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [motion, setMotion] = useState(true);
  const [effect, setEffect] = useState<Effect>('blooms');

  useEffect(() => {
    let on = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    try {
      const saved = localStorage.getItem('motion');
      if (saved) on = saved === 'on';
      const fx = localStorage.getItem('effect');
      if (fx && fx in EFFECTS) setEffect(fx as Effect);
    } catch {}
    setMotion(on);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('still', !motion);
    try { localStorage.setItem('motion', motion ? 'on' : 'off'); localStorage.setItem('effect', effect); } catch {}
    const c = canvas.current;
    const ctx = c?.getContext('2d');
    if (!motion || !c || !ctx) return;

    let engine: Engine, raf = 0, last = 0, mx = -9999, my = -9999, w = 0, h = 0;
    const loop = (now: number) => { raf = engine.frame(ctx, now, mx, my) ? requestAnimationFrame(loop) : 0; };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, effect === 'flow' || effect === 'stars' ? 1.5 : 2);
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      engine = makeEngine(effect, w, h);
      kick();
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX; my = e.clientY;
      const now = performance.now();
      if (now - last < 70) return;
      last = now;
      engine.move?.(mx, my, now);
      kick();
    };
    const onDown = (e: PointerEvent) => { engine.down?.(e.clientX, e.clientY, performance.now()); kick(); };
    const onLeave = () => { mx = -9999; my = -9999; };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, c.width, c.height);
    };
  }, [motion, effect]);

  return <>
    <div className="wash" aria-hidden="true"><i /><i /><i /><i /><i /></div>
    <canvas ref={canvas} className="ripples" aria-hidden="true" />
    <div className="fx-switch" role="group" aria-label="Background effect (demo)">
      {(Object.keys(EFFECTS) as Effect[]).map(k =>
        <button key={k} type="button" aria-pressed={effect === k} onClick={() => setEffect(k)}>{EFFECTS[k]}</button>)}
    </div>
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
