import * as React from 'react';
import { HexGrid, Layout, Pattern } from 'react-hexgrid';
import Hex from '../../../components/Hex';
import { map as gameMap } from '../../../placeholderData';
import {
  areNeighbors,
  getUnexploredNeighbors,
  getNewTile,
  getNewTileCenter,
} from '../../../store/selectors/tile';
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
  HEXAGON_SIZE: { x: 3.5, y: 3.5 },
  ORIGIN: { x: -4, y: -4 },
  SPACING: 1.01,
  WIDTH: 800,
};

class Map extends React.PureComponent<{}, IState> {
  public state = {
    map: gameMap,
    playerPosition: {
      q: 0,
      r: 0,
    },
  };

  public exploreTile = (tile: IPosition): void => {
    const newTileCenter = getNewTileCenter(tile, this.state.map);
    const newTile = getNewTile(newTileCenter);
    const newMap = [...this.state.map, ...newTile];
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
    const { map, playerPosition } = this.state;
    const unexploredNeighbors = getUnexploredNeighbors(playerPosition, map);

    return (
      <HexGrid width={MAP_CONFIG.WIDTH} height={MAP_CONFIG.HEIGHT}>
        <Layout
          flat={false}
          size={MAP_CONFIG.HEXAGON_SIZE}
          spacing={MAP_CONFIG.SPACING}
          origin={MAP_CONFIG.ORIGIN}
        >
          {map.map(coordinate => (
            <HexStyled
              key={`${coordinate.q}${coordinate.r}`}
              {...coordinate}
              onClick={this.setPlayerPosition}
              neighbor={areNeighbors(this.state.playerPosition, coordinate)}
            />
            ))}
          {unexploredNeighbors.map(coordinate => (
            <HexUnexplored
              {...coordinate}
              key={`${coordinate.q}${coordinate.r}`}
              onClick={this.exploreTile}
              neighbor={true}
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
    );
  }
}

export default Map;
