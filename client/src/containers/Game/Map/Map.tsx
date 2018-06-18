/* tslint:disable */
import * as React from 'react';
import { Hexagon, HexGrid, Layout, Pattern } from 'react-hexgrid';
import styled from 'styled-components';

const Hex = styled(Hexagon)`
  fill: blue
`;

class Map extends React.Component {
  public render() {
    const hexagonSize = { x: 5, y: 5 };
    const hex1 = [
      { q: 1, r: -1, s: 0 },
      { q: -1, r: 1, s: 0 },
      { q: 0, r: -1, s: 0 },
      { q: -1, r: 0, s: 0 },
      { q: 0, r: 0, s: 0 },
      { q: 1, r: 0, s: 0 },
      { q: 0, r: 1, s: 0 },
    ];

    const hex2 = [
      { q: 0, r: -2, s: 0 },
      { q: 1, r: -2, s: 0 },
      { q: 0, r: -3, s: 0 },
      { q: 1, r: -3, s: 0 },
      { q: 2, r: -3, s: 0 },
      { q: 1, r: -4, s: 0 },
      { q: 2, r: -4, s: 0 },
    ];

    const hex3 = [
      { q: 2, r: -1, s: 0 },
      { q: 3, r: -1, s: 0 },
      { q: 2, r: -2, s: 0 },
      { q: 3, r: -2, s: 0 },
      { q: 4, r: -2, s: 0 },
      { q: 4, r: -3, s: 0 },
      { q: 3, r: -3, s: 0 },
    ]

    let tiles: Array<{ q: number; r: number; s:number }> = [
      ...hex1, 
      ...hex2,
      ...hex3,
    ];

    // tiles = [];

    return (
      <div>
        <HexGrid width={800} height={800}>
          <Layout flat={false} size={hexagonSize} spacing={1.01} origin={{ x: 0, y: 0  }}>
            { tiles.map(coordinate => <Hexagon {...coordinate} />)}  
            <Hex q={0} r={0} s={0} />
            <Hex q={1} r={0} s={0} />
            <Hexagon q={1} r={0} fill={'pat-1'}/>
          </Layout>
          <Pattern id="pat-1" link="https://www.lunapic.com/editor/premade/transparent.gif" />
        </HexGrid>
      </div>
    );
  }
}

export default Map;
