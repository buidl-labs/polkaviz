import React from 'react';
import { Rect, Text } from 'react-konva';

class Rectangle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showValidatorAddress: false };
  }

  handleOnMouseOver = e => {
    e.target.setAttrs({
      scaleX: 1.4,
      scaleY: 1.4,
    });
    document.body.style.cursor = 'pointer';
    this.setState({ showValidatorAddress: true });
  };
  handleOnMouseOut = e => {
    e.target.setAttrs({
      scaleX: 1,
      scaleY: 1,
    });
    document.body.style.cursor = 'default';
    this.setState({ showValidatorAddress: false });
  };
  handleClick = () => {
    document.body.style.cursor = 'default';
    if (!this.props.isKusama) {
      this.props.history.push({
        pathname: '/alexander/validator/' + this.props.validatorAddress,
        state: { totalinfo: this.props.totalinfo, valinfo: this.props.valinfo },
      });
    }

    if (this.props.isKusama) {
      console.log('clicked!');
      window.open(
        `https://polkanalytics.com/#/kusama/validator/${this.props.validatorAddress}`,
      );
    }
  };
  render() {
    let x1 = this.props.x;
    let y1 = this.props.y;
    // let x2 = this.props.x/
    let valtext = 'fetching validator information';
    if (!this.props.isMainWrapper && this.props.accountIndex !== undefined) {
      valtext = this.props.accountIndex
        ? `accountId: ${this.props.accountIndex}`
        : 'accountId: ' +
          this.props.validatorAddress.toString().slice(0, 8) +
          '......' +
          this.props.validatorAddress.toString().slice(-8);
      // console.log(this.props.angle)
    }
    if (this.props.angle <= 45 && this.props.angle >= 0) {
      x1 = this.props.x + 50;
      y1 = this.props.y - 80;
    }
    if (this.props.angle < 0 && this.props.angle > -45) {
      x1 = this.props.x - 50;
      y1 = this.props.y - 140;
    }
    if (this.props.angle <= -45 && this.props.angle > -135) {
      x1 = this.props.x - 285;
      y1 = this.props.y;
    }
    if (this.props.angle <= 135 && this.props.angle > 45) {
      x1 = this.props.x + 50;
      y1 = this.props.y;
    }
    if (this.props.angle <= -135 && this.props.angle > -180) {
      x1 = this.props.x - 50;
      y1 = this.props.y + 50;
    }
    if (this.props.angle <= 180 && this.props.angle > 135) {
      x1 = this.props.x + 50;
      y1 = this.props.y;
    }

    // if(this.props.intentions.includes(this.props.validatorAddress)){

    // }
    // let linkaddress = "/val/" + this.props.validatorAddress
    return (
      <React.Fragment>
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={6}
          height={12}
          fill={this.props.color}
          cornerRadius={4.69457}
          rotation={this.props.angle}
          onMouseOver={
            !this.props.isMainWrapper ? this.handleOnMouseOver : undefined
          }
          onMouseOut={
            !this.props.isMainWrapper ? this.handleOnMouseOut : undefined
          }
          onClick={this.handleClick}
        />

        {this.state.showValidatorAddress && !this.props.isMainWrapper && (
          <Rect
            x={x1 + 20 * Math.sin(this.props.angle * 0.0174533) - 10}
            y={y1 - 20 * Math.cos(this.props.angle * 0.0174533) - 10}
            width={260}
            height={120}
            cornerRadius={4.69457}
            fill={'#333333'}
            shadowOffsetY={10}
            shadowBlur={10}
            shadowColor="black"
            shadowOpacity={0.5}
          />
        )}
        {this.state.showValidatorAddress && !this.props.isMainWrapper && (
          <Text
            text={valtext}
            x={x1 + 20 * Math.sin(this.props.angle * 0.0174533)}
            y={y1 - 20 * Math.cos(this.props.angle * 0.0174533) + 10}
            fontFamily="Roboto Mono"
            fill="#FFFFFF"
          />
        )}
        {this.state.showValidatorAddress && !this.props.isMainWrapper && (
          <Text
            text={
              this.props.isKusama &&
              this.props.intentions.includes(this.props.validatorAddress)
                ? this.props.commission
                : this.props.nominators
            }
            x={x1 + 20 * Math.sin(this.props.angle * 0.0174533)}
            y={y1 - 20 * Math.cos(this.props.angle * 0.0174533) + 30}
            fill="#FFFFFF"
          />
        )}
        {this.state.showValidatorAddress && !this.props.isMainWrapper && (
          <Text
            text={`${this.props.bondvalue} \n${this.props.validatorSelfStake} \n${this.props.nominatorsStake} \nClick to see validator details`}
            x={x1 + 20 * Math.sin(this.props.angle * 0.0174533)}
            y={y1 - 20 * Math.cos(this.props.angle * 0.0174533) + 50}
            fill="#FFFFFF"
          />
        )}
        {this.state.showValidatorAddress &&
          !this.props.isMainWrapper &&
          !this.props.isKusama && (
            <Text
              text="Click to show Validator Analytics"
              x={x1 + 20 * Math.sin(this.props.angle * 0.0174533)}
              y={y1 - 20 * Math.cos(this.props.angle * 0.0174533) + 80}
              fill="#9099B6"
            />
          )}
      </React.Fragment>
    );
  }
}

export default Rectangle;
