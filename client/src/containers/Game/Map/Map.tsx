import * as React from 'react';
import { HexGrid, Layout, Pattern } from 'react-hexgrid';
import Hex from '../../../components/Hex';
import { map } from '../../../placeholderData';
import { areNeighbors, getUnexploredNeighbors } from '../../../store/selectors/tile';
import styled from 'styled-components';

const HexStyled = styled(Hex).attrs<any, any>({
  neighbor: (props: any) => props.neighbor,
})`
  cursor: ${props => props.neighbor ? 'pointer' : 'initial'}
  stroke: ${props => props.neighbor ? 'yellow' : 'none'}
  stroke-width: ${props => props.neighbor ? '0.1px' : '0'}
`;

const HexUnexplored = styled(HexStyled)`
  opacity: 0.6;
  fill: grey;
`;

interface IPosition {
  q: number;
  r: number;
}

interface IState {
  playerPosition: IPosition;
  map: IPosition[];
}

const MAP_CONFIG = {
  HEIGHT: 800,
  HEXAGON_SIZE: { x: 5, y: 5 },
  ORIGIN: { x: 0, y: 0 },
  SPACING: 1.01,
  WIDTH: 800,
};

class Map extends React.Component<{}, IState> {
  public state = {
    map,
    playerPosition: {
      q: 0,
      r: 0,
    },
  };

  public exploreTile = (tile: IPosition): void => {
    const newMap = [...this.state.map];
    this.setState({ map: newMap });
  }

  public setPlayerPosition = ({ q, r } : IPosition): void => {
    if (!areNeighbors(this.state.playerPosition, { q, r })) {
      return;
    }

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
            origin={MAP_CONFIG.ORIGIN}
          >
            {this.state.map.map(coordinate => (
              <HexStyled
                key={`${coordinate.q}${coordinate.r}`}
                {...coordinate}
                onClick={this.setPlayerPosition}
                neighbor={areNeighbors(this.state.playerPosition, coordinate)}
              />
              ))}
            {getUnexploredNeighbors(this.state.playerPosition, map).map(coordinate => (
              <HexUnexplored
                {...coordinate}
                key={`${coordinate.q}${coordinate.r}`}
                onClick={this.exploreTile}
                neighbor={areNeighbors(this.state.playerPosition, coordinate)}
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
