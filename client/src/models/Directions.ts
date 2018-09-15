const Direction = Object.freeze({
  UP_LEFT: { q: 0, r: -1 },
  UP_RIGHT: { q: 1, r: -1 },
  RIGHT: { q: 1, r: 0 },
  RIGHT_DOWN: { q: 0, r: 1 },
  LEFT_DOWN: { q: -1, r: 1 },
  LEFT: { q: -1, r: 0 },
});

export default Direction;
