import React from "react";
import KusamaRectangle from "./KusamaRectangle";
import Tail from "../Tail";

class Validator extends React.Component {
  render() {
    const x1 = this.props.x;
    const y1 = this.props.y;
    const x2 = this.props.x;
    const y2 = this.props.y;
    let color = "#C31169";
    const opacity = 1;
    if (!this.props.isKusama) {
      color = "#9335A3";
    }
    // if (!this.props.isMainWrapper) {
    //   if (this.props.intentions.includes(this.props.validatorAddress)) {
    //     x1 = ((x1 - window.innerWidth) / 360) * 390 + window.innerWidth;
    //     y1 = ((y1 - window.innerHeight) / 360) * 390 + window.innerHeight;
    //     color = 'yellow';
    //     opacity = 0;
    //   }
    // }
    return (
      <>
        <Tail
          x={x2 / 2}
          y={y2 / 2}
          angle={this.props.angle}
          opacity={opacity}
        />
        <KusamaRectangle
          x={x1 / 2}
          y={y1 / 2}
          angle={this.props.angle}
          name={this.props.name}
          stashId={this.props.stashId}
          nomCount={this.props.nomCount}
          showInfoCard={this.props.showInfoCard}
          rewardsPer100KSM={this.props.rewardsPer100KSM}
          commission={this.props.commission}
          othersStake={this.props.othersStake}
          ownStake={this.props.ownStake}
          riskScore={this.props.riskScore}
          estimatedPoolReward={this.props.estimatedPoolReward}
          handleOnMouseOver={this.props.handleOnMouseOver}
          handleOnMouseOut={this.props.handleOnMouseOut}
          setSpecificInfo={this.props.setSpecificInfo}
          history={this.props.history}
          totalinfo={this.props.totalinfo}
          isMainWrapper={this.props.isMainWrapper}
          isKusama={this.props.isKusama}
          intentions={this.props.intentions}
          color={color}
          onValidatorHover={this.props.onValidatorHover}
        />
      </>
    );
  }
}

export default Validator;
