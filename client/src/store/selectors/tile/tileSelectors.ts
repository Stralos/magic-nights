import ICoordinate from '../../../models/ICoordinate';

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
