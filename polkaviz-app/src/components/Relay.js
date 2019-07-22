import React from "react";
import { Circle } from "react-konva";

class Relay extends React.Component {
  render() {
    return (
      <Circle
        x={this.props.x / 2}
        y={this.props.y / 2}
        radius={118}
        fill={"transparent"}
        stroke={"#97A1BF"}
        strokeWidth={4}
      />
    );
  }
}

export default Relay;
