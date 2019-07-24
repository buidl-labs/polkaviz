import React from "react";
import { Line } from "react-konva";

class Tail extends React.Component {
  render() {
    return (
      <React.Fragment>
      {console.log(this.props.x+ " " + this.props.y)}
      <Line x={this.props.x} y={this.props.y} points={[5, 50, 5, 10]} tension={0} stroke={"rgba(255, 255, 255, 0.71)"} rotation={this.props.angle} />
      </React.Fragment>
    );
  }
}

export default Tail;
