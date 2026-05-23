"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/contexts/LanguageContext";

const t = (lang: string) => ({
  badge: lang === "es" ? "Motor IA para empresas early adopters" : "AI engine for early adopter companies",
  h1Before: lang === "es" ? "La " : "The ",
  h1Em: lang === "es" ? "raíz" : "root",
  h1After: lang === "es" ? " de tus<br>productos IA" : " of your<br>AI products",
  sub: lang === "es" ? "Dos ingenieros PUC especializados en IA, listos para construir contigo desde cero. Sin estructura de consultora, sin overhead — solo ingeniería real aplicada a tu problema." : "Two PUC engineers specialized in AI, ready to build with you from scratch. No consulting overhead — just real engineering applied to your problem.",
  cta: lang === "es" ? "Únete a la lista de espera" : "Join the waitlist",
  how: lang === "es" ? "Cómo funciona" : "How it works",
});

export default function Hero() {
  const { lang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const txt = t(lang);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let W = 0, H = 0;
    const LAYERS = [4, 7, 9, 7, 4];
    const TOTAL_LAYERS = LAYERS.length;
    const LAYER_START = LAYERS.map((_, li) => LAYERS.slice(0, li).reduce((s: number, v: number) => s + v, 0));
    let nodes: { x: number; y: number; layer: number; phase: number; spd: number; r: number; active: number }[] = [];
    let edges: [number, number][] = [];
    let signals: { a: number; b: number; t: number; spd: number }[] = [];
    let t = 0, spawnAccum = 0;
    const SPAWN_INTERVAL = 0.15, DT = 1/60;

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      W = rect.width || 480; H = rect.height || W;
      canvas!.width = W; canvas!.height = H;
      canvas!.style.width = W+"px"; canvas!.style.height = H+"px";
      buildGraph();
    }
    function buildGraph() {
      nodes = []; const padX = W*0.1, padY = H*0.1, usableW = W-padX*2, usableH = H-padY*2;
      LAYERS.forEach((count, li) => {
        const lx = padX + (li/(TOTAL_LAYERS-1))*usableW;
        for (let i = 0; i < count; i++) {
          nodes.push({ x: lx+(Math.random()-0.5)*16, y: padY+((i+0.5)/count)*usableH+(Math.random()-0.5)*16, layer: li, phase: Math.random()*Math.PI*2, spd: 0.5+Math.random()*0.7, r: (li===0||li===TOTAL_LAYERS-1)?3.8:2.5+Math.random(), active: 0 });
        }
      });
      edges = [];
      LAYERS.forEach((count, li) => {
        if (li===TOTAL_LAYERS-1) return;
        for (let a=LAYER_START[li]; a<LAYER_START[li]+count; a++)
          for (let b=LAYER_START[li+1]; b<LAYER_START[li+1]+LAYERS[li+1]; b++)
            if (Math.random()<0.65) edges.push([a,b]);
      });
      if (edges.length<8) buildGraph();
    }
    function spawnSignal() { if (!edges.length) return; const e=edges[Math.floor(Math.random()*edges.length)]; signals.push({a:e[0],b:e[1],t:0,spd:0.7+Math.random()}); }
    function draw() {
      t+=DT; spawnAccum+=DT;
      if (spawnAccum>=SPAWN_INTERVAL) { spawnSignal(); spawnAccum=0; }
      ctx!.clearRect(0,0,W,H);
      ctx!.lineWidth=0.6; ctx!.strokeStyle="rgba(232,144,60,0.07)"; ctx!.beginPath();
      edges.forEach(([ai,bi])=>{const a=nodes[ai],b=nodes[bi];if(a.active<0.1&&b.active<0.1){ctx!.moveTo(a.x,a.y);ctx!.lineTo(b.x,b.y);}}); ctx!.stroke();
      ctx!.strokeStyle="rgba(232,144,60,0.16)"; ctx!.beginPath();
      edges.forEach(([ai,bi])=>{const a=nodes[ai],b=nodes[bi];if(a.active>=0.1||b.active>=0.1){ctx!.moveTo(a.x,a.y);ctx!.lineTo(b.x,b.y);}}); ctx!.stroke();
      ctx!.lineWidth=1.8;
      signals=signals.filter(s=>{s.t+=s.spd*DT;if(s.t>=1){nodes[s.b].active=Math.min(nodes[s.b].active+0.9,1);return false;}
        const a=nodes[s.a],b=nodes[s.b],sx=a.x+(b.x-a.x)*s.t,sy=a.y+(b.y-a.y)*s.t,alpha=Math.sin(s.t*Math.PI);
        for(let i=3;i>=1;i--){const t0=Math.max(0,s.t-i*0.045),tx=a.x+(b.x-a.x)*t0,ty=a.y+(b.y-a.y)*t0;ctx!.strokeStyle=`rgba(232,144,60,${(alpha*0.4*(4-i)/3).toFixed(2)})`;ctx!.beginPath();ctx!.moveTo(tx,ty);ctx!.lineTo(sx,sy);ctx!.stroke();}
        ctx!.fillStyle=`rgba(232,144,60,${alpha.toFixed(2)})`;ctx!.beginPath();ctx!.arc(sx,sy,3.5,0,Math.PI*2);ctx!.fill();
        ctx!.strokeStyle=`rgba(232,144,60,${(alpha*0.35).toFixed(2)})`;ctx!.lineWidth=1;ctx!.beginPath();ctx!.arc(sx,sy,6,0,Math.PI*2);ctx!.stroke();ctx!.lineWidth=1.8;return true;});
      nodes.forEach(n=>{if(n.active>0)n.active=Math.max(0,n.active-DT*1.4);const pulse=Math.sin(t*n.spd+n.phase)*0.5+0.5,r=n.r+pulse*0.7,a=n.active;
        ctx!.strokeStyle=`rgba(232,144,60,${(0.08+a*0.2+pulse*0.05).toFixed(2)})`;ctx!.lineWidth=a>0.2?1.2:0.6;ctx!.beginPath();ctx!.arc(n.x,n.y,r*2.8,0,Math.PI*2);ctx!.stroke();
        if(a>0.3){ctx!.strokeStyle=`rgba(232,144,60,${(a*0.25).toFixed(2)})`;ctx!.lineWidth=0.6;ctx!.beginPath();ctx!.arc(n.x,n.y,r*4.5,0,Math.PI*2);ctx!.stroke();}
        ctx!.fillStyle=`rgba(232,144,60,${Math.min(0.3+pulse*0.2+a*0.5,0.95).toFixed(2)})`;ctx!.beginPath();ctx!.arc(n.x,n.y,r,0,Math.PI*2);ctx!.fill();});
      ctx!.font='500 10px "Space Grotesk", sans-serif';ctx!.textAlign="center";ctx!.fillStyle="rgba(232,144,60,0.22)";
      const px=W*0.1,uw=W-px*2;
      (["Input","","","","Output"]as const).forEach((lbl,li)=>{if(!lbl)return;ctx!.fillText(lbl,px+(li/(TOTAL_LAYERS-1))*uw,H-12);});
      animRef.current=requestAnimationFrame(draw);
    }
    resize(); window.addEventListener("resize",resize);
    animRef.current=requestAnimationFrame(draw);
    return ()=>{cancelAnimationFrame(animRef.current);window.removeEventListener("resize",resize);};
  },[]);

  return (
    <section id="hero">
      <div className="hero-bg-grid"/><div className="hero-orb hero-orb-1"/><div className="hero-orb hero-orb-2"/><div className="hero-orb hero-orb-3"/>
      <div className="hero-content">
        <div className="hero-badge"><span className="dot"/><span>{txt.badge}</span></div>
        <h1>{txt.h1Before}<em>{txt.h1Em}</em>{txt.h1After}</h1>
        <p className="hero-sub" dangerouslySetInnerHTML={{__html:txt.sub}}/>
        <div className="hero-cta"><a href="#waitlist" className="btn-primary">{txt.cta}</a><a href="#value" className="btn-ghost">{txt.how}</a></div>
      </div>
      <div className="hero-visual"><div className="hero-visual-glow"/><canvas ref={canvasRef} id="hero-canvas"/></div>
      <style jsx>{`
        #hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: clamp(6rem,12vw,10rem) clamp(1.5rem,5vw,4rem) clamp(4rem,8vw,6rem); overflow: hidden; }
        .hero-bg-grid { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px); background-size: 32px 32px; animation: gridDrift 20s linear infinite; }
        @keyframes gridDrift { from { background-position: 0 0; } to { background-position: 32px 32px; } }
        .hero-orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.12; }
        .hero-orb-1 { width:500px; height:500px; background:var(--accent); top:-10%; left:-15%; animation:orbFloat1 16s ease-in-out infinite; }
        .hero-orb-2 { width:350px; height:350px; background:var(--accent2); bottom:10%; right:-10%; animation:orbFloat2 12s ease-in-out infinite; }
        .hero-orb-3 { width:250px; height:250px; background:var(--accent); top:50%; right:20%; animation:orbFloat3 10s ease-in-out infinite; }
        @keyframes orbFloat1 { 0%,100% { transform:translate(0,0) scale(1); } 33% { transform:translate(30px,-30px) scale(1.05); } 66% { transform:translate(-20px,20px) scale(0.95); } }
        @keyframes orbFloat2 { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(-40px,-20px) scale(1.1); } }
        @keyframes orbFloat3 { 0%,100% { transform:translate(0,0) scale(1); } 25% { transform:translate(20px,-40px) scale(0.9); } 75% { transform:translate(-30px,30px) scale(1.05); } }
        .hero-content { position:relative; z-index:2; max-width:700px; }
        .hero-badge { display:inline-flex; align-items:center; gap:0.5rem; padding:0.25rem 0.75rem; border-radius:999px; border:1px solid rgba(232,144,60,0.2); background:rgba(232,144,60,0.04); font-size:0.75rem; font-weight:500; color:var(--text); margin-bottom:2rem; animation:fadeUp 0.6s var(--ease-spring) 0.1s both; }
        .dot { width:6px; height:6px; background:var(--accent); border-radius:50%; animation:pulse 2.5s ease-in-out infinite; }
        h1 { font-family:var(--font-display); font-size:clamp(2.6rem,5.5vw,4.5rem); font-weight:700; letter-spacing:-0.04em; line-height:1.04; margin-bottom:1.5rem; animation:fadeUp 0.6s var(--ease-spring) 0.25s both; }
        h1 em { font-style:normal; background:linear-gradient(90deg,var(--accent),var(--accent2),var(--accent)); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 3s linear infinite; }
        .hero-sub { font-size:1.05rem; color:var(--muted); max-width:540px; line-height:1.7; margin-bottom:2.5rem; animation:fadeUp 0.6s var(--ease-spring) 0.4s both; }
        .hero-cta { display:flex; gap:1rem; flex-wrap:wrap; animation:fadeUp 0.6s var(--ease-spring) 0.55s both; }
        .hero-visual { position:absolute; right:clamp(-10%,-5vw,0%); top:50%; transform:translateY(-50%); width:clamp(400px,45vw,700px); height:clamp(400px,50vw,700px); z-index:1; pointer-events:none; }
        .hero-visual-glow { position:absolute; inset:-20%; background:radial-gradient(circle at center, rgba(232,144,60,0.08) 0%, transparent 60%); animation:glowPulse 5s ease-in-out infinite; }
        @keyframes glowPulse { 0%,100% { opacity:0.6; transform:scale(1); } 50% { opacity:1; transform:scale(1.05); } }
        #hero-canvas { width:100%; height:100%; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
        @keyframes pulse { 0%,100% { transform:scale(1); opacity:1; } 50% { transform:scale(1.1); opacity:0.8; } }
        @media (max-width:768px) { .hero-visual { position:relative; right:auto; top:auto; transform:none; width:100%; height:350px; margin-top:2rem; opacity:0.4; } }
      `}</style>
    </section>
  );
}
