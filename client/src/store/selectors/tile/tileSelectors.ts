/* tslint:disable:no-console */
import ICoordinate from '../../../models/ICoordinate';
import Direction from '../../../models/Directions';

const getDirectionMap = (): Map<Direction, ICoordinate> => {
  return new Map<Direction, ICoordinate>([
    [Direction.UP_LEFT, { q: 0, r: -1 }],
    [Direction.UP_RIGHT, { q: 1, r: -1 }],
    [Direction.RIGHT, { q: 1, r: 0 }],
    [Direction.RIGHT_DOWN, { q: 0, r: 1 }],
    [Direction.LEFT_DOWN, { q: -1, r: 1 }],
    [Direction.LEFT, { q: -1, r: 0 }],
  ]);
};

const getHexNeighborCoordinate = (
  hex: ICoordinate,
  direction: Direction,
  directionMap: Map<Direction, ICoordinate>,
) :ICoordinate => {
  const directionShift = directionMap.get(direction);

  if (directionShift == null) {
    throw Error('Problem!');
  }

  return { q: hex.q + directionShift.q, r: hex.r + directionShift.r };
};

export const getNeighborCoordinates = (characterPosition: ICoordinate) : ICoordinate[] => {
  const directions : ICoordinate[] = [
    { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
    { q: -1, r: 0 }, { q: -1, r: +1 }, { q: 0, r: +1 },
  ];
  return directions.map(direction => ({
    q: characterPosition.q + direction.q,
    r: characterPosition.r + direction.r,
  }));
};

export const getNewTile = (center: ICoordinate): ICoordinate[] => {
  const neigbors = getNeighborCoordinates(center);
  return [...neigbors, center];
};

export const getExploredNeighbors = (
  hex: ICoordinate, map: ICoordinate[],
) :ICoordinate[] => {
  const neighbors = getNeighborCoordinates(hex);

  return neighbors.filter((neighbor) => {
    return map.some(coordinate => coordinate.q === neighbor.q && coordinate.r === neighbor.r);
  });
};

export const getUnexploredNeighbors = (
  characterPosition: ICoordinate, map: ICoordinate[],
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

  const directionMap = getDirectionMap();
  const exploredNeighbors = getExploredNeighbors(hex, map);

  const mustBeExplored = [[
    getHexNeighborCoordinate(hex, Direction.LEFT_DOWN, directionMap),
    getHexNeighborCoordinate(hex, Direction.RIGHT_DOWN, directionMap),
  ], [
    getHexNeighborCoordinate(hex, Direction.RIGHT, directionMap),
  ]];

  const areNotExploredTiles = [
    getHexNeighborCoordinate(hex, Direction.LEFT, directionMap),
  ];

  if (isCorrectTile(mustBeExplored, exploredNeighbors, areNotExploredTiles)) {
    return getHexNeighborCoordinate(hex, Direction.UP_LEFT, directionMap);
  }

  const m2 = [[
    getHexNeighborCoordinate(hex, Direction.LEFT_DOWN, directionMap),
    getHexNeighborCoordinate(hex, Direction.LEFT, directionMap),
  ]];

  if (isCorrectTile(m2, exploredNeighbors, [])) {
    return { q: hex.q + 1, r: hex.r - 1 };
  }

  console.log('No Found!');
  return { q: 100, r: 100 };
};
