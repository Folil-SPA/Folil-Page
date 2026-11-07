import * as THREE from "three";
import { createChileGeography, clamp, mix, smooth, seededRandom, type ChileGeoJSON, type ParticleData } from "./chile-geography";
import { SANTIAGO, MAX_SIGNALS, SIGNAL_TRAIL, createChileRoutes, routePoint } from "./chile-routes";

const vertexShader = /* glsl */`
  attribute vec4 aData;
  attribute float aTone;
  uniform float uTime, uDpr, uSize, uOpacity;
  varying float vAlpha, vTone;
  void main() {
    vec3 p = position;
    p.z += sin(p.y * 60.0 + uTime * .6 + aData.z * 6.28) * .0005 * (1.0 - step(1.5, aData.w));
    vAlpha = aData.y * uOpacity * (.82 + .18 * sin(uTime * .8 + aData.z * 6.28));
    vTone = aTone;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = max(1.0, aData.x * uSize * uDpr);
  }
`;
const fragmentShader = /* glsl */`
  uniform float uSoft, uGain;
  varying float vAlpha, vTone;
  void main() {
    vec2 uv = gl_PointCoord - .5;
    float d = length(uv);
    if (d > .5) discard;
    vec3 amber = vec3(.96, .51, .19);
    vec3 ivory = vec3(1.0, .91, .70);
    vec3 sage = vec3(.48, .78, .37);
    vec3 color = vTone < .6 ? mix(amber, ivory, vTone / .6) : mix(amber, sage, (vTone - .6) / .4);
    float light = exp(-d * d * uSoft) * smoothstep(.5, .32, d);
    gl_FragColor = vec4(color * uGain, light * vAlpha);
  }
`;
const bokehFragment = /* glsl */`
  varying float vAlpha, vTone;
  void main() {
    float d = length(gl_PointCoord - .5);
    if (d > .5) discard;
    float center = exp(-d*d*8.0);
    float rim = exp(-pow((d-.36)*20.0, 2.0)) * .35;
    float alpha = (center*.55 + rim) * smoothstep(.5,.35,d);
    vec3 color = mix(vec3(.75,.39,.12),vec3(.35,.63,.28),vTone);
    gl_FragColor = vec4(color, alpha * vAlpha);
  }
`;

export interface SceneOptions {
  host: HTMLDivElement;
  label: HTMLDivElement;
  caption: HTMLDivElement;
  data: ChileGeoJSON;
  onReady: () => void;
  onFailure: () => void;
}

/** One persistent scene: land, cities and impulses share geographic coordinates.
 * All per-frame work stays outside React. Geometry is sampled only once.
 */
export function mountChileScene({ host, label, caption, data, onReady, onFailure }: SceneOptions) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
  renderer.setClearColor(0x090a08, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  host.prepend(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 3000);
  camera.position.z = 1000;
  const root = new THREE.Group();
  scene.add(root);
  const mobileAtStart = window.innerWidth <= 760;
  const geography = createChileGeography(data);
  const graph = createChileRoutes(geography);
  const materials: THREE.ShaderMaterial[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const random = seededRandom(301);
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduced = motion.matches, disposed = false, failed = false;
  let width = 1, height = 1, dpr = 1, frame = 0, last = 0, elapsed = 0;
  let scrollDirty = true, resizeDirty = true, slowFrames = 0, adaptive = false;
  let nextIdle = 1.1, lastPick = -2;
  let labelTimeout = 0;
  let targetX = 0, targetY = 0, targetScale = 1, targetAngle = -.55, targetAlpha = 1;
  let currentX = 0, currentY = 0, currentScale = 1, currentAngle = -.55, currentAlpha = 1;
  const pointer = { x: 0, y: 0 };
  const smoothPointer = { x: 0, y: 0 };
  const projectedCities = graph.cities.map(() => new THREE.Vector3());
  const vector = new THREE.Vector3();
  const slot = document.querySelector<HTMLElement>(".hero-map-slot");
  const networkSlot = document.querySelector<HTMLElement>(".network-space");
  const hero = document.querySelector<HTMLElement>("#hero");
  let slotRect: DOMRect | undefined;

  function geometryFor(particles: ParticleData) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(particles.positions, 3));
    geometry.setAttribute("aData", new THREE.BufferAttribute(particles.attributes, 4));
    geometry.setAttribute("aTone", new THREE.BufferAttribute(particles.tones, 1));
    geometries.push(geometry);
    return geometry;
  }
  function material(size: number, soft: number, gain = 1, bokeh = false) {
    const result = new THREE.ShaderMaterial({
      vertexShader, fragmentShader: bokeh ? bokehFragment : fragmentShader,
      uniforms: { uTime: { value: 0 }, uDpr: { value: 1 }, uSize: { value: size },
        uOpacity: { value: 1 }, uSoft: { value: soft }, uGain: { value: gain } },
      transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending,
    });
    materials.push(result);
    return result;
  }
  function points(geometry: THREE.BufferGeometry, shader: THREE.ShaderMaterial) {
    const cloud = new THREE.Points(geometry, shader);
    cloud.frustumCulled = false;
    root.add(cloud);
    return cloud;
  }

  const land = geography.sample(mobileAtStart ? 5600 : 10500, mobileAtStart ? 1500 : 2800);
  const landGeometry = geometryFor(land);
  // A shuffled index preserves both coastline and interior when reducing density.
  const landCount = land.positions.length / 3;
  const landIndices = Array.from({ length: landCount }, (_, i) => i);
  const shuffle = seededRandom(2106);
  for (let i = landCount - 1; i > 0; i--) {
    const j = Math.floor(shuffle() * (i + 1));
    [landIndices[i], landIndices[j]] = [landIndices[j], landIndices[i]];
  }
  landGeometry.setIndex(landIndices);
  const landMaterial = material(1.65, 18, 1.2);
  points(landGeometry, landMaterial);
  const landGlowMaterial = material(5.5, 14, .28);
  points(landGeometry, landGlowMaterial);
  const arcMaterial = material(1.65, 12, 1.4);
  points(geometryFor(graph.particles), arcMaterial);

  const bokehCount = mobileAtStart ? 22 : 50;
  const bokehData: ParticleData = { positions: new Float32Array(bokehCount * 3), attributes: new Float32Array(bokehCount * 4), tones: new Float32Array(bokehCount) };
  for (let i = 0; i < bokehCount; i++) {
    bokehData.positions.set([(random() - .5) * .75, (random() - .5) * 1.2, -.12 - random() * .2], i * 3);
    bokehData.attributes.set([12 + random() * 42, .09 + random() * .2, random(), 2], i * 4);
    bokehData.tones[i] = random();
  }
  const bokehGeometry = geometryFor(bokehData);
  const bokehMaterial = material(1, 0, 1, true);
  points(bokehGeometry, bokehMaterial);

  const nodeData: ParticleData = {
    positions: new Float32Array(graph.cities[SANTIAGO]),
    attributes: new Float32Array(4),
    tones: new Float32Array([.99]),
  };
  const nodeGeometry = geometryFor(nodeData);
  points(nodeGeometry, material(1, 20, 1.8));
  const nodeHalo = material(7, 20, .55);
  points(nodeGeometry, nodeHalo);

  const focalData: ParticleData = {
    positions: new Float32Array(graph.cities[SANTIAGO]),
    attributes: new Float32Array([92, .3, 0, 2]),
    tones: new Float32Array([.99]),
  };
  const focalGeometry = geometryFor(focalData);
  points(focalGeometry, material(1, 24, 1));

  const signalData: ParticleData = {
    positions: new Float32Array(MAX_SIGNALS * SIGNAL_TRAIL * 3),
    attributes: new Float32Array(MAX_SIGNALS * SIGNAL_TRAIL * 4),
    tones: new Float32Array(MAX_SIGNALS * SIGNAL_TRAIL),
  };
  signalData.tones.fill(.98);
  const signalGeometry = geometryFor(signalData);
  (signalGeometry.getAttribute("position") as THREE.BufferAttribute).setUsage(THREE.DynamicDrawUsage);
  (signalGeometry.getAttribute("aData") as THREE.BufferAttribute).setUsage(THREE.DynamicDrawUsage);
  points(signalGeometry, material(2.8, 16, 1.4));
  points(signalGeometry, material(8, 22, .35));

  function measure() {
    if (resizeDirty) {
      width = window.innerWidth; height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, adaptive ? 1 : 1.75);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height);
      camera.left = -width / 2; camera.right = width / 2;
      camera.top = height / 2; camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
      for (const m of materials) m.uniforms.uDpr.value = dpr;
      resizeDirty = false;
    }
    if (!slot || !hero) return;
    slotRect = slot.getBoundingClientRect();
    const heroRect = hero.getBoundingClientRect();
    const mobile = width <= 760;
    const transition = smooth(clamp(-heroRect.top / Math.max(1, heroRect.height * .9)));
    const heroAngle = mobile ? -.91 : -.56;
    const heroScale = Math.min(slotRect.width / (mobile ? .94 : .73), slotRect.height / (mobile ? .74 : .96));
    const band = networkSlot?.getBoundingClientRect();
    const bandVisible = band && band.top < height && band.bottom > 0;
    const lowerScale = bandVisible ? Math.min(band.width / 1.13, band.height / .27) : width * .77;
    const lowerX = bandVisible ? band.left + band.width / 2 : width / 2;
    const lowerY = bandVisible ? band.top + band.height / 2 : height * .67;
    targetX = mix(slotRect.left + slotRect.width / 2, lowerX, transition) - width / 2;
    targetY = height / 2 - mix(slotRect.top + slotRect.height / 2, lowerY, transition);
    targetScale = mix(heroScale, lowerScale, transition);
    targetAngle = mix(heroAngle, -1.43, transition);
    targetAlpha = mix(1, bandVisible ? .78 : .15, transition);
    caption.style.opacity = String(1 - transition);
    caption.style.visibility = transition < .85 ? "visible" : "hidden";
    caption.style.left = Math.max(24, Math.min(width - 230, slotRect.left + slotRect.width * .44)) + "px";
    caption.style.top = Math.min(height - 34, slotRect.bottom - 6) + "px";
    host.dataset.motion = reduced ? "reduced" : "animated";
    scrollDirty = false;
  }

  function projectCities() {
    root.updateMatrixWorld();
    for (let i = 0; i < graph.cities.length; i++) {
      const p = graph.cities[i];
      vector.set(p[0], p[1], p[2]).applyMatrix4(root.matrixWorld).project(camera);
      projectedCities[i].set((vector.x + 1) * width / 2, (1 - vector.y) * height / 2, vector.z);
    }
  }
  function activate(index: number, showLabel: boolean) {
    graph.activate(index);
    if (showLabel) {
      // Santiago is the only named, marked and interactive location.
      label.dataset.active = "true";
      window.clearTimeout(labelTimeout);
      labelTimeout = window.setTimeout(() => { label.dataset.active = "false"; }, 1500);
    }
    requestFrame();
  }
  function onPointer(event: PointerEvent) {
    if (event.target instanceof Element && event.target.closest("a, button, input, textarea, select, .site-menu")) return;
    pointer.x = clamp(event.clientX / width * 2 - 1, -1, 1);
    pointer.y = clamp(event.clientY / height * 2 - 1, -1, 1);
    const pointerTime = performance.now() / 1000;
    if (pointerTime - lastPick < .35 && event.type !== "pointerdown") return;
    const santiago = projectedCities[SANTIAGO];
    const distance = Math.hypot(santiago.x - event.clientX, santiago.y - event.clientY);
    if (distance < (event.pointerType === "touch" ? 50 : 36)) {
      lastPick = pointerTime;
      activate(SANTIAGO, true);
    }
  }
  function onKeyboard() {
    activate(SANTIAGO, true);
  }
  function onScroll() { scrollDirty = true; requestFrame(); }
  function onResize() { resizeDirty = true; scrollDirty = true; requestFrame(); }
  function onMotion() {
    reduced = motion.matches;
    graph.clear();
    last = 0;
    scrollDirty = true;
    requestFrame();
  }
  function onVisibility() {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; last = 0; }
    else requestFrame();
  }
  function onLost(event: Event) {
    event.preventDefault();
    failed = true;
    cancelAnimationFrame(frame); frame = 0;
    canvas.style.opacity = "0";
    onFailure();
  }
  function requestFrame() {
    if (!disposed && !failed && !frame && !document.hidden) frame = requestAnimationFrame(render);
  }
  function render(now: number) {
    frame = 0;
    if (disposed || failed) return;
    const rawDelta = last ? (now - last) / 1000 : 1 / 60;
    const dt = clamp(rawDelta, .001, .05);
    last = now; elapsed += dt;
    if (!adaptive && rawDelta > .029 && rawDelta < .2) slowFrames++;
    else slowFrames = Math.max(0, slowFrames - 1);
    if (slowFrames > 100) { adaptive = true; resizeDirty = true; scrollDirty = true; }
    if (scrollDirty) measure();
    const ease = reduced ? 1 : 1 - Math.exp(-dt * 8);
    currentX = mix(currentX, targetX, ease);
    currentY = mix(currentY, targetY, ease);
    currentScale = mix(currentScale, targetScale, ease);
    currentAngle = mix(currentAngle, targetAngle, ease);
    currentAlpha = mix(currentAlpha, targetAlpha, ease);
    smoothPointer.x = mix(smoothPointer.x, pointer.x, ease * .3);
    smoothPointer.y = mix(smoothPointer.y, pointer.y, ease * .3);
    root.position.set(currentX, currentY, 0);
    root.scale.setScalar(currentScale);
    root.rotation.set(reduced ? .2 : .2 + smoothPointer.y * .07, reduced ? 0 : smoothPointer.x * .10 + Math.sin(elapsed * .13) * .035, currentAngle);
    graph.update(dt, !reduced);
    if (!reduced && elapsed > nextIdle) {
      activate(Math.floor(random() * graph.cities.length), false);
      nextIdle = elapsed + 2.4 + random() * 2;
    }
    for (const m of materials) {
      m.uniforms.uTime.value = reduced ? 0 : elapsed;
      m.uniforms.uOpacity.value = currentAlpha;
    }
    // Preserve particle separation when the same scene shrinks to a phone.
    // Constant pixel-sized sprites would overlap and wash the country out.
    const detailScale = clamp(currentScale / 740, .4, 1.15);
    landGeometry.setDrawRange(0, Math.min(landCount, Math.round(13300 * Math.pow(Math.min(1, detailScale), 1.6))));
    landMaterial.uniforms.uSize.value = 1.65 * detailScale;
    landGlowMaterial.uniforms.uSize.value = 5.5 * detailScale;
    arcMaterial.uniforms.uSize.value = 1.65 * Math.max(.65, detailScale);
    bokehMaterial.uniforms.uSize.value = Math.max(.5, detailScale);
    nodeData.attributes.set([9 + graph.flare * 5, .95, .4, 2]);
    nodeGeometry.getAttribute("aData").needsUpdate = true;
    focalData.attributes[0] = (width < 760 ? 65 : 100) + graph.flare * 65;
    focalData.attributes[1] = .32 + graph.flare * .4;
    focalGeometry.getAttribute("aData").needsUpdate = true;

    let offset = 0;
    for (const signal of graph.signals) {
      const route = graph.routes[signal.route];
      for (let tail = 0; tail < SIGNAL_TRAIL; tail++) {
        const progress = Math.max(0, signal.progress - tail * .012);
        routePoint(route, route.from === signal.from ? progress : 1 - progress, signalData.positions, offset * 3);
        signalData.attributes.set([1 - tail / SIGNAL_TRAIL * .7, signal.energy * (1 - tail / SIGNAL_TRAIL), tail / SIGNAL_TRAIL, 2], offset * 4);
        offset++;
      }
    }
    signalGeometry.setDrawRange(0, offset);
    signalGeometry.getAttribute("position").needsUpdate = true;
    signalGeometry.getAttribute("aData").needsUpdate = true;
    projectCities();
    const santiago = projectedCities[SANTIAGO];
    label.style.transform = "translate(" + clamp(santiago.x + 16, 12, width - 110) + "px," + clamp(santiago.y - 30, 90, height - 42) + "px)";
    label.dataset.visible = currentAlpha > .4 ? "true" : "false";
    renderer.render(scene, camera);
    if (!reduced) requestFrame();
  }

  measure();
  label.textContent = "Santiago";
  label.dataset.city = "Santiago";
  currentX = targetX; currentY = targetY; currentScale = targetScale; currentAngle = targetAngle;
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("pointerdown", onPointer, { passive: true });
  window.addEventListener("folil:santiago", onKeyboard);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);
  motion.addEventListener("change", onMotion);
  canvas.addEventListener("webglcontextlost", onLost);
  const resizeObserver = new ResizeObserver(onResize);
  if (hero) resizeObserver.observe(hero);
  if (networkSlot) resizeObserver.observe(networkSlot);
  onReady();
  requestFrame();

  return () => {
    disposed = true;
    window.clearTimeout(labelTimeout);
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("pointerdown", onPointer);
    window.removeEventListener("folil:santiago", onKeyboard);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    motion.removeEventListener("change", onMotion);
    canvas.removeEventListener("webglcontextlost", onLost);
    geometries.forEach(g => g.dispose());
    materials.forEach(m => m.dispose());
    renderer.dispose();
    canvas.remove();
  };
}

