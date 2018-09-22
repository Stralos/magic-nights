export enum Terrain {
  field,
  hills,
  forest,
  rocks,
  desert,
  swamp,
  mountains,
  lake,
  city,
}

export const TerrainCost = Object.freeze({
  field: { day: 2, night: 2 },
  hills: { day: 3, night: 3 },
  forest: { day: 3, night: 5 },
  rocks: { day: 4, night: 4 },
  desert: { day: 5, night: 3 },
  swamp: { day: 5, night: 5 },
  city: { day: 2, night: 2 },
  mountains: { day: null, night: null },
  lake: { day: null, night: null },
});
