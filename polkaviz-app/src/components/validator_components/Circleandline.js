import React from "react";
import { Circle, Line, Text, Rect } from "react-konva";

class Circleandline extends React.Component {
  constructor() {
    super();
    this.state = {
      showNominatorAddress: false
    };
  }
  handleOnMouseOver = (e) => {
    e.target.setAttrs({
      scaleX: 1.3,
      scaleY: 1.3
    });
    document.body.style.cursor = "pointer";
    this.setState({ showNominatorAddress: true });
  };
  handleOnMouseOut = (e) => {
    e.target.setAttrs({
      scaleX: 1,
      scaleY: 1
    });
    document.body.style.cursor = "default";
    this.setState({ showNominatorAddress: false });
  };
  handleClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname: "/nominator/" + this.props.text,
      state: { totalinfo: this.props.totalinfo, valinfo: this.props.valinfo }
    });
  };

  render() {
    // console.log(this.props.totalinfo)
    let nomaddress = "accountId: " + 
      this.props.text.toString().slice(0, 8) +
      "......" +
      this.props.text.toString().slice(-8);

    let totalbonded = this.props.nombonded/Math.pow(10,15)
    let nombonded = "Bonded: " + totalbonded.toString().slice(0,7) + " DOT"
    return (
      <React.Fragment>
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={7}
          fill="white"
          onMouseOver={this.handleOnMouseOver}
          onMouseOut={this.handleOnMouseOut}
          onClick={this.handleClick}
        />
        <Line
          points={[this.props.x, this.props.y, this.props.x2, this.props.y2]}
          stroke="white"
          opacity={0.3}
        />

        {this.state.showNominatorAddress && (
          <Rect
            x={this.props.x - 290}
            y={this.props.y - 30}
            width={260}
            height={50}
            cornerRadius={4.69457}
            fill="#333333"
            shadowOffsetY={10}
            shadowBlur={10}
            shadowColor="black"
            shadowOpacity={0.5}
          />
        )}

        {this.state.showNominatorAddress && (
          <Text
            text={nomaddress}
            x={this.props.x - 270}
            y={this.props.y - 20}
            fill="#FFFFFF"
          />
        )}
        {this.state.showNominatorAddress && (
          <Text
            text={nombonded}
            x={this.props.x - 270}
            y={this.props.y }
            fill="#FFFFFF"
          />
        )}
      </React.Fragment>
    );
  }
}
export default Circleandline;
