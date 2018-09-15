/* tslint:disable:no-console */
import ICoordinate from '../../../models/ICoordinate';
import { Direction2 }  from '../../../models/Directions';

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
    { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
    { q: -1, r: 0 }, { q: -1, r: +1 }, { q: 0, r: +1 },
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
  const neigbors = getNeighborCoordinates(characterPosition);
  return neigbors.filter((neigbor) => {
    return !map.some(coordinate => coordinate.q === neigbor.q && coordinate.r === neigbor.r);
  });
};

export const areNeighbors = (tile1: ICoordinate, tile2: ICoordinate): boolean => {
  return getNeighborCoordinates(tile1).some((neigbor) => {
    return neigbor.q === tile2.q && neigbor.r === tile2.r;
  });
};

export const getNewTileCenter = (
  hex: ICoordinate,
  map: ICoordinate[],
): ICoordinate => {
  const isCorrectTile = (
    mmm: ICoordinate[][],
    neigbors: ICoordinate[],
    areNotExplored: ICoordinate[],
  ) => {
    if (areNotExplored.some(c => !!neigbors.find(n => n.q === c.q && n.r === c.r))) {
      return false;
    }
    return mmm.some(c => c.every(
      d => !!neigbors.find(neighbor => neighbor.q === d.q && neighbor.r === d.r),
    ));
  };

  const exploredNeighbors = getExploredNeighbors(hex, map);

  const mustBeExplored = [[
    getNewHexCoordinate(hex, [Direction2.LEFT_DOWN]),
    getNewHexCoordinate(hex, [Direction2.RIGHT_DOWN]),
  ], [
    getNewHexCoordinate(hex, [Direction2.RIGHT]),
  ]];

  const areNotExploredTiles = [
    getNewHexCoordinate(hex, [Direction2.LEFT]),
  ];

  if (isCorrectTile(mustBeExplored, exploredNeighbors, areNotExploredTiles)) {
    return getNewHexCoordinate(hex, [Direction2.UP_LEFT]);
  }

  const m2 = [[
    getNewHexCoordinate(hex, [Direction2.LEFT_DOWN]),
    getNewHexCoordinate(hex, [Direction2.LEFT]),
  ]];

  const areNotExprlored2 = [
    getNewHexCoordinate(hex, [Direction2.UP_LEFT]),
  ];

  if (isCorrectTile(m2, exploredNeighbors, areNotExprlored2)) {
    return getNewHexCoordinate(hex, [Direction2.UP_RIGHT]);
  }

  const m3 = [[
    getNewHexCoordinate(hex, [Direction2.LEFT_DOWN]),
  ], [
    getNewHexCoordinate(hex, [Direction2.LEFT]),
    getNewHexCoordinate(hex, [Direction2.UP_LEFT]),
  ]];

  /*
  const areNotExprlored3 = [
    getHexNeighborCoordinate(hex, Direction.UP_RIGHT, directionMap),
  ];
  */

  if (isCorrectTile(m3, exploredNeighbors, [])) {
    return getNewHexCoordinate(hex, [Direction2.RIGHT]);
  }

  const m4 = [[
    getNewHexCoordinate(hex, [Direction2.UP_RIGHT]),
    getNewHexCoordinate(hex, [Direction2.UP_LEFT]),
  ]];

  if (isCorrectTile(m4, exploredNeighbors, [])) {
    return getNewHexCoordinate(hex, [Direction2.RIGHT_DOWN]);
  }

  console.log('No Found!');
  return { q: 100, r: 100 };
};
