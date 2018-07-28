import * as React from 'react';
import { Hexagon } from 'react-hexgrid';

interface ITile {
  q: number; r: number;
}

class Tile extends React.Component<ITile[]> {
  public render() {
    return this.props.map(
      tile => <Hexagon key={`${tile.q}-${tile.r}`} {...tile} />,
    );
  }
}

export default Tile;
