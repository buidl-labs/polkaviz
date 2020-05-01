/* eslint-disable */
import React from 'react';
import { Circle } from 'react-konva';

class Relay extends React.Component {
  render() {
    let fillcolor = '#262733';
    let strokecolor = '#97A1BF';
    if (this.props.isKusama) {
      fillcolor = 'black';
      strokecolor = 'white';
    }
    let radius = 190
    if(this.props.isMainWrapper){
      radius = 160
    }
    return (
      <Circle
        x={this.props.x / 2}
        y={this.props.y / 2}
        radius={radius}
        fill={fillcolor}
        stroke={strokecolor}
        strokeWidth={4}
      />
    );
  }
}

export default Relay;
