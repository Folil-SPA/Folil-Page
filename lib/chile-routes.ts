import { clamp, mix, seededRandom, type ChileGeography, type ParticleData, type XYZ } from "./chile-geography";

// Public geographic facts: longitude/latitude, WGS84. The graph is Folil's visual
// metaphor, not a claim about physical infrastructure or customer locations.
export const CHILE_CITIES = [
  { name: "Arica", longitude: -70.3126, latitude: -18.4783 },
  { name: "Iquique", longitude: -70.1431, latitude: -20.2141 },
  { name: "Antofagasta", longitude: -70.4000, latitude: -23.6509 },
  { name: "Copiapó", longitude: -70.3314, latitude: -27.3668 },
  { name: "La Serena", longitude: -71.2489, latitude: -29.9027 },
  { name: "Valparaíso", longitude: -71.6127, latitude: -33.0472 },
  { name: "Santiago", longitude: -70.6498, latitude: -33.4378 },
  { name: "Rancagua", longitude: -70.7397, latitude: -34.1708 },
  { name: "Talca", longitude: -71.6554, latitude: -35.4264 },
  { name: "Concepción", longitude: -73.0498, latitude: -36.8270 },
  { name: "Temuco", longitude: -72.5904, latitude: -38.7359 },
  { name: "Valdivia", longitude: -73.2459, latitude: -39.8142 },
  { name: "Puerto Montt", longitude: -72.9411, latitude: -41.4693 },
  { name: "Coyhaique", longitude: -72.0662, latitude: -45.5712 },
  { name: "Punta Arenas", longitude: -70.9171, latitude: -53.1638 },
] as const;

export const SANTIAGO = 6;
export const MAX_SIGNALS = 36;
export const SIGNAL_TRAIL = 11;

export interface ChileRoute { from: number; to: number; start: XYZ; end: XYZ; control: XYZ; length: number }
export interface Signal { route: number; from: number; to: number; progress: number; duration: number; energy: number; hops: number }

export function routePoint(route: ChileRoute, t: number, output: number[] | Float32Array, offset = 0) {
  const a = 1 - t;
  for (let i = 0; i < 3; i++) output[offset + i] = a * a * route.start[i] + 2 * a * t * route.control[i] + t * t * route.end[i];
}

export function createChileRoutes(geography: ChileGeography) {
  const cities: XYZ[] = CHILE_CITIES.map(city => {
    const [x, y, z] = geography.point(city.longitude, city.latitude);
    return [x, y, z + .005];
  });
  // A connected north/south backbone plus independently chosen regional links.
  const links: [number, number, number][] = [];
  for (let i = 0; i < cities.length - 1; i++) links.push([i, i + 1, i % 3 === 0 ? 1 : -1]);
  links.push([0, 2, -1], [1, 4, 1], [2, 6, -1], [3, 6, 1], [4, 6, -1],
    [6, 8, 1], [6, 9, -1], [8, 10, 1], [10, 12, -1], [11, 13, 1], [12, 14, -1]);
  const routes: ChileRoute[] = links.map(([from, to, side]) => {
    const start = cities[from], end = cities[to];
    const dx = end[0] - start[0], dy = end[1] - start[1], length = Math.hypot(dx, dy);
    let nx = -dy / length, ny = dx / length;
    if (Math.sign(nx) !== side) { nx *= -1; ny *= -1; }
    const bow = Math.min(.26, .02 + length * .75);
    const control: XYZ = [
      (start[0] + end[0]) / 2 + nx * bow,
      (start[1] + end[1]) / 2 + ny * bow,
      Math.max(start[2], end[2]) + .012 + length * .24,
    ];
    return { from, to, start, end, control, length };
  });
  const adjacency: { city: number; route: number }[][] = cities.map(() => []);
  routes.forEach((route, i) => {
    adjacency[route.from].push({ city: route.to, route: i });
    adjacency[route.to].push({ city: route.from, route: i });
  });
  const distance = cities.map(() => Infinity); distance[SANTIAGO] = 0;
  const queue = [SANTIAGO];
  for (let head = 0; head < queue.length; head++) {
    const current = queue[head];
    for (const edge of adjacency[current]) if (!Number.isFinite(distance[edge.city])) {
      distance[edge.city] = distance[current] + 1; queue.push(edge.city);
    }
  }
  const random = seededRandom(973);
  const pointList: number[] = [], attributeList: number[] = [], toneList: number[] = [];
  const p = [0, 0, 0];
  for (const route of routes) {
    const count = Math.round(clamp((route.length + .04) * 650, 16, 210));
    for (let i = 0; i <= count; i++) {
      routePoint(route, i / count, p);
      pointList.push(...p);
      attributeList.push(mix(.8, 1.2, random()), mix(.28, .48, random()), random(), 2);
      toneList.push(.65 + random() * .3);
    }
  }
  // Only Santiago has a visible node; other route endpoints are anonymous flow anchors.
  for (const city of [cities[SANTIAGO]]) for (let branch = 0; branch < 6; branch++) {
    const angle = (branch + random() * .4) / 6 * Math.PI * 2;
    const length = .003 + random() * .006;
    for (let step = 1; step < 5; step++) {
      const t = step / 4;
      pointList.push(city[0] + Math.cos(angle) * length * t, city[1] + Math.sin(angle) * length * t, city[2] + .002 * t);
      attributeList.push(.8, .28 * (1 - t * .55), random(), 2); toneList.push(.8);
    }
  }
  const particles: ParticleData = { positions: new Float32Array(pointList), attributes: new Float32Array(attributeList), tones: new Float32Array(toneList) };
  const activity = new Float32Array(cities.length), refractory = new Float32Array(cities.length);
  refractory.fill(-10);
  const signals: Signal[] = [];
  let now = 0, flare = 0;

  function activate(city: number, energy = 1, hops = 0) {
    if (city < 0 || city >= cities.length || hops > cities.length || now - refractory[city] < .55) return;
    refractory[city] = now; activity[city] = Math.max(activity[city], energy);
    if (city === SANTIAGO) { flare = Math.min(1, flare + energy * .6); return; }
    // Strictly decreasing BFS distance makes loops impossible; fanout and storage are bounded.
    const next = adjacency[city].filter(edge => distance[edge.city] < distance[city]).slice(0, 2);
    for (const edge of next) {
      if (signals.length >= MAX_SIGNALS) break;
      const route = routes[edge.route];
      signals.push({ route: edge.route, from: city, to: edge.city, progress: 0,
        duration: clamp(route.length * 5.8, .42, 1.5), energy, hops });
    }
  }

  function update(dt: number, animate: boolean) {
    now += dt; flare *= Math.exp(-dt * 2.5);
    for (let i = 0; i < activity.length; i++) activity[i] *= Math.exp(-dt * 2.1);
    if (!animate) { signals.length = 0; return; }
    for (let i = signals.length - 1; i >= 0; i--) {
      const signal = signals[i]; signal.progress += dt / signal.duration;
      if (signal.progress >= 1) {
        signals.splice(i, 1); activate(signal.to, signal.energy * .86, signal.hops + 1);
      }
    }
  }

  return { cities, routes, distance, adjacency, particles, activity, signals, activate, update,
    get flare() { return flare; },
    clear() { signals.length = 0; activity.fill(0); refractory.fill(-10); flare = 0; },
  };
}

export type ChileNetworkGraph = ReturnType<typeof createChileRoutes>;
