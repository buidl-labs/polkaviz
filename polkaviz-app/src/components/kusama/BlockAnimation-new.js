import React from 'react';
import HexagonBase from './HexagonBase-new';
import TriangleLid from './TriangleLid-new';

class BlockAnimationNew extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.angle !== nextProps.angle;
  }
  handleClick = () => this.setState(state => ({ flag: !state.flag }));
  render() {
    const hexagonRadius = 6;
    const duration = 1000;
    return (
      <React.Fragment>
        <HexagonBase
          x1={this.props.x1}
          x2={this.props.x2}
          y1={this.props.y1}
          y2={this.props.y2}
          angle={this.props.angle}
          hexagonRadius={hexagonRadius}
          duration={duration}
        />
        <TriangleLid
          x1={this.props.x1}
          x2={this.props.x2}
          y1={this.props.y1}
          y2={this.props.y2}
          angle={this.props.angle}
          hexagonRadius={hexagonRadius}
          theta={60}
          duration={duration}
        />
        <TriangleLid
          x1={this.props.x1}
          x2={this.props.x2}
          y1={this.props.y1}
          y2={this.props.y2}
          angle={this.props.angle}
          hexagonRadius={hexagonRadius}
          theta={120}
          duration={duration}
        />
      </React.Fragment>
    );
  }
}
export default BlockAnimationNew;
