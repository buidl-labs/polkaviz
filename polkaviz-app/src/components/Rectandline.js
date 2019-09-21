import React from "react";
import { Line, Rect } from "react-konva";

class Rectandline extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Line
          points={[
            this.props.xstart,
            this.props.ystart,
            this.props.xend,
            this.props.yend
          ]}
          stroke="white"
          opacity={0.2}
        />
        <Rect
          x={this.props.xend}
          y={this.props.yend}
          width={16}
          height={16}
          fill="white"
          stroke="purple"
          strokeWidth={4}
          offsetX={8}
          offsetY={8}
          rotation={(this.props.angle * 180) / Math.PI}
        />
      </React.Fragment>
    );
  }
}

export default Rectandline;
