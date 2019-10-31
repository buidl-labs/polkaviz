import React from "react";
import { Line } from "react-konva";

class Tail extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* {console.log(this.props.x + " " + this.props.y)} */}
        <Line
          x={this.props.x}
          y={this.props.y}
          points={[3, 60, 3, 6]}
          tension={0}
          stroke={"#717171"}
          rotation={this.props.angle}
          opacity={this.props.opacity}
        />
      </React.Fragment>
    );
  }
}

export default Tail;
