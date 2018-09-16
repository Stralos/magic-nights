/* tslint:disable:no-console */
import ICoordinate from '../../../models/ICoordinate';
import Direction from '../../../models/Directions';

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

  return neighbors.filter((neighbor) => {
    return map.some(coordinate => coordinate.q === neighbor.q && coordinate.r === neighbor.r);
  });
};

export const getUnexploredNeighbors = (
  characterPosition: ICoordinate,
  map: ICoordinate[],
) :ICoordinate[] => {
  const neighbors = getNeighborCoordinates(characterPosition);
  return neighbors.filter((neighbor) => {
    return !map.some(coordinate => coordinate.q === neighbor.q && coordinate.r === neighbor.r);
  });
};

export const areNeighbors = (tile1: ICoordinate, tile2: ICoordinate): boolean => {
  return getNeighborCoordinates(tile1).some((neighbor) => {
    return neighbor.q === tile2.q && neighbor.r === tile2.r;
  });
};

export const getNewTileCenter = (
  hex: ICoordinate,
  map: ICoordinate[],
): ICoordinate => {
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

  const exploredNeighbors = getExploredNeighbors(hex, map);
// -----------------------------------------------------------------------------
// Tile 4
  const mustBeExplored = [[
    getNewHexCoordinate(hex, [Direction.LEFT_DOWN]),
    getNewHexCoordinate(hex, [Direction.RIGHT_DOWN]),
  ], [
    getNewHexCoordinate(hex, [Direction.RIGHT]),
  ]];

  const areNotExploredTiles = [
    getNewHexCoordinate(hex, [Direction.LEFT]),
    getNewHexCoordinate(hex, [Direction.UP_RIGHT]),
  ];

  if (isCorrectTile(mustBeExplored, exploredNeighbors, areNotExploredTiles)) {
    return getNewHexCoordinate(hex, [Direction.UP_LEFT]);
  }
// -----------------------------------------------------------------------------
// Tile 5
  const mustBeExplored2 = [[
    getNewHexCoordinate(hex, [Direction.LEFT_DOWN]),
    getNewHexCoordinate(hex, [Direction.LEFT]),
  ], [
    getNewHexCoordinate(hex, [Direction.RIGHT_DOWN]),
  ]];

  const areNotExploredTiles2 = [
    getNewHexCoordinate(hex, [Direction.UP_LEFT]),
  ];

  if (isCorrectTile(mustBeExplored2, exploredNeighbors, areNotExploredTiles2)) {
    return getNewHexCoordinate(hex, [Direction.UP_RIGHT]);
  }
// -----------------------------------------------------------------------------
// tile 6
  const mustBeExplored3 = [[
    getNewHexCoordinate(hex, [Direction.LEFT_DOWN]),
  ], [
    getNewHexCoordinate(hex, [Direction.LEFT]),
    getNewHexCoordinate(hex, [Direction.UP_LEFT]),
  ]];

  const areNotExploredTiles3 = [
    getNewHexCoordinate(hex, [Direction.UP_RIGHT]),
  ];

  if (isCorrectTile(mustBeExplored3, exploredNeighbors, areNotExploredTiles3)) {
    return getNewHexCoordinate(hex, [Direction.RIGHT]);
  }
// -----------------------------------------------------------------------------
// tile 1
  const mustBeExplored4 = [[
    getNewHexCoordinate(hex, [Direction.UP_RIGHT]),
    getNewHexCoordinate(hex, [Direction.UP_LEFT]),
  ], [
    getNewHexCoordinate(hex, [Direction.LEFT]),
  ]];

  const areNotExploredTiles4 = [
    getNewHexCoordinate(hex, [Direction.RIGHT]),
  ];

  if (isCorrectTile(mustBeExplored4, exploredNeighbors, areNotExploredTiles4)) {
    return getNewHexCoordinate(hex, [Direction.RIGHT_DOWN]);
  }
// -----------------------------------------------------------------------------
// tile 2
  const mustBeExplored5 = [[
    getNewHexCoordinate(hex, [Direction.UP_LEFT]),
  ], [
    getNewHexCoordinate(hex, [Direction.UP_RIGHT]),
    getNewHexCoordinate(hex, [Direction.RIGHT]),
  ]];

  const areNotExploredTiles5 = [
    getNewHexCoordinate(hex, [Direction.RIGHT_DOWN]),
  ];
  if (isCorrectTile(mustBeExplored5, exploredNeighbors, areNotExploredTiles5)) {
    return getNewHexCoordinate(hex, [Direction.LEFT_DOWN]);
  }
// -----------------------------------------------------------------------------
// tile 3
  const mustBeExplored6 = [[
    getNewHexCoordinate(hex, [Direction.UP_RIGHT]),
  ], [
    getNewHexCoordinate(hex, [Direction.RIGHT]),
    getNewHexCoordinate(hex, [Direction.RIGHT_DOWN]),
  ]];
  if (isCorrectTile(mustBeExplored6, exploredNeighbors, [])) {
    return getNewHexCoordinate(hex, [Direction.LEFT]);
  }

  console.log('No Found!');
  return { q: 100, r: 100 };
};
