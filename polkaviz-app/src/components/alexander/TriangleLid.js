import React from "react";
import { Spring, animated } from "react-spring/renderprops-konva";

class TriangleLid extends React.Component {
  handleClick = () => this.setState(state => ({ flag: !state.flag }));
  render() {
    return (
      <Spring
        native
        reset={true}
        config={{ duration: this.props.duration }}
        from={{
          x:
            this.props.x2 +
            this.props.hexagonRadius *
              Math.tan(30 * 0.0174533) *
              Math.cos((this.props.angle - this.props.theta) * 0.0174533),
          y:
            this.props.y2 +
            this.props.hexagonRadius *
              Math.tan(30 * 0.0174533) *
              Math.sin((this.props.angle - this.props.theta) * 0.0174533),
          shadowBlur: 0
        }}
        to={{
          x:
            this.props.x1 +
            this.props.hexagonRadius *
              Math.tan(30 * 0.0174533) *
              Math.cos((this.props.angle - this.props.theta) * 0.0174533),
          y:
            this.props.y1 +
            this.props.hexagonRadius *
              Math.tan(30 * 0.0174533) *
              Math.sin((this.props.angle - this.props.theta) * 0.0174533),
          shadowBlur: 0,
          radius: 20 * Math.tan(30 * 0.0174533),
          opacity: 1
        }}
      >
        {props => (
          <animated.RegularPolygon
            {...props}
            rotation={30 + (this.props.angle - this.props.theta)}
            sides={3}
            radius={this.props.hexagonRadius * Math.tan(30 * 0.0174533)}
            fill="#EBAF2E"
          />
        )}
      </Spring>
    );
  }
}
export default TriangleLid;
