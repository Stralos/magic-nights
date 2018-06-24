import ICoordinate from '../../../../models/ICoordinate';
import {
  areNeighbors,
  getNeighborCoordinates,
  getUnexploredNeighbors,
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
});
