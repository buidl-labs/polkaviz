import React from "react";
import { Circle } from "react-konva";

class Relay extends React.Component {
  render() {
    return (
      <Circle
        x={this.props.x / 2}
        y={this.props.y / 2}
        radius={118}
        fill={"#262733"}
        stroke={"#97A1BF"}
        strokeWidth={4}
      />
    );
  }
}

export default Relay;
