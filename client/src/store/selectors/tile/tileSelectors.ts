/* tslint:disable:no-console */
import ICoordinate from '../../../models/ICoordinate';
import Direction from '../../../models/Directions';

interface CenterTileFinder {
  id: number;
  touching: ICoordinate[];
  notTouching: ICoordinate[];
  center: ICoordinate;
}

const getNewHexCoordinate = (
  hex: ICoordinate,
  directions: ICoordinate[],
) :ICoordinate =>
directions.reduce(
  (accumulator, currentValue) => ({
    q: accumulator.q + currentValue.q,
    r: accumulator.r + currentValue.r,
  }),
  hex,
);

export const areCoordinatesEqual = (
  c1: ICoordinate,
  c2: ICoordinate,
) :boolean => (
  c1.q === c2.q && c1.r === c2.r)
;

export const isHexExplored = (
  hex: ICoordinate,
  map: ICoordinate[],
): boolean => (
  map.some(mapCoordinate => areCoordinatesEqual(hex, mapCoordinate))
);

export const getNeighborCoordinates = (
  characterPosition: ICoordinate,
) : ICoordinate[] => {
  const directions : ICoordinate[] = [
    Direction.RIGHT, Direction.UP_RIGHT, Direction.UP_LEFT,
    Direction.LEFT, Direction.LEFT_DOWN, Direction.RIGHT_DOWN,
  ];

  return directions.map(direction => ({
    q: characterPosition.q + direction.q,
    r: characterPosition.r + direction.r,
  }));
};

export const getNewTile = (
  center: ICoordinate,
): ICoordinate[] => {
  const neighbors = getNeighborCoordinates(center);
  return [...neighbors, center];
};

export const getExploredNeighbors = (
  hex: ICoordinate,
  map: ICoordinate[],
) :ICoordinate[] => {
  const neighbors = getNeighborCoordinates(hex);
  return neighbors.filter(neighbor => isHexExplored(neighbor, map));
};

export const getUnexploredNeighbors = (
  characterPosition: ICoordinate,
  map: ICoordinate[],
) :ICoordinate[] => {
  const neighbors = getNeighborCoordinates(characterPosition);
  return neighbors.filter(neighbor => !isHexExplored(neighbor, map));
};

export const areNeighbors = (tile1: ICoordinate, tile2: ICoordinate): boolean => {
  return isHexExplored(tile1, getNeighborCoordinates(tile2));
};

export const getTileExplorationMap = (hex: ICoordinate) :CenterTileFinder[]  => {
  return [{
    id: 1,
    touching: [
      getNewHexCoordinate(hex, [Direction.LEFT_DOWN]),
      getNewHexCoordinate(hex, [Direction.RIGHT_DOWN]),
    ],
    notTouching: [
      getNewHexCoordinate(hex, [Direction.LEFT]),
      getNewHexCoordinate(hex, [Direction.UP_RIGHT]),
    ],
    center: getNewHexCoordinate(hex, [Direction.UP_LEFT]),
  }, {
    id: 2,
    touching: [
      getNewHexCoordinate(hex, [Direction.RIGHT]),
    ],
    notTouching: [
      getNewHexCoordinate(hex, [Direction.UP_RIGHT]),
      getNewHexCoordinate(hex, [Direction.RIGHT_DOWN]),
    ],
    center: getNewHexCoordinate(hex, [Direction.UP_LEFT]),
  }, {
    id: 3, // tile 5
    touching: [
      getNewHexCoordinate(hex, [Direction.LEFT_DOWN]),
      getNewHexCoordinate(hex, [Direction.LEFT]),
    ],
    notTouching: [
      getNewHexCoordinate(hex, [Direction.UP_LEFT]),
      getNewHexCoordinate(hex, [Direction.RIGHT]),
    ],
    center: getNewHexCoordinate(hex, [Direction.UP_RIGHT]),
  }, {
    id: 4, // tile 5
    touching: [
      getNewHexCoordinate(hex, [Direction.RIGHT_DOWN]),
    ],
    notTouching: [
      getNewHexCoordinate(hex, [Direction.UP_LEFT]),
      getNewHexCoordinate(hex, [Direction.RIGHT]),
    ],
    center: getNewHexCoordinate(hex, [Direction.UP_RIGHT]),
  }, {
    id: 5, // tile 6
    touching: [
      getNewHexCoordinate(hex, [Direction.LEFT_DOWN]),
    ],
    notTouching: [
      getNewHexCoordinate(hex, [Direction.UP_RIGHT]),
    ],
    center: getNewHexCoordinate(hex, [Direction.RIGHT]),
  }, {
    id: 6, // tile 6
    touching: [
      getNewHexCoordinate(hex, [Direction.LEFT]),
      getNewHexCoordinate(hex, [Direction.UP_LEFT]),
    ],
    notTouching: [
      getNewHexCoordinate(hex, [Direction.UP_RIGHT]),
    ],
    center: getNewHexCoordinate(hex, [Direction.RIGHT]),
  }, {
    id: 7, // tile 1
    touching: [
      getNewHexCoordinate(hex, [Direction.UP_RIGHT]),
      getNewHexCoordinate(hex, [Direction.UP_LEFT]),
    ],
    notTouching: [
      getNewHexCoordinate(hex, [Direction.RIGHT]),
    ],
    center: getNewHexCoordinate(hex, [Direction.RIGHT_DOWN]),
  }, {
    id: 8, // tile 1
    touching: [
      getNewHexCoordinate(hex, [Direction.LEFT]),
    ],
    notTouching: [
      getNewHexCoordinate(hex, [Direction.RIGHT]),
    ],
    center: getNewHexCoordinate(hex, [Direction.RIGHT_DOWN]),
  }, {
    id: 9, // tile 2
    touching: [
      getNewHexCoordinate(hex, [Direction.UP_LEFT]),
    ],
    notTouching: [
      getNewHexCoordinate(hex, [Direction.RIGHT_DOWN]),
    ],
    center: getNewHexCoordinate(hex, [Direction.LEFT_DOWN]),
  }, {
    id: 9, // tile 2
    touching: [
      getNewHexCoordinate(hex, [Direction.UP_RIGHT]),
      getNewHexCoordinate(hex, [Direction.RIGHT]),
    ],
    notTouching: [
      getNewHexCoordinate(hex, [Direction.RIGHT_DOWN]),
    ],
    center: getNewHexCoordinate(hex, [Direction.LEFT_DOWN]),
  }];
};

export const getNewTileCenter = (
  hex: ICoordinate,
  map: ICoordinate[],
): ICoordinate => {
  const exploredNeighbors = getExploredNeighbors(hex, map);
  const tileFinder = getTileExplorationMap(hex)
    .find(({ touching, notTouching }) => {
      if (!touching.every(tileCoordinate => isHexExplored(tileCoordinate, exploredNeighbors))) {
        return false;
      }
      if (notTouching.some(tileCoordinate => isHexExplored(tileCoordinate, exploredNeighbors))) {
        return false;
      }
      return true;
    });

  if (tileFinder != null) {
    return tileFinder.center;
  }
  const isCorrectTile = (
    mmm: ICoordinate[][],
    neighbors: ICoordinate[],
    areNotExplored: ICoordinate[],
  ) => {
    if (areNotExplored.some(c => !!neighbors.find(n => n.q === c.q && n.r === c.r))) {
      return false;
    }
    return mmm.some(c => c.every(
      d => !!neighbors.find(neighbor => neighbor.q === d.q && neighbor.r === d.r),
    ));
  };
// tile 3
  const mustBeExplored6 = [[
    getNewHexCoordinate(hex, [Direction.UP_RIGHT]),
  ], [
    getNewHexCoordinate(hex, [Direction.RIGHT]),
    getNewHexCoordinate(hex, [Direction.RIGHT_DOWN]),
  ]];
  const areNotExploredTiles6: ICoordinate[] = [
  ];

  if (isCorrectTile(mustBeExplored6, exploredNeighbors, areNotExploredTiles6)) {
    return getNewHexCoordinate(hex, [Direction.LEFT]);
  }
  throw Error(`No placement found for tile based on hex: ${hex}`);
};
