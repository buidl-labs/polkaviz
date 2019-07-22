import React from "react";
import { Line } from "react-konva";

class Tail extends React.Component {
  render() {
    return (
      <Line x={this.props.x} y={this.props.y} points={[73, 70, 340, 23, 450, 60]} tension={1} fill={"#9335A3"} />
    );
  }
}

export default Tail;
