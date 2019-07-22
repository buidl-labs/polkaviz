import React from "react";
import Rectangle from "./Rectangle";
import Tail from "./Tail"
import { Stage, Layer, Text } from "react-konva";

class Validator extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Rectangle x={this.props.x / 2} y={this.props.y / 2} />
        <Tail x={this.props.x / 2} y={this.props.y / 2} />
      </React.Fragment>
    );
  }
}

export default Validator;
