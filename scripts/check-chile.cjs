/* Behavioral checks for the geographic data and the bounded city-signal graph.
   Uses the project's TypeScript compiler; no browser or additional test framework. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const modules = new Map();
function loadTS(filename) {
  if (modules.has(filename)) return modules.get(filename).exports;
  const result = { exports: {} };
  modules.set(filename, result);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
  }).outputText;
  const execute = vm.runInThisContext("(function(require, module, exports){" + source + "\n})", { filename });
  execute(specifier => specifier.startsWith(".") ? loadTS(path.resolve(path.dirname(filename), specifier + ".ts")) : require(specifier), result, result.exports);
  return result.exports;
}
const { createChileGeography, isChileGeoJSON } = loadTS(path.join(root, "lib/chile-geography.ts"));
const { createChileRoutes, CHILE_CITIES, SANTIAGO, MAX_SIGNALS, routePoint } = loadTS(path.join(root, "lib/chile-routes.ts"));
const { CHILE_FALLBACK_DATA } = loadTS(path.join(root, "lib/chile-fallback-data.ts"));
const detailed = JSON.parse(fs.readFileSync(path.join(root, "public/data/chile-natural-earth.json"), "utf8"));
assert.equal(isChileGeoJSON({ type: "Feature", geometry: { type: "MultiPolygon", coordinates: [] } }), false);

for (const [name, data] of [["detailed", detailed], ["offline fallback", CHILE_FALLBACK_DATA]]) {
  assert.equal(isChileGeoJSON(data), true, name + ": valid data");
  const geography = createChileGeography(data);
  assert.ok(geography.north > -18 && geography.north < -17);
  assert.ok(geography.south < -55 && geography.south > -57);
  const sample = geography.sample(3000, 900);
  assert.equal(sample.positions.length, 3900 * 3);
  assert.deepEqual(sample.positions, geography.sample(3000, 900).positions, "Deterministic geometry");
  for (let i = 0; i < sample.positions.length; i += 3) {
    const [x, y, z] = sample.positions.subarray(i, i + 3);
    assert.ok(Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z));
    assert.ok(x >= geography.west - .00001 && x <= geography.east + .00001);
    assert.ok(y >= -.501 && y <= .501);
    assert.ok(z >= -.001 && z < .04);
  }
  const graph = createChileRoutes(geography);
  assert.equal(graph.cities.length, 15);
  assert.ok(graph.cities[0][1] > graph.cities[14][1], "Arica is north of Punta Arenas");
  assert.equal(graph.distance[SANTIAGO], 0);
  assert.ok(graph.distance.every(Number.isFinite), "Every city is connected to Santiago");
  for (const route of graph.routes) {
    const point = [0, 0, 0];
    routePoint(route, 0, point);
    assert.deepEqual(point, [...graph.cities[route.from]], "Routes begin at their city");
    routePoint(route, 1, point);
    assert.deepEqual(point, [...graph.cities[route.to]], "Routes end at their city");
  }
  for (let origin = 0; origin < CHILE_CITIES.length; origin++) {
    graph.clear();
    graph.activate(origin);
    let reachedSantiago = graph.flare > 0;
    for (let frame = 0; frame < 1200; frame++) {
      graph.update(1 / 120, true);
      if (graph.flare > 0) reachedSantiago = true;
      assert.ok(graph.signals.length <= MAX_SIGNALS, "Bounded work even when signals branch");
      for (const signal of graph.signals) assert.ok(graph.distance[signal.to] < graph.distance[signal.from], "Signals make progress; no cycles");
    }
    assert.ok(reachedSantiago, CHILE_CITIES[origin].name + " reaches Santiago");
    assert.equal(graph.signals.length, 0, "Signals terminate");
  }
  graph.activate(0);
  graph.update(1 / 60, false);
  assert.equal(graph.signals.length, 0, "Reduced motion stops signal travel");
  console.log("PASS: " + name + " — geography, all 15 city paths, bounded propagation, reduced motion");
}

