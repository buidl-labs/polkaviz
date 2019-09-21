import React from "react";
// import {Line, Rect} from 'react-konva'
import Rectandline from "./Rectandline";

class Parachains extends React.Component {
  render() {
    let angle = 0;
    let arr = [];
    this.props.parachains.forEach(ele => {
      arr.push(
        <Rectandline
          xstart={118 * Math.cos(angle) + this.props.x / 2}
          ystart={118 * Math.sin(angle) + this.props.y / 2}
          xend={218 * Math.cos(angle) + this.props.x / 2}
          yend={218 * Math.sin(angle) + this.props.y / 2}
          angle={angle}
        />
      );
      angle += (2 * Math.PI) / this.props.parachains.length;
    });
    return arr;
  }
}

export default Parachains;
