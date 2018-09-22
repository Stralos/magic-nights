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
  [Terrain.field]: { day: 2, night: 2 },
  [Terrain.hills]: { day: 3, night: 3 },
  [Terrain.forest]: { day: 3, night: 5 },
  [Terrain.rocks]: { day: 4, night: 4 },
  [Terrain.desert]: { day: 5, night: 3 },
  [Terrain.swamp]: { day: 5, night: 5 },
  [Terrain.city]: { day: 2, night: 2 },
  [Terrain.mountains]: { day: null, night: null },
  [Terrain.lake]: { day: null, night: null },
});
