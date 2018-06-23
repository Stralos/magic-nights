import * as React from 'react';
import { Hexagon } from 'react-hexgrid';

interface IProps {
  q: number;
  r: number;
  fill?: string;
  onClick?: (obj: { q: number, r: number }) => void;
}

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
