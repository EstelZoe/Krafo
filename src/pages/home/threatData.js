// Threat-map data only. No imports, rendering, or runtime logic.
// All coordinates use the [longitude, latitude] format.

export const CITIES = {
  // African destinations
  accra: [-0.19, 5.60],
  lagos: [3.38, 6.52],
  nairobi: [36.82, -1.29],
  johannesburg: [28.05, -26.20],
  cairo: [31.24, 30.04],
  kinshasa: [15.27, -4.44],
  addisAbaba: [38.74, 9.03],
  dakar: [-17.45, 14.69],
  casablanca: [-7.59, 33.57],
  abuja: [7.49, 9.07],
  kampala: [32.58, 0.35],
  darEsSalaam: [39.21, -6.79],
  capeTown: [18.42, -33.93],
  tunis: [10.18, 36.81],

  // Illustrative global source points
  london: [-0.13, 51.51],
  newYork: [-74.01, 40.71],
  moscow: [37.62, 55.75],
  beijing: [116.41, 39.90],
  saoPaulo: [-46.63, -23.55],
  dubai: [55.27, 25.20],
  mumbai: [72.88, 19.08],
  singapore: [103.82, 1.35],
  frankfurt: [8.68, 50.11],
  istanbul: [28.98, 41.01],
  toronto: [-79.38, 43.65],
  sydney: [151.21, -33.87],
  tokyo: [139.69, 35.68],
  sanFrancisco: [-122.42, 37.77],
};

// These are illustrative visual paths, not live threat telemetry.
export const ARCS = [
  { from: "london", to: "accra", delay: 0.4 },
  { from: "newYork", to: "lagos", delay: 1.2 },
  { from: "moscow", to: "cairo", delay: 2.1 },
  { from: "beijing", to: "nairobi", delay: 3.0 },
  { from: "saoPaulo", to: "kinshasa", delay: 4.2 },
  { from: "dubai", to: "addisAbaba", delay: 5.1 },
  { from: "mumbai", to: "darEsSalaam", delay: 1.8 },
  { from: "singapore", to: "kampala", delay: 2.7 },
  { from: "frankfurt", to: "casablanca", delay: 4.8 },
  { from: "istanbul", to: "tunis", delay: 0.9 },
  { from: "toronto", to: "dakar", delay: 3.6 },
  { from: "tokyo", to: "johannesburg", delay: 5.7 },
  { from: "sanFrancisco", to: "capeTown", delay: 1.5 },
  { from: "london", to: "abuja", delay: 2.5 },
  { from: "newYork", to: "nairobi", delay: 4.0 },
  { from: "moscow", to: "addisAbaba", delay: 5.4 },
  { from: "beijing", to: "lagos", delay: 0.7 },
  { from: "dubai", to: "johannesburg", delay: 3.3 },
  { from: "frankfurt", to: "accra", delay: 4.5 },
  { from: "saoPaulo", to: "capeTown", delay: 5.9 },
];

// Approximate equirectangular land-outline dots for a decorative canvas map.
// These points are intentionally low-resolution and are not GIS boundaries.
export const LAND_DOTS = [
  // North America
  [-168, 64], [-155, 70], [-140, 70], [-128, 58], [-124, 48], [-117, 33],
  [-105, 25], [-96, 20], [-86, 26], [-82, 30], [-76, 39], [-67, 45],
  [-60, 52], [-55, 62], [-78, 68], [-105, 73], [-135, 72],
  // South America
  [-81, 10], [-75, 2], [-70, -8], [-66, -20], [-60, -32], [-54, -45],
  [-48, -53], [-42, -35], [-38, -20], [-42, -5], [-50, 5], [-62, 10],
  [-72, 12],
  // Europe
  [-11, 36], [-5, 43], [3, 44], [12, 42], [20, 45], [28, 54], [38, 58],
  [30, 66], [16, 70], [5, 62], [-5, 58], [-10, 50],
  // Asia and the Middle East
  [28, 40], [42, 38], [52, 42], [64, 48], [76, 54], [90, 58], [105, 62],
  [120, 58], [135, 52], [150, 58], [165, 62], [175, 52], [165, 42],
  [150, 35], [135, 30], [122, 22], [110, 18], [98, 12], [85, 8],
  [72, 8], [60, 18], [48, 24], [38, 28], [30, 34],
  // India and Southeast Asia
  [78, 30], [82, 22], [88, 15], [94, 8], [100, 5], [106, 10], [112, 18],
  [120, 12], [126, 5], [118, -2], [108, -6], [100, -4], [92, 2],
  // Africa: west coast to north, east coast, and south
  [-17, 15], [-12, 22], [-5, 30], [5, 36], [16, 34], [25, 32], [33, 30],
  [38, 22], [44, 12], [49, 3], [47, -8], [42, -18], [36, -28], [28, -35],
  [18, -34], [11, -28], [7, -18], [2, -8], [-5, 2], [-12, 8],
  // Madagascar and nearby islands
  [49, -13], [50, -21], [47, -27], [44, -19],
  // Australia
  [114, -14], [126, -12], [140, -14], [153, -22], [150, -32], [140, -38],
  [128, -35], [116, -30], [112, -22],
  // Greenland and polar hints
  [-45, 60], [-42, 72], [-35, 80], [-20, 82], [-15, 72],
  // Japan, New Zealand, and island accents
  [138, 38], [144, 34], [146, 40], [142, 44], [170, -35], [176, -42],
  [166, -46],
];
