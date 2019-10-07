import React from "react";
import { Circle } from "react-konva";

class Relay extends React.Component {
  render() {
    let fillcolor = "#262733"
    if(this.props.isKusama) {
      fillcolor = "black"
    }
    return (
      <Circle
        x={this.props.x / 2}
        y={this.props.y / 2}
        radius={118}
        fill={fillcolor}
        stroke={"#97A1BF"}
        strokeWidth={4}
      />
    );
  }
}

export default Relay;
