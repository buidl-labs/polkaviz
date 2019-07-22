import React from "react";
import { Rect } from "react-konva";

class Rectangle extends React.Component {
  render() {
    return (
      <Rect x={20} y={20} width={50} height={50} fill={"#9335A3"} />
    );
  }
}

export default Rectangle;
