import * as React from 'react';
import { Hexagon } from 'react-hexgrid';

interface IProps {
  q: number;
  r: number;
  fill?: string;
  onClick?: (obj: { q: number, r: number }) => void;
}
/*
export const StyledText = styled(Text)`
  font-size: 0.1em;
  stroke: black;
`;

<StyledText y={3.5} >A-1</StyledText>
*/

class Hex extends React.PureComponent<IProps> {
  public render () {
    return (
      <Hexagon
        {...this.props}
        s={this.calculateSCoordinate()}
        onClick={this.onClick}
      />
    );
  }

  public calculateSCoordinate = () : number => {
    const { q, r } = this.props;
    return 0 - q - r;
  }

  public onClick = () => {
    const { onClick, q, r } = this.props;
    if (onClick) {
      onClick({ q, r });
    }
  }
}

export default Hex;
