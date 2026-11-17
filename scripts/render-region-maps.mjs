/**
 * Renders the case-study night maps.
 *
 * Coastlines and borders: Natural Earth 1:50m (public domain),
 * https://www.naturalearthdata.com/about/terms-of-use/
 * Place ne_50m_land.geojson and ne_50m_admin_0_countries.geojson in /tmp/ne
 * (or set NE_DIR). City glow, graticule and navy tint are original.
 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { createRequire } from 'module';
import { Resvg } from '@resvg/resvg-js';

const require = createRequire(import.meta.url);
const polygonClipping = require('polygon-clipping');

const NE_DIR = process.env.NE_DIR || '/tmp/ne';
const OUT_DIR = path.resolve('public/illustrations');
const W = 1600;
const H = 900;

const MAPS = [
  {
    file: 'region-us',
    bbox: [-106.8, 25.6, -93.2, 36.8],
    step: 2,
    cities: [
      ['Dallas', 32.7767, -96.797],
      ['Houston', 29.7604, -95.3698],
      ['Austin', 30.2672, -97.7431],
    ],
    context: [
      [29.4241, -98.4936],
      [31.7619, -106.485],
      [27.8006, -97.3964],
    ],
  },
  {
    file: 'region-uk',
    bbox: [-8.6, 49.7, 1.9, 59.2],
    step: 2,
    cities: [
      ['London', 51.5074, -0.1278],
      ['Manchester', 53.4808, -2.2426],
      ['Edinburgh', 55.9533, -3.1883],
    ],
    context: [
      [52.4862, -1.8904],
      [51.4816, -3.1791],
      [55.8642, -4.2518],
      [53.3498, -6.2603],
    ],
  },
  {
    file: 'region-au',
    bbox: [112.2, -44.2, 154.2, -10.2],
    step: 5,
    cities: [
      ['Sydney', -33.8688, 151.2093],
      ['Perth', -31.9505, 115.8605],
    ],
    context: [
      [-37.8136, 144.9631],
      [-27.4698, 153.0251],
      [-34.9285, 138.6007],
      [-12.4634, 130.8456],
    ],
  },
  {
    file: 'region-eu',
    bbox: [1.4, 48.6, 11.6, 54.2],
    step: 1,
    cities: [
      ['Amsterdam', 52.3676, 4.9041],
      ['Brussels', 50.8503, 4.3517],
      ['Frankfurt', 50.1109, 8.6821],
    ],
    context: [
      [51.9244, 4.4777],
      [50.9375, 6.9603],
      [53.5511, 9.9937],
      [51.2277, 6.7735],
    ],
  },
];

function load(name) {
  return JSON.parse(fs.readFileSync(path.join(NE_DIR, name), 'utf8'));
}

function ringBox(ring) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of ring) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return [minX, minY, maxX, maxY];
}

function boxesOverlap(a, b) {
  return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];
}

function ringsOf(geometry) {
  if (!geometry) return [];
  if (geometry.type === 'Polygon') return geometry.coordinates;
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.flat();
  return [];
}

function project(bbox) {
  const [minX, minY, maxX, maxY] = bbox;
  const pad = 28;
  return (lon, lat) => {
    const x = pad + ((lon - minX) / (maxX - minX)) * (W - pad * 2);
    const y = pad + ((maxY - lat) / (maxY - minY)) * (H - pad * 2);
    return [x, y];
  };
}

function pathOf(ring, projectPoint, close = true) {
  return ring
    .map(([lon, lat], index) => {
      const [x, y] = projectPoint(lon, lat);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join('') + (close ? 'Z' : '');
}

function asPolygons(geometry) {
  if (!geometry) return [];
  if (geometry.type === 'Polygon') return [geometry.coordinates];
  if (geometry.type === 'MultiPolygon') return geometry.coordinates;
  return [];
}

function onBound(point, bbox) {
  const [minX, minY, maxX, maxY] = bbox;
  const eps = 1e-7;
  return Math.abs(point[0] - minX) < eps || Math.abs(point[0] - maxX) < eps || Math.abs(point[1] - minY) < eps || Math.abs(point[1] - maxY) < eps;
}

function coastLines(rings, bbox) {
  const lines = [];
  for (const ring of rings) {
    let current = [];
    for (let i = 0; i < ring.length - 1; i += 1) {
      const a = ring[i];
      const b = ring[i + 1];
      if (onBound(a, bbox) && onBound(b, bbox)) {
        if (current.length > 1) lines.push(current);
        current = [];
      } else {
        if (!current.length) current.push(a);
        current.push(b);
      }
    }
    if (current.length > 1) lines.push(current);
  }
  return lines;
}

function collect(features, bbox) {
  const [minX, minY, maxX, maxY] = bbox;
  const rect = [[[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY], [minX, minY]]];
  const paths = [];
  for (const feature of features) {
    const polygons = asPolygons(feature.geometry);
    if (!polygons.some((poly) => boxesOverlap(ringBox(poly[0]), bbox))) continue;
    let clipped;
    try {
      clipped = polygonClipping.intersection(polygons, rect);
    } catch (error) {
      continue;
    }
    for (const polygon of clipped) {
      for (const ring of polygon) {
        if (ring.length > 2) paths.push(ring);
      }
    }
  }
  return paths;
}

function svgFor(map, land, countries) {
  const projectPoint = project(map.bbox);
  const landRings = collect(land.features, map.bbox);
  const borderRings = collect(countries.features, map.bbox);
  const landPaths = landRings.map((ring) => pathOf(ring, projectPoint)).join('');
  const coastPaths = coastLines(landRings, map.bbox).map((line) => pathOf(line, projectPoint, false)).join('');
  const borderPaths = coastLines(borderRings, map.bbox).map((line) => pathOf(line, projectPoint, false)).join('');
  const [minX, minY, maxX, maxY] = map.bbox;
  const lines = [];
  for (let lon = Math.ceil(minX / map.step) * map.step; lon < maxX; lon += map.step) {
    const [x1, y1] = projectPoint(lon, minY);
    const [x2, y2] = projectPoint(lon, maxY);
    lines.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`);
  }
  for (let lat = Math.ceil(minY / map.step) * map.step; lat < maxY; lat += map.step) {
    const [x1, y1] = projectPoint(minX, lat);
    const [x2, y2] = projectPoint(maxX, lat);
    lines.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`);
  }
  const glow = (lat, lon, radius, opacity) => {
    const [x, y] = projectPoint(lon, lat);
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius}" fill="#1F6FEB" opacity="${opacity}"/>`;
  };
  const label = (name, lat, lon) => {
    const [x, y] = projectPoint(lon, lat);
    return `<g><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" fill="#E7F0FF"/><text x="${(x + 10).toFixed(1)}" y="${(y - 8).toFixed(1)}" fill="#D5E4FA" font-family="Inter" font-size="22" font-weight="600">${name}</text></g>`;
  };
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="sea" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="#0c2344"/>
      <stop offset="100%" stop-color="#050c16"/>
    </radialGradient>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.04  0 0 0 0 0.1  0 0 0 0 0.22  0 0 0 0.22 0"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sea)"/>
  <g filter="url(#grain)" opacity="0.28"><rect width="${W}" height="${H}"/></g>
  <g fill="#1a4e86">
    <path d="${landPaths}"/>
  </g>
  <g fill="none" stroke="#7eb6ff" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
    <path d="${coastPaths}"/>
  </g>
  <g fill="none" stroke="#d7e6ff" stroke-width="0.8" opacity="0.55" stroke-linejoin="round">
    <path d="${borderPaths}"/>
  </g>
  <g stroke="#1F6FEB" stroke-width="0.6" opacity="0.22">${lines.join('')}</g>
  <g filter="url(#soft)">${map.context.map(([lat, lon]) => glow(lat, lon, 16, 0.28)).join('')}${map.cities.map(([, lat, lon]) => glow(lat, lon, 28, 0.7)).join('')}</g>
  ${map.cities.map(([name, lat, lon]) => label(name, lat, lon)).join('')}
</svg>`;
}

const land = load('land.geojson');
const countries = load('countries.geojson');
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const map of MAPS) {
  const svg = svgFor(map, land, countries);
  const pngPath = path.join('/tmp/ne', `${map.file}.png`);
  const webpPath = path.join(OUT_DIR, `${map.file}.webp`);
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: W },
    font: {
      fontFiles: [
        '/usr/share/fonts/truetype/macos/Inter-SemiBold.ttf',
        '/usr/share/fonts/truetype/macos/Inter-Regular.ttf',
      ],
      loadSystemFonts: false,
      defaultFontFamily: 'Inter',
    },
  });
  fs.writeFileSync(pngPath, resvg.render().asPng());
  const converted = spawnSync('ffmpeg', ['-y', '-i', pngPath, '-c:v', 'libwebp', '-quality', '82', webpPath], { stdio: 'ignore' });
  if (converted.status !== 0) process.exit(converted.status || 1);
  const size = fs.statSync(webpPath).size;
  console.log(map.file, size);
}
