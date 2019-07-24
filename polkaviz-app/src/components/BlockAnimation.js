import React from "react";
import { Spring, animated } from 'react-spring/renderprops-konva';

class BlockAnimation extends React.Component {
    state = { flag: false };
    handleClick = () => this.setState(state => ({ flag: !state.flag }));
    render() {
      const { flag } = this.state;
      return (
        <Spring
          native
          from={{ x: 0, shadowBlur: 0, fill: 'rgb(10,50,19)' }}
          to={{
            x: flag ? this.props.x1 : this.props.x2,
            y: flag ? this.props.y1 : this.props.y2,
            shadowBlur: flag ? 25 : 5,
            fill: flag ? 'seagreen' : 'hotpink',
            width: flag ? 10 : 10,
            height: flag ? 10 : 10
          }}
        >
          {props => (
            <animated.Rect {...props} onClick={this.handleClick} rotation={this.props.angle} />
          )}
        </Spring>
      );
    }
}
export default BlockAnimation;
