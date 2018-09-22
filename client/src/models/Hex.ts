import { Terrain } from './Terrain';

export default interface Hex {
  q: number;
  r: number;
  s: number;
  terrain: Terrain;
}
