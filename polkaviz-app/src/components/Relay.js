import React from 'react';
import { Circle } from 'react-konva';

class Relay extends React.Component {
  setCursorGrab = () => {
    document.body.style.cursor = 'grab';
  };
  setCursorDefault = () => {
    document.body.style.cursor = 'default';
  };
  setCursorGrabbing = () => {
    document.body.style.cursor = 'grabbing';
  };
  render() {
    let fillcolor = '#262733';
    let strokecolor = '#97A1BF';
    if (this.props.isKusama) {
      fillcolor = 'black';
      strokecolor = 'white';
    }
    return (
      <Circle
        x={this.props.x / 2}
        y={this.props.y / 2}
        onMouseOver={!this.props.isMainWrapper ? this.setCursorGrab : undefined}
        onMouseOut={
          !this.props.isMainWrapper ? this.setCursorDefault : undefined
        }
        onMouseDown={
          !this.props.isMainWrapper ? this.setCursorGrabbing : undefined
        }
        onMouseUp={
          !this.props.isMainWrapper ? this.setCursorGrab : undefined
        }
        radius={this.props.radius}
        fill={fillcolor}
        stroke={strokecolor}
        strokeWidth={4}
      />
    );
  }
}

export default Relay;
