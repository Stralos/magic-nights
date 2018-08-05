import ICoordinate from '../../../../models/ICoordinate';
import {
  areNeighbors,
  getNeighborCoordinates,
  getUnexploredNeighbors,
  getExploredNeighbors,
  getNewTileCenter,
} from '../index';

describe('Tile selector', () => {
  it('should return neighbord coordinates', () => {
    const playerPosition: ICoordinate = { q: 0, r: 0 };
    const expectedNeigborCoordinates: ICoordinate[] = [
      { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
      { q: -1, r: 0 }, { q: -1, r: +1 }, { q: 0, r: +1 },
    ];

    const neighbors = getNeighborCoordinates(playerPosition);

    expect(neighbors).toEqual(expectedNeigborCoordinates);
  });

  it('it should return true if both tiles are neighbors', () => {
    const tile1: ICoordinate = { q: 0, r: 0 };
    const tile2: ICoordinate = { q: 0, r: 1 };

    const result = areNeighbors(tile1, tile2);

    expect(result).toEqual(true);
  });

  it('should return false if both tiles are not neighbors', () => {
    const tile1: ICoordinate = { q: 0, r: 0 };
    const tile2: ICoordinate = { q: 2, r: 2 };

    const result = areNeighbors(tile1, tile2);

    expect(result).toEqual(false);
  });

  it('should return neighbors that are not in the map', () => {
    const player: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
    ];
    const unexploredNeighbors: ICoordinate[] = [
      { q: -1, r: 0 }, { q: -1, r: +1 }, { q: 0, r: +1 },
    ];

    expect(getUnexploredNeighbors(player, map)).toEqual(unexploredNeighbors);
  });

  it('should return neighbor tiles that are on the map', () => {
    const hex: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
    ];

    expect(getExploredNeighbors(hex, map)).toEqual(map);
  });

  it('should return center tile when exploring hex 4 from bottom', () => {
    const hex: ICoordinate = { q: 1, r: -2 };
    const map: ICoordinate[] = [
      { q: 1, r: -1 },
      { q: 0, r: -1 },
    ];

    expect(getNewTileCenter(hex, map)).toEqual({ q: 1, r: -3 });
  });

  it('should return center tile when exploring hex 4 from right', () => {
    const hex: ICoordinate = { q: 1, r: -2 };
    const map: ICoordinate[] = [
      { q: 2, r: -2 },
    ];
    expect(getNewTileCenter(hex, map)).toEqual({ q: 1, r: -3 });
  });

  it('should return center tile when exploring hex 5 from left', () => {
    const hex: ICoordinate = { q: 2, r: -1 };
    const map: ICoordinate[] = [
      { q: 1, r: 0 },
      { q: 1, r: -1 },
      { q: 2, r: 0 },
    ];
    expect(getNewTileCenter(hex, map)).toEqual({ q: 3, r: -2 });
  });

  it('should return center tile when exploring hex 6 from bottom', () => {
    const hex: ICoordinate = { q: 2, r: -2 };
    const map: ICoordinate[] = [
      { q: 1, r: -1 },
    ];
    expect(getNewTileCenter(hex, map)).toEqual({ q: 3, r: -2 });
  });

  it('should return center tile when exploring hex 6 from left', () => {
    const hex: ICoordinate = { q: 2, r: -2 };
    const map: ICoordinate[] = [
      { q: 1, r: -1 },
      { q: 1, r: -2 },
      { q: 2, r: -3 },
    ];

    expect(getNewTileCenter(hex, map)).toEqual({ q: 3, r: -2 });
  });
});
