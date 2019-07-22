import React from "react";
import { Circle } from "react-konva";
import { Stage, Layer } from "react-konva";

class Relay extends React.Component {
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
          {console.log(window.innerWidth)}
        <Layer>
          <Circle
            x={window.innerWidth/2}
            y={window.innerHeight/2}
            radius={118}
            fill={"transparent"}
            stroke={"#97A1BF"}
            strokeWidth={4}
          />
        </Layer>
      </Stage>
    );
  }
}

export default Relay;
