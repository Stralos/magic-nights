export const hex1 = [
  { q: 1, r: -1, s: 0 },
  { q: -1, r: 1, s: 0 },
  { q: 0, r: -1, s: 0 },
  { q: -1, r: 0, s: 0 },
  { q: 0, r: 0, s: 0 },
  { q: 1, r: 0, s: 0 },
  { q: 0, r: 1, s: 0 },
];

export const hex2 = [
  { q: 0, r: -2, s: 0 },
  { q: 1, r: -2, s: 0 },
  { q: 0, r: -3, s: 0 },
  { q: 1, r: -3, s: 0 },
  { q: 2, r: -3, s: 0 },
  { q: 1, r: -4, s: 0 },
  { q: 2, r: -4, s: 0 },
];

export const hex3 = [
  { q: 2, r: -1, s: 0 },
  { q: 3, r: -1, s: 0 },
  { q: 2, r: -2, s: 0 },
  { q: 3, r: -2, s: 0 },
  { q: 4, r: -2, s: 0 },
  { q: 4, r: -3, s: 0 },
  { q: 3, r: -3, s: 0 },
];

export const map = [
  ...hex1, ...hex2, ...hex3,
];
