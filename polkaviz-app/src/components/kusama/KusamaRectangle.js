import React from "react";
import { Rect } from "react-konva";

class Rectangle extends React.Component {
  render() {
    return (
      <>
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={5}
          height={10}
          fill={this.props.color}
          cornerRadius={4.69457}
          rotation={this.props.angle}
          onMouseOver={e => {
            // !this.props.isMainWrapper ? this.props.handleOnMouseOver : undefined
            if (!this.props.isMainWrapper) {
              this.props.handleOnMouseOver(e);
              this.props.setSpecificInfo({
                x: this.props.x,
                y: this.props.y,
                angle: this.props.angle,
                name: this.props.name,
                stashId: this.props.stashId,
                nomCount: this.props.nomCount,
                rewardsPer100KSM: this.props.rewardsPer100KSM,
                commission: this.props.commission,
                othersStake: this.props.othersStake,
                ownStake: this.props.ownStake,
                riskScore: this.props.riskScore,
                estimatedPoolReward: this.props.estimatedPoolReward
              });
            }
          }}
          onMouseOut={
            !this.props.isMainWrapper ? this.props.handleOnMouseOut : undefined
          }
          // onClick={this.handleClick}
        />
      </>
    );
  }
}

export default Rectangle;
