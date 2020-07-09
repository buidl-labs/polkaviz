import React from 'react';
import Circleandline from './Circleandline';

class WhiteCircles extends React.Component {
  render() {
    console.log('whitecircle');
    let angle = (2 / 3) * Math.PI;
    let maxAngle = (2 / 3) * Math.PI;
    var arr = [];

    console.log(this.props);

    if (this.props.valinfo.stakingInfo.nominators > 5) {
      angle = Math.PI / 4;
      maxAngle = (3 / 4) * 2 * Math.PI;
    }

    this.props.valinfo.stakingInfo.nominatorsInfo.forEach((element, index) => {
      angle += maxAngle / (Number(this.props.valinfo.stakingInfo.nominatorsInfo.length) + 1);
      arr.push(
        <Circleandline
          key={index}
          x={this.props.r * Math.cos(angle) + this.props.x}
          y={this.props.r * Math.sin(angle) + this.props.y}
          x2={this.props.x}
          y2={this.props.y}
          nomId={element.nomId}
          stake={element.stake}
          history={this.props.history}
          angle={angle}
          radius={this.props.r}
        />,
      );
    });

    return arr;
  }
}

export default WhiteCircles;
