import React from 'react';
import { Circle } from 'react-konva';

class Relay extends React.Component {
  handleOnMouseOver = () => {
    document.body.style.cursor = 'grab';
  };
  handleOnMouseOut = () => {
    document.body.style.cursor = 'default';
  };
  render() {
    let fillcolor = '#262733';
    let strokecolor = '#97A1BF';
    if (this.props.isKusama) {
      fillcolor = 'black';
      strokecolor = 'white';
    }
    return (
      <Circle
        x={this.props.x / 2}
        y={this.props.y / 2}
        onMouseOver={
          !this.props.isMainWrapper ? this.handleOnMouseOver : undefined
        }
        onMouseOut={
          !this.props.isMainWrapper ? this.handleOnMouseOut : undefined
        }
        radius={this.props.radius}
        fill={fillcolor}
        stroke={strokecolor}
        strokeWidth={4}
      />
    );
  }
}

export default Relay;
