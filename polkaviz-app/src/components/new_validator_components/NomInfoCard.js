import React from "react";
import { Circle, Line, Text, Rect } from "react-konva";

class NomInfoCard extends React.Component {
  handleOnMouseOver = (e) => {
    e.target.setAttrs({
      scaleX: 1.3,
      scaleY: 1.3,
    });
    document.body.style.cursor = "pointer";
    this.setState({ showNominatorAddress: true });
  };
  handleOnMouseOut = (e) => {
    e.target.setAttrs({
      scaleX: 1,
      scaleY: 1,
    });
    document.body.style.cursor = "default";
    this.setState({ showNominatorAddress: false });
  };
  handleClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname: "/alexander/nominator/" + this.props.text,
      state: { totalinfo: this.props.totalinfo, valinfo: this.props.valinfo },
    });
  };

  render() {
    let nomaddress = this.props.nomInfo.nomaddress;

    let nombonded = this.props.nomInfo.nombonded;

    let x1 = this.props.nomInfo.x - 300;
    let y1 = this.props.nomInfo.y - 30;

    return (
      <React.Fragment>
        <Rect
          x={x1}
          y={y1}
          width={260}
          height={50}
          cornerRadius={4.69457}
          fill="#333333"
          shadowOffsetY={10}
          shadowBlur={10}
          shadowColor="black"
          shadowOpacity={0.5}
        />

        <Text text={nomaddress} x={x1 + 20} y={y1 + 10} fill="#FFFFFF" />
        <Text text={nombonded} x={x1 + 20} y={y1 + 30} fill="#FFFFFF" />
      </React.Fragment>
    );
  }
}
export default NomInfoCard;
