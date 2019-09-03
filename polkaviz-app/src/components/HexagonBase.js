import React from "react";
import { Spring, animated } from "react-spring/renderprops-konva";

class HexagonBase extends React.Component {
  handleClick = () => this.setState(state => ({ flag: !state.flag }));
  render() {
    return (
      <Spring
        native
        reset={true}
        config={{duration: this.props.duration}}
        from={{
          x: this.props.x2,
          y: this.props.y2,
          shadowBlur: 0,
        }}
        to={{
          x: this.props.x1,
          y: this.props.y1,
          shadowBlur: 5,
          radius: this.props.hexagonRadius
        }}
      >
        {props => <animated.RegularPolygon {...props} rotation={this.props.angle} sides={6} fill="#09FBD3" />}
      </Spring>
    );
  }
}
export default HexagonBase;
