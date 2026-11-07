/** Geographic coordinates are Natural Earth public-domain data, not a traced illustration.
 * Relief is an art-directed approximation of the Andes, not measured elevation.
 * A single sinusoidal projection is shared by the land, cities, arcs and fallback.
 */
export type XY = readonly [number, number];
export type XYZ = readonly [number, number, number];

export interface ChileGeoJSON {
  type: "Feature";
  geometry: { type: "MultiPolygon"; coordinates: number[][][][] };
}

export interface ParticleData {
  positions: Float32Array;
  /** Pixel size, opacity, random phase, layer (land=0, coast=1, arc=2). */
  attributes: Float32Array;
  tones: Float32Array;
}

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (v: number) => { const t = clamp(v); return t * t * (3 - 2 * t); };

export function seededRandom(seed = 17037) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function lowerBound(cdf: number[], target: number) {
  let low = 0, high = cdf.length - 1;
  while (low < high) {
    const middle = (low + high) >>> 1;
    if (cdf[middle] < target) low = middle + 1;
    else high = middle;
  }
  return low;
}

export function isChileGeoJSON(value: unknown): value is ChileGeoJSON {
  if (!value || typeof value !== "object") return false;
  const item = value as ChileGeoJSON;
  return item.type === "Feature" && item.geometry?.type === "MultiPolygon"
    && Array.isArray(item.geometry.coordinates) && item.geometry.coordinates.length > 0
    && item.geometry.coordinates.every(polygon => Array.isArray(polygon) && polygon.length > 0
      && polygon.every(ring => Array.isArray(ring) && ring.length >= 4
        && ring.every(p => Array.isArray(p) && p.length >= 2
          && Number.isFinite(p[0]) && Number.isFinite(p[1])
          && p[0] > -77 && p[0] < -66 && p[1] > -57 && p[1] < -17)));
}

export function createChileGeography(data: ChileGeoJSON) {
  if (!isChileGeoJSON(data)) throw new Error("Invalid Chile geometry");
  const coordinates = data.geometry.coordinates;
  let north = -90, south = 90;
  for (const polygon of coordinates) for (const ring of polygon) for (const p of ring) {
    north = Math.max(north, p[1]); south = Math.min(south, p[1]);
  }
  const span = north - south, centerLatitude = (north + south) / 2;
  const project = (longitude: number, latitude: number): XY => [
    (longitude + 71) * Math.cos(latitude * Math.PI / 180) / span,
    (latitude - centerLatitude) / span,
  ];
  const rings = coordinates.flatMap(polygon => polygon.map(ring => ring.map(p => project(p[0], p[1]))));
  let west = Infinity, east = -Infinity;
  for (const ring of rings) for (const p of ring) {
    west = Math.min(west, p[0]); east = Math.max(east, p[0]);
  }

  // Scan-line area sampling keeps the fjords and holes empty, without per-frame CPU work.
  const resolution = 1800;
  const crossings: number[][] = Array.from({ length: resolution }, () => []);
  for (const ring of rings) for (let i = 1; i < ring.length; i++) {
    const a = ring[i - 1], b = ring[i];
    if (Math.abs(a[1] - b[1]) < 1e-9) continue;
    const start = Math.max(0, Math.ceil((Math.min(a[1], b[1]) + .5) * resolution - .5));
    const end = Math.min(resolution, Math.ceil((Math.max(a[1], b[1]) + .5) * resolution - .5));
    for (let row = start; row < end; row++) {
      const y = (row + .5) / resolution - .5;
      crossings[row].push(a[0] + (y - a[1]) / (b[1] - a[1]) * (b[0] - a[0]));
    }
  }
  const rowCDF: number[] = [], rowWidths: number[] = [];
  let area = 0;
  for (const row of crossings) {
    row.sort((a, b) => a - b);
    let width = 0;
    for (let i = 0; i + 1 < row.length; i += 2) width += row[i + 1] - row[i];
    rowWidths.push(width); area += width; rowCDF.push(area);
  }
  if (area <= 0) throw new Error("Empty Chile geometry");

  const heightAt = (x: number, y: number) => {
    const index = clamp(Math.floor((y + .5) * resolution), 0, resolution - 1);
    const row = crossings[index];
    if (row.length < 2) return 0;
    const across = clamp((x - row[0]) / Math.max(.001, row[row.length - 1] - row[0]));
    const along = .5 - y;
    const mountain = Math.exp(-Math.pow((across - .84) / .2, 2));
    const coast = .22 * Math.exp(-Math.pow((across - .17) / .13, 2));
    const ridge = .78 + .15 * Math.sin(y * 127 + x * 94) + .07 * Math.cos(y * 311 - x * 207);
    const southernFalloff = mix(1, .42, smooth((along - .48) / .42));
    return (mountain * ridge + coast) * .025 * southernFalloff;
  };
  const point = (longitude: number, latitude: number): XYZ => {
    const [x, y] = project(longitude, latitude);
    return [x, y, heightAt(x, y)];
  };

  // Coast/island perimeter CDF: each island receives points in proportion to its perimeter.
  const segments: { a: XY; b: XY; length: number }[] = [], perimeterCDF: number[] = [];
  let perimeter = 0;
  for (const ring of rings) for (let i = 1; i < ring.length; i++) {
    const a = ring[i - 1], b = ring[i], length = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (length < 1e-8) continue;
    segments.push({ a, b, length }); perimeter += length; perimeterCDF.push(perimeter);
  }

  function sample(interiorCount: number, coastCount: number): ParticleData {
    const random = seededRandom();
    const count = interiorCount + coastCount;
    const positions = new Float32Array(count * 3), attributes = new Float32Array(count * 4), tones = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      let x: number, y: number;
      const coast = i >= interiorCount;
      if (coast) {
        const distance = random() * perimeter, segmentIndex = lowerBound(perimeterCDF, distance);
        const segment = segments[segmentIndex];
        const t = (distance - (segmentIndex ? perimeterCDF[segmentIndex - 1] : 0)) / segment.length;
        x = mix(segment.a[0], segment.b[0], t); y = mix(segment.a[1], segment.b[1], t);
      } else {
        const rowIndex = lowerBound(rowCDF, random() * area), row = crossings[rowIndex];
        let distance = random() * rowWidths[rowIndex];
        x = row[0];
        for (let j = 0; j + 1 < row.length; j += 2) {
          const width = row[j + 1] - row[j];
          if (distance <= width) { x = row[j] + distance; break; }
          distance -= width;
        }
        y = (rowIndex + .5) / resolution - .5;
      }
      const z = heightAt(x, y), bright = random();
      positions.set([x, y, z + (random() - .5) * .0012], i * 3);
      attributes.set([
        coast ? mix(.85, 1.8, bright) : mix(.7, 1.9, bright * bright),
        coast ? mix(.32, .7, bright) : mix(.16, .58, bright),
        random(), coast ? 1 : 0,
      ], i * 4);
      // Mostly warm amber; occasional sage and ivory bring out the relief.
      tones[i] = random() < .12 ? .72 : mix(.02, .32, z / .026);
    }
    return { positions, attributes, tones };
  }

  return { rings, west, east, north, south, project, point, heightAt, sample };
}

export type ChileGeography = ReturnType<typeof createChileGeography>;
