import ICoordinate from '../../../../models/ICoordinate';
import Direction from '../../../../models/Directions';
import {
  areNeighbors,
  getNeighborCoordinates,
  getUnexploredNeighbors,
  getExploredNeighbors,
  getNewTileCenter,
} from '../index';

function moveHex(hex: ICoordinate, movement: ICoordinate[]) {
  return movement.reduce(
    (accumulator, currentValue) => ({
      q: accumulator.q + currentValue.q,
      r: accumulator.r + currentValue.r,
    }),
    hex,
  );
}
describe('Tile selector', () => {
  it('should return neighbor coordinates', () => {
    const playerPosition: ICoordinate = { q: 0, r: 0 };
    const expectedNeighborCoordinates: ICoordinate[] = [
      moveHex(playerPosition, [Direction.RIGHT]),
      moveHex(playerPosition, [Direction.UP_RIGHT]),
      moveHex(playerPosition, [Direction.UP_LEFT]),
      moveHex(playerPosition, [Direction.LEFT]),
      moveHex(playerPosition, [Direction.LEFT_DOWN]),
      moveHex(playerPosition, [Direction.RIGHT_DOWN]),
    ];
    const neighbors = getNeighborCoordinates(playerPosition);
    expect(neighbors).toEqual(expectedNeighborCoordinates);
  });

  it('it should return true if both tiles are neighbors', () => {
    const tile1: ICoordinate = moveHex({ q: 0, r: 0 }, [Direction.RIGHT]);
    const tile2: ICoordinate = moveHex({ q: 0, r: 0 }, [Direction.RIGHT_DOWN]);
    const result = areNeighbors(tile1, tile2);
    expect(result).toEqual(true);
  });

  it('should return false if both tiles are not neighbors', () => {
    const tile1: ICoordinate = moveHex({ q: 0, r: 0 }, [Direction.RIGHT]);
    const tile2: ICoordinate = moveHex({ q: 0, r: 0 }, [Direction.LEFT]);
    const result = areNeighbors(tile1, tile2);
    expect(result).toEqual(false);
  });

  it('should return neighbors that are not in the map', () => {
    const player: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      moveHex(player, [Direction.RIGHT]),
      moveHex(player, [Direction.UP_RIGHT]),
      moveHex(player, [Direction.UP_LEFT]),
    ];
    const unexploredNeighbors: ICoordinate[] = [
      moveHex(player, [Direction.LEFT]),
      moveHex(player, [Direction.LEFT_DOWN]),
      moveHex(player, [Direction.RIGHT_DOWN]),
    ];
    expect(getUnexploredNeighbors(player, map)).toEqual(unexploredNeighbors);
  });

  it('should return neighbor tiles that are on the map', () => {
    const hex: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      moveHex(hex, [Direction.RIGHT]),
      moveHex(hex, [Direction.UP_RIGHT]),
      moveHex(hex, [Direction.UP_LEFT]),
    ];
    expect(getExploredNeighbors(hex, map)).toEqual(map);
  });

  it('should return center tile when exploring hex 4 from bottom', () => {
    const hex: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      moveHex(hex, [Direction.RIGHT_DOWN]),
      moveHex(hex, [Direction.LEFT_DOWN]),
    ];
    expect(getNewTileCenter(hex, map)).toEqual(moveHex(hex, [Direction.UP_LEFT]));
  });

  it('should return center tile when exploring hex 4 from right', () => {
    const hex: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      moveHex(hex, [Direction.RIGHT]),
    ];
    expect(getNewTileCenter(hex, map)).toEqual(moveHex(hex, [Direction.UP_LEFT]));
  });

  it('should return center tile when exploring hex 5 from left', () => {
    const hex: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      moveHex(hex, [Direction.LEFT_DOWN]),
      moveHex(hex, [Direction.LEFT]),
      moveHex(hex, [Direction.RIGHT_DOWN]),
    ];
    expect(getNewTileCenter(hex, map)).toEqual(moveHex(hex, [Direction.UP_RIGHT]));
  });

  it('should return center tile when exploring hex 5 from the bottom', () => {
    const hex: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      moveHex(hex, [Direction.RIGHT_DOWN]),
    ];
    expect(getNewTileCenter(hex, map)).toEqual(moveHex(hex, [Direction.UP_RIGHT]));
  });

  it('should return center tile when exploring hex 6 from bottom', () => {
    const hex: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      moveHex(hex, [Direction.LEFT_DOWN]),
    ];
    expect(getNewTileCenter(hex, map)).toEqual(moveHex(hex, [Direction.RIGHT]));
  });

  it('should return center tile when exploring hex 6 from left', () => {
    const hex: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      moveHex(hex, [Direction.LEFT]),
      moveHex(hex, [Direction.UP_LEFT]),
    ];

    expect(getNewTileCenter(hex, map)).toEqual(moveHex(hex, [Direction.RIGHT]));
  });

  it('should return center tile when exploring hex 1 from top', () => {
    const hex: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      moveHex(hex, [Direction.UP_LEFT]),
      moveHex(hex, [Direction.UP_RIGHT]),
    ];

    expect(getNewTileCenter(hex, map)).toEqual(moveHex(hex, [Direction.RIGHT_DOWN]));
  });

  it('should return center tile when exploring hex 1 from left', () => {
    const hex: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      moveHex(hex, [Direction.LEFT]),
    ];
    expect(getNewTileCenter(hex, map)).toEqual(moveHex(hex, [Direction.RIGHT_DOWN]));
  });

  it('should return center tile when exploring hex 2 from the top', () => {
    const hex: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      moveHex(hex, [Direction.UP_LEFT]),
    ];

    expect(getNewTileCenter(hex, map)).toEqual(moveHex(hex, [Direction.LEFT_DOWN]));
  });

  it('should return center tile when exploring hex 2 from the right', () => {
    const hex: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      moveHex(hex, [Direction.UP_RIGHT]),
      moveHex(hex, [Direction.RIGHT]),
    ];

    expect(getNewTileCenter(hex, map)).toEqual(moveHex(hex, [Direction.LEFT_DOWN]));
  });

  it('should return center tile when exploring hex 3 from the top', () => {
    const hex: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      moveHex(hex, [Direction.UP_RIGHT]),
    ];

    expect(getNewTileCenter(hex, map)).toEqual(moveHex(hex, [Direction.LEFT]));
  });

  it('should return center tile when exploring hex 3 from the bottom', () => {
    const hex: ICoordinate = { q: 0, r: 0 };
    const map: ICoordinate[] = [
      moveHex(hex, [Direction.RIGHT]),
      moveHex(hex, [Direction.RIGHT_DOWN]),
    ];
    expect(getNewTileCenter(hex, map)).toEqual(moveHex(hex, [Direction.LEFT]));
  });
});
