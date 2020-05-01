/* eslint-disable */
import React from 'react';
import Rectangle from './Rectangle';
import Tail from './Tail';

class Validator extends React.Component {
  render() {

    console.log('this.props'+ JSON.stringify(this.props))
    let x1 = this.props.x;
    let y1 = this.props.y;
    let x2 = this.props.x;
    let y2 = this.props.y;
    let color = '#C31169';
    let opacity = 1;
    if (!this.props.isKusama) {
      color = '#9335A3';
    }
    
    return (
      <React.Fragment>
        <Tail
          x={x2 / 2}
          y={y2 / 2}
          angle={this.props.angle}
          opacity={opacity}
        />
        <Rectangle
          x={x1 / 2}
          y={y1 / 2}
          angle={this.props.angle}
          validatorAddress={this.props.validatorAddress}
          isMainWrapper={this.props.isMainWrapper}
          isKusama={this.props.isKusama}
          color={color}
        />
      </React.Fragment>
    );
  }
}

export default Validator;
