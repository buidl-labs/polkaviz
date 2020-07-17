import React from "react";
import Circleandline from "./Circleandline";

class WhiteCircles extends React.Component {
  render() {
    let angle = (2 / 3) * Math.PI;
    let maxAngle = (2 / 3) * Math.PI;
    const arr = [];

    if (this.props.councilinfo.backersInfo.length > 5) {
      angle = Math.PI / 4;
      maxAngle = (3 / 4) * 2 * Math.PI;
    }

    console.log(this.props.councilinfo.backersInfo);

    this.props.councilinfo.backersInfo.forEach((element, index) => {
      angle +=
        maxAngle / (Number(this.props.councilinfo.backersInfo.length) + 1);
      const radius = Math.floor(
        Math.random() * (this.props.maxRadius - 150) + 150
      );
      arr.push(
        <Circleandline
          key={index}
          x={radius * Math.cos(angle) + this.props.x}
          y={radius * Math.sin(angle) + this.props.y}
          x2={this.props.x}
          y2={this.props.y}
          nomId={element.backer}
          stake={element.stake}
          history={this.props.history}
          angle={angle}
          radius={this.props.r}
        />
      );
    });

    return arr;
  }
}

export default WhiteCircles;
