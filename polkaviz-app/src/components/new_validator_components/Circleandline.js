import React from 'react';
import { Circle, Line, Text, Rect } from 'react-konva';

class Circleandline extends React.Component {
  constructor() {
    super();
    this.state = {
      showNominatorAddress: false,
    };
  }
  handleOnMouseOver = e => {
    e.target.setAttrs({
      scaleX: 1.3,
      scaleY: 1.3,
    });
    document.body.style.cursor = 'pointer';
    this.setState({ showNominatorAddress: true });
  };
  handleOnMouseOut = e => {
    e.target.setAttrs({
      scaleX: 1,
      scaleY: 1,
    });
    document.body.style.cursor = 'default';
    this.setState({ showNominatorAddress: false });
  };
  handleClick = () => {
    document.body.style.cursor = 'default';
    this.props.history.push({
      pathname: '/alexander/nominator/' + this.props.text,
      state: { totalinfo: this.props.totalinfo, valinfo: this.props.valinfo },
    });
  };

  render() {
    let nomaddress =
      'stashId: ' +
      this.props.nomId.toString().slice(0, 8) +
      '......' +
      this.props.nomId.toString().slice(-8);

    let nombonded = 'Bonded: ' + this.props.stake.toString().slice(0, 7) + ' DOT';

    let x1 = this.props.x - 300;
    let y1 = this.props.y  -30;

    return (
      <React.Fragment>
        <Line
          points={[this.props.x, this.props.y, this.props.x2, this.props.y2]}
          stroke="white"
          opacity={0.3}
        />
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={7}
          fill="#2BCACA"
          onMouseOver={this.handleOnMouseOver}
          onMouseOut={this.handleOnMouseOut}
          // onClick={this.handleClick}
        />

        {this.state.showNominatorAddress && (
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
        )}

        {this.state.showNominatorAddress && (
          <Text text={nomaddress} x={x1 + 20} y={y1 + 10} fill="#FFFFFF" />
        )}
        {this.state.showNominatorAddress && (
          <Text text={nombonded} x={x1 + 20} y={y1 + 30} fill="#FFFFFF" />
        )}
      </React.Fragment>
    );
  }
}
export default Circleandline;
