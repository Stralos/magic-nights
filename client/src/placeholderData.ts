export const hex1 = [
  { q: 1, r: -1 },
  { q: -1, r: 1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: 0, r: 0 },
  { q: 1, r: 0 },
  { q: 0, r: 1 },
];

export const hex2 = [
  { q: 0, r: -2 },
  { q: 1, r: -2 },
  { q: 0, r: -3 },
  { q: 1, r: -3 },
  { q: 2, r: -3 },
  { q: 1, r: -4 },
  { q: 2, r: -4 },
];

export const hex3 = [
  { q: 2, r: -1 },
  { q: 3, r: -1 },
  { q: 2, r: -2 },
  { q: 3, r: -2 },
  { q: 4, r: -2 },
  { q: 4, r: -3 },
  { q: 3, r: -3 },
];

export const hex4 = [
  { q: 3, r: -4 },
  { q: 4, r: -4 },
  { q: 4, r: -5 },
  { q: 5, r: -5 },
  { q: 3, r: -5 },
  { q: 5, r: -6 },
  { q: 4, r: -6 },
];

export const map = [
  ...hex1, ...hex2, ...hex3,
];
