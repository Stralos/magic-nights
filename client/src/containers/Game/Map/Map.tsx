import * as React from 'react';
import { HexGrid, Layout, Pattern } from 'react-hexgrid';
import Hex from '../../../components/Hex';
import { map } from '../../../placeholderData';
interface IState {
  playerPosition: {
    q: number;
    r: number;
  };
}

const MAP_CONFIG = {
  HEIGHT: 800,
  HEXAGON_SIZE: {
    x: 5,
    y: 5,
  },
  SPACING: 1.01,
  WIDTH: 800,
};

class Map extends React.Component<{}, IState> {
  public state = {
    playerPosition: {
      q: 0,
      r: 0,
    },
  };

  public setPlayerPosition = ({ q, r } : { q: number; r: number }) => {
    const playerPosition = { q, r };
    this.setState({ playerPosition });
  }

  public render() {
    return (
      <div>
        <HexGrid width={MAP_CONFIG.WIDTH} height={MAP_CONFIG.HEIGHT}>
          <Layout
            flat={false}
            size={MAP_CONFIG.HEXAGON_SIZE}
            spacing={MAP_CONFIG.SPACING}
            origin={{ x: 0, y: 0  }}
          >
            {map.map(coordinate => (
              <Hex
                key={`${coordinate.q}${coordinate.r}`}
                {...coordinate}
                onClick={this.setPlayerPosition}
              />
              ))}
            <Hex q={this.state.playerPosition.q} r={this.state.playerPosition.r} fill={'pat-1'}/>
          </Layout>
          <Pattern
            size={MAP_CONFIG.HEXAGON_SIZE}
            id="pat-1"
            link="https://www.lunapic.com/editor/premade/transparent.gif" 
          />
        </HexGrid>
      </div>
    );
  }
}

export default Map;
