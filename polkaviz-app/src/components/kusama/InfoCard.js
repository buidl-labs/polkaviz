import React from "react";
import { Rect, Text } from "react-konva";

class InfoCard extends React.Component {
  render() {
    let x1 = this.props.specificInfo.x;
    let y1 = this.props.specificInfo.y;
    let valtext = "fetching validator info";
    valtext =
      this.props.specificInfo.name != null
        ? `${this.props.specificInfo.name}`
        : this.props.specificInfo.stashId.slice(0, 8) +
          "....." +
          this.props.specificInfo.stashId.slice(-8);
    // console.log(this.props.specificInfo.angle)
    if (this.props.specificInfo.angle <= 45 && this.props.specificInfo.angle >= 0) {
      x1 = this.props.specificInfo.x + 50;
      y1 = this.props.specificInfo.y - 80;
    }
    if (this.props.specificInfo.angle < 0 && this.props.specificInfo.angle > -45) {
      x1 = this.props.specificInfo.x - 50;
      y1 = this.props.specificInfo.y - 140;
    }
    if (this.props.specificInfo.angle <= -45 && this.props.specificInfo.angle > -135) {
      x1 = this.props.specificInfo.x - 285;
      y1 = this.props.specificInfo.y;
    }
    if (this.props.specificInfo.angle <= 135 && this.props.specificInfo.angle > 45) {
      x1 = this.props.specificInfo.x + 50;
      y1 = this.props.specificInfo.y;
    }
    if (this.props.specificInfo.angle <= -135 && this.props.specificInfo.angle > -180) {
      x1 = this.props.specificInfo.x - 50;
      y1 = this.props.specificInfo.y + 50;
    }
    if (this.props.specificInfo.angle <= 180 && this.props.specificInfo.angle > 135) {
      x1 = this.props.specificInfo.x + 50;
      y1 = this.props.specificInfo.y;
    }
    return <React.Fragment>
        {!this.props.isMainWrapper && (
          <Rect
            x={x1 + 20 * Math.sin(this.props.specificInfo.angle * 0.0174533) - 10}
            y={y1 - 20 * Math.cos(this.props.specificInfo.angle * 0.0174533) - 10}
            width={260}
            height={120}
            cornerRadius={4.69457}
            fill={"#333333"}
            shadowOffsetY={10}
            shadowBlur={10}
            shadowColor="black"
            shadowOpacity={0.5}
          />
        )}
        {!this.props.isMainWrapper && (
          <Text
            text={valtext}
            x={x1 + 20 * Math.sin(this.props.specificInfo.angle * 0.0174533)}
            y={y1 - 20 * Math.cos(this.props.specificInfo.angle * 0.0174533) + 10}
            fontFamily="Roboto Mono"
            align="center"
            fill="#FFFFFF"
          />
        )}
        {!this.props.isMainWrapper && (
          <Text
            text={
              this.props.isKusama &&
              this.props.intentions.includes(this.props.validatorAddress)
                ? this.props.commission
                : this.props.nominators
            }
            x={x1 + 20 * Math.sin(this.props.specificInfo.angle * 0.0174533)}
            y={y1 - 20 * Math.cos(this.props.specificInfo.angle * 0.0174533) + 30}
            align="center"
            fill="#FFFFFF"
          />
        )}
        {!this.props.isMainWrapper && (
          <Text
            text={`${this.props.bondvalue} \n${this.props.validatorSelfStake} \n${this.props.nominatorsStake} \nClick to see validator details`}
            x={x1 + 20 * Math.sin(this.props.specificInfo.angle * 0.0174533)}
            y={y1 - 20 * Math.cos(this.props.specificInfo.angle * 0.0174533) + 50}
            align="center"
            fill="#FFFFFF"
          />
        )}
        {!this.props.isMainWrapper &&
          !this.props.isKusama && (
            <Text
              text="Click to show Validator Analytics"
              x={x1 + 20 * Math.sin(this.props.specificInfo.angle * 0.0174533)}
              y={y1 - 20 * Math.cos(this.props.specificInfo.angle * 0.0174533) + 80}
              align="center"
              fill="#9099B6"
            />
          )}
      </React.Fragment>
  }
}

export default InfoCard;
