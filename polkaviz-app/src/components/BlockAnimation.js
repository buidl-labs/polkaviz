import React from "react";
import { Spring, animated } from "react-spring/renderprops-konva";

class BlockAnimation extends React.Component {
  handleClick = () => this.setState(state => ({ flag: !state.flag }));
  render() {
    return (
      <Spring
        native
        reset={true}
        from={{
          x: this.props.x2,
          y: this.props.y2,
          shadowBlur: 0,
          fill: "hotpink"
        }}
        to={{
          x: this.props.x1,
          y: this.props.y1,
          shadowBlur: 5,
          fill: "seagreen",
          width: 10,
          height: 10
        }}
      >
        {props => <animated.RegularPolygon {...props} rotation={this.props.angle} sides={6} />}
      </Spring>
    );
  }
}
export default BlockAnimation;
