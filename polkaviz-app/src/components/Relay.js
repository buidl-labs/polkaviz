import React from "react";
import { Circle } from "react-konva";

class Relay extends React.Component {
  render() {
    let fillcolor = "#262733";
    let strokecolor = "#97A1BF";
    if (this.props.isKusama) {
      fillcolor = "black";
      strokecolor = "white";
    }
    return (
      <Circle
        x={this.props.x / 2}
        y={this.props.y / 2}
        radius={118}
        fill={fillcolor}
        stroke={strokecolor}
        strokeWidth={4}
      />
    );
  }
}

export default Relay;
