import React from "react";
import Rectangle from "./Rectangle"
import { Stage, Layer, Text } from "react-konva";

class Validator extends React.Component {
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Rectangle />
        </Layer>
      </Stage>
    );
  }
}

export default Validator;
