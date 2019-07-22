import React from "react";
import Rectangle from "./Rectangle";
import Tail from "./Tail"

class Validator extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Tail x={this.props.x / 2} y={this.props.y / 2} />
        <Rectangle x={this.props.x / 2} y={this.props.y / 2} />
      </React.Fragment>
    );
  }
}

export default Validator;
