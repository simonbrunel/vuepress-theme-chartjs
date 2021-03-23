function fallback(/* values ... */) {
  const ilen = arguments.length;
  for (let i = 0; i < ilen; ++i) {
    const v = arguments[i];
    if (v !== undefined) {
      return v;
    }
  }
}

const Color = typeof window !== 'undefined' ? window.Color : {};

export const COLORS = [
  '#FF3784',
  '#36A2EB',
  '#4BC0C0',
  '#F77825',
  '#9966FF',
  '#00A8C6',
  '#379F7A',
  '#CC2738',
  '#8B628A',
  '#8FBE00',
  '#606060',
];

// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
let _seed = Date.now();

export function srand(seed) {
  _seed = seed;
}

export function rand(min, max) {
  min = min === undefined ? 0 : min;
  max = max === undefined ? 1 : max;
  _seed = (_seed * 9301 + 49297) % 233280;
  return min + (_seed / 233280) * (max - min);
}

export function numbers(config) {
  const cfg = config || {};
  const min = fallback(cfg.min, 0);
  const max = fallback(cfg.max, 1);
  const from = fallback(cfg.from, []);
  const count = fallback(cfg.count, 8);
  const decimals = fallback(cfg.decimals, 8);
  const continuity = fallback(cfg.continuity, 1);
  const dfactor = Math.pow(10, decimals) || 0;
  const data = [];

  for (let i = 0; i < count; ++i) {
    const value = (from[i] || 0) + this.rand(min, max);
    if (this.rand() <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor);
    } else {
      data.push(null);
    }
  }

  return data;
}

export function color(offset) {
  const count = COLORS.length;
  const index = offset === undefined ? ~~rand(0, count) : offset;
  return COLORS[index % count];
}

export function colors(config) {
  const cfg = config || {};
  const c = cfg.color || color(0);
  const count = cfg.count !== undefined ? cfg.count : 8;
  const method = cfg.mode ? Color.prototype[cfg.mode] : null;
  const values = [];

  for (let i = 0; i < count; ++i) {
    const f = i / count;
    const v = method ?
      method.call(Color(c), f).rgbString() :
      color(i);

    values.push(v);
  }

  return values;
}

export function transparentize(c, opacity) {
  const alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return Color(c).alpha(alpha).rgbString();
}
