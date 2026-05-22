# Folil Labs — Design System

## Design Tokens

### Colores
| Token | Valor | Uso |
|-------|-------|-----|
| `--bg` | `#0a0a07` | Fondo base — negro con tinte cálido muy sutil |
| `--surface` | `#131310` | Superficies secundarias (secciones alternas) |
| `--surface2` | `#1a1a16` | Controles UI (lang toggle, etc.) |
| `--border` | `rgba(255,255,255,0.07)` | Bordes sutiles entre elementos |
| `--text` | `#f5f0e8` | Texto principal — blanco cálido / crema |
| `--muted` | `#666` | Texto secundario / metadata |
| `--subtle` | `#333` | Elementos decorativos muy tenues |
| `--accent` | `#e8903c` | Naranja ámbar — color de marca primario |
| `--accent2` | `#7fb069` | Verde salvia — color de marca secundario |
| `--accent-dim` | `rgba(232,144,60,0.10)` | Fondos de iconos / badges |
| `--accent-glow` | `rgba(232,144,60,0.22)` | Box-shadows tipo glow |

**Gradiente de marca:** `linear-gradient(90deg, #e8903c, #7fb069)` — ámbar a verde salvia.
Usado en: scroll progress bar, stat numbers, texto `<em>` del H1.

**Clave de la paleta:** el fondo y el texto son cálidos (no neutros puros), lo que refuerza la calidez del naranja ámbar.

### Tipografía
| Token | Fuente | Uso |
|-------|--------|-----|
| `--font-display` | Space Grotesk | Headings, nav, botones, labels |
| `--font-body` | DM Sans | Párrafos, subtextos |

| Rol | Tamaño | Peso | Letter-spacing |
|-----|--------|------|----------------|
| H1 hero | `clamp(2.6rem, 5.5vw, 4.5rem)` | 700 | `-0.04em` |
| H2 sección | `clamp(1.8rem, 4vw, 2.8rem)` | 700 | `-0.035em` |
| H3 card | `1.05rem` | 600 | `-0.02em` |
| Section tag | `0.72rem` | 500 | `+0.12em` uppercase |
| Body | `0.875–1rem` | 300–400 | normal |
| Small / label | `0.7–0.82rem` | 500–600 | `+0.04–0.1em` |

Line-height: body `1.6–1.75`, headings `1.04–1.1`

### Espaciado
| Contexto | Valor |
|----------|-------|
| Section padding | `clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)` |
| Container max-width | `1100px` |
| Card padding | `2–2.5rem` |
| Nav height | `64px` |

### Bordes & Radios
| Elemento | Radio |
|----------|-------|
| Botones principales | `10px` |
| CTA nav | `8px` |
| Cards grandes (value/process) | `18px` |
| Cards de servicio | `16px` |
| Case chips | `14px` |
| Iconos en cards | `12px` |
| Badges / pills | `999px` |
| Lang toggle | `6px` |

### Sombras & Glow
| Elemento | Sombra |
|----------|--------|
| Botón primary (rest) | `0 0 40px rgba(232,144,60,0.22), 0 2px 20px rgba(232,144,60,0.15)` |
| Botón primary (hover) | `0 8px 48px rgba(232,144,60,0.22), 0 2px 20px rgba(232,144,60,0.25)` |
| Card hover | `0 8px 32px rgba(0,0,0,0.3)` |
| Stat numbers | `drop-shadow(0 0 12px rgba(232,144,60,0.3))` |

---

## Componentes

### Botones
| Variante | Fondo | Color texto | Hover |
|----------|-------|-------------|-------|
| `btn-primary` | `#e8903c` | `#000` | `translateY(-2px)` + glow ámbar amplificado |
| `btn-ghost` | transparent | `#666` | `color: #f5f0e8`, fondo `rgba(255,255,255,0.07)` |
| `btn-cta` (nav) | `#f5f0e8` | `#000` | `opacity: 0.88`, `translateY(-1px)` |

`btn-primary` lleva animación de shine interno (sweep de luz blanca cada 2.8s).

### Cards
Patrón común a todos:
- Fondo `#0f0f0f` o `#111`
- Borde `rgba(255,255,255,0.07)`
- `::after` pseudo con `radial-gradient` ámbar en esquina top-left — `opacity: 0 → 1` on hover
- Transición `0.3–0.35s` ease

### Iconos en cards
48×48px (value) / 40×40px (service):
- `background: var(--accent-dim)` — `rgba(232,144,60,0.10)`
- `border: 1px solid rgba(232,144,60,0.18)`
- `border-radius: 12px`
- `box-shadow: 0 0 24px rgba(232,144,60,0.08)`
- Hover: escala 1.08–1.12, glow más fuerte

### Section Tag
- `font-size: 0.72rem`, `letter-spacing: 0.12em`, `text-transform: uppercase`
- `color: var(--accent)` — naranja ámbar
- `font-family: var(--font-display)`, `font-weight: 500`

### Badges / Pills
- `border-radius: 999px`
- `border: 1px solid rgba(232,144,60,0.2)`
- `background: rgba(232,144,60,0.04)`
- Punto animado `pulse` en `--accent`

### Tech tags (project cards)
- Borde `rgba(255,255,255,0.1)`, `border-radius: 4px`
- `font-size: 0.7rem`, `padding: 0.2rem 0.65rem`
- Fondo transparente, color `--muted`

---

## Animaciones

| Nombre | Descripción | Uso |
|--------|-------------|-----|
| `fadeUp` | `opacity 0→1 + translateY(16–20px → 0)`, `cubic-bezier(0.16,1,0.3,1)` | Entrada staggered del hero |
| `shimmer` | Background-position de gradiente, `3s linear infinite` | Texto `<em>` del H1 |
| `btnShine` | Sweep de luz blanca sobre botón, `2.8s infinite` | `btn-primary` |
| `pulse` | Scale + opacity del dot, `2.5s ease-in-out` | Badge de estado |
| `orbFloat1/2/3` | `translate + scale` suaves, 10–16s | Orbs ámbar de fondo del hero |
| `gridDrift` | Desplazamiento del grid de puntos, `20s linear` | Background hero |
| `glowPulse` | Escala + opacidad del glow canvas, `5s` | Visual animado hero |
| `statsSheen` | Sweep de brillo horizontal, `6s` | Stats bar |
| `fadeIn` | `opacity 0→1`, `1.2s` | Canvas hero / visual |

**Easing de entrada estándar:** `cubic-bezier(0.16, 1, 0.3, 1)` (spring suave)

**Stagger del hero:** badge `0.1s` → H1 `0.25s` → subtítulo `0.4s` → CTAs `0.55s`

---

## Principios de la Estética

1. **Negro cálido, no frío** — `#0a0a07` tiene tinte amarillento que armoniza con el ámbar; evitar `#000` puro o azulados
2. **Blanco crema, no blanco puro** — `#f5f0e8` como texto; el tinte cálido unifica toda la paleta
3. **Ámbar como único acento caliente** — `#e8903c` domina; verde salvia `#7fb069` solo en gradientes como complemento
4. **Glow, no drop shadow** — Las sombras simulan luz emitida, con el color del acento ámbar
5. **Hover revela, no reemplaza** — `::after` pseudo con radial-gradient ámbar aparece en hover sin cambiar estructura
6. **Tipografía tight** — Letter-spacing negativo en headings (`-0.02` a `-0.04em`), weights 600–700 para display
7. **Grids de 1px como separadores** — `background: var(--border); gap: 1px` reemplaza bordes entre cards de cuadrícula
8. **Sutileza en los bordes** — `rgba(255,255,255,0.07)` máximo; nunca blanco opaco

---

## Favicon / Logo
SVG: dos ramas curvas (ámbar `#e8903c` + verde `#7fb069`) con círculo superior ámbar — símbolo de raíz de planta.
