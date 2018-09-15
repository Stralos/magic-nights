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

  const mustBeExplored = [[
    getNewHexCoordinate(hex, [Direction.LEFT_DOWN]),
    getNewHexCoordinate(hex, [Direction.RIGHT_DOWN]),
  ], [
    getNewHexCoordinate(hex, [Direction.RIGHT]),
  ]];

  const areNotExploredTiles = [
    getNewHexCoordinate(hex, [Direction.LEFT]),
  ];

  if (isCorrectTile(mustBeExplored, exploredNeighbors, areNotExploredTiles)) {
    return getNewHexCoordinate(hex, [Direction.UP_LEFT]);
  }

  const m2 = [[
    getNewHexCoordinate(hex, [Direction.LEFT_DOWN]),
    getNewHexCoordinate(hex, [Direction.LEFT]),
  ]];

  const areNotExprlored2 = [
    getNewHexCoordinate(hex, [Direction.UP_LEFT]),
  ];

  if (isCorrectTile(m2, exploredNeighbors, areNotExprlored2)) {
    return getNewHexCoordinate(hex, [Direction.UP_RIGHT]);
  }

  const m3 = [[
    getNewHexCoordinate(hex, [Direction.LEFT_DOWN]),
  ], [
    getNewHexCoordinate(hex, [Direction.LEFT]),
    getNewHexCoordinate(hex, [Direction.UP_LEFT]),
  ]];

  /*
  const areNotExprlored3 = [
    getHexNeighborCoordinate(hex, Direction.UP_RIGHT, directionMap),
  ];
  */

  if (isCorrectTile(m3, exploredNeighbors, [])) {
    return getNewHexCoordinate(hex, [Direction.RIGHT]);
  }

  const m4 = [[
    getNewHexCoordinate(hex, [Direction.UP_RIGHT]),
    getNewHexCoordinate(hex, [Direction.UP_LEFT]),
  ]];

  if (isCorrectTile(m4, exploredNeighbors, [])) {
    return getNewHexCoordinate(hex, [Direction.RIGHT_DOWN]);
  }

  console.log('No Found!');
  return { q: 100, r: 100 };
};
