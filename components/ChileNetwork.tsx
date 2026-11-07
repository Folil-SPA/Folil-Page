"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { CHILE_FALLBACK_DATA } from "@/lib/chile-fallback-data";
import { isChileGeoJSON } from "@/lib/chile-geography";
import styles from "./ChileNetwork.module.css";

const fallbackPaths = CHILE_FALLBACK_DATA.geometry.coordinates.flatMap(polygon => polygon.map(ring =>
  ring.map(([lon, lat], i) => {
    const x = (lon + 71) * Math.cos(lat * Math.PI / 180) / 38 * 560;
    const y = -(lat + 37) / 38 * 560;
    return (i ? "L" : "M") + x.toFixed(2) + " " + y.toFixed(2);
  }).join(" ") + "Z",
));

export default function ChileNetwork() {
  const { lang } = useLang();
  const host = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    async function start() {
      try {
        const [module, data] = await Promise.all([
          import("@/lib/chile-scene"),
          fetch("/data/chile-natural-earth.json", { signal: controller.signal })
            .then(response => response.ok ? response.json() : CHILE_FALLBACK_DATA)
            .then(data => isChileGeoJSON(data) ? data : CHILE_FALLBACK_DATA)
            .catch(() => CHILE_FALLBACK_DATA),
        ]);
        if (disposed || !host.current || !label.current || !caption.current) return;
        cleanup = module.mountChileScene({
          host: host.current, label: label.current, caption: caption.current, data,
          onReady: () => setReady(true), onFailure: () => setReady(false),
        });
      } catch {
        // An accurate static geographic view remains usable if WebGL is unavailable.
        if (!disposed) setReady(false);
      } finally {
        window.clearTimeout(timeout);
      }
    }
    void start();
    return () => {
      disposed = true;
      controller.abort();
      window.clearTimeout(timeout);
      cleanup?.();
    };
  }, []);

  return (
    <>
      <div className={[styles.fallback, ready ? styles.loaded : ""].join(" ")} aria-hidden="true">
        <svg viewBox="0 0 480 640" fill="none">
          <g transform="translate(240 315) rotate(32)" stroke="#e8903c" strokeWidth=".7" strokeDasharray="1 1.5" fill="#e8903c" fillOpacity=".025">
            {fallbackPaths.map((path, i) => <path key={i} d={path} />)}
          </g>
          <g transform="translate(240 315) rotate(32) translate(4.3 -52.5) rotate(-32)">
            <circle r="12" fill="#8db978" opacity=".16" />
            <circle r="3" fill="#8db978" />
            <text x="14" y="4" fill="#f5f1e9" fontSize="10" fontFamily="monospace">Santiago</text>
          </g>
        </svg>
      </div>
      <div className={styles.scene} ref={host} data-ready={ready} data-testid="chile-network" />
      <div className={styles.overlay}>
        <div className={styles.cityLabel} ref={label} data-visible="false" role="status" aria-live="polite" />
        <div className={styles.caption} ref={caption} style={{ opacity: 0 }}>
          <span><i />CHILE · <b>{lang === "es" ? "IA DESDE LA RAÍZ" : "AI FROM THE ROOT"}</b></span>
          <button type="button" onClick={() => {
            window.dispatchEvent(new Event("folil:santiago"));
          }} title={lang === "es" ? "También puedes acercar el cursor o tocar Santiago" : "You can also hover over or tap Santiago"}>
            {lang === "es" ? "Activar Santiago" : "Activate Santiago"} <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </>
  );
}

