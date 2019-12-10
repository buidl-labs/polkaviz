import React from "react";
import { Line, Rect, Text } from "react-konva";

class Rectangleandlines extends React.Component {
	constructor() {
		super();
		this.state = {
			showValidatorAddress: false
		};
		this.pathArray = window.location.href.split("/");
	}
	handleOnMouseOver = e => {
		e.target.setAttrs({
			scaleX: 1.2,
			scaleY: 1.2
		});
		document.body.style.cursor = "pointer";
		this.setState({ showValidatorAddress: true });
	};
	handleOnMouseOut = e => {
		e.target.setAttrs({
			scaleX: 1,
			scaleY: 1
		});
		document.body.style.cursor = "default";
		this.setState({ showValidatorAddress: false });
	};
	handleClick = () => {
		let pathArray = window.location.href.split("/");

		document.body.style.cursor = "default";
		this.props.history.push({
			pathname:
				pathArray[4] === "kusama"
					? "/kusama/validator/" + this.props.valinfo.accountId
					: "/alexander/validator/" + this.props.valinfo.accountId,
			state: {
				totalinfo: this.props.totalinfo,
				valinfo: this.props.valinfo
			}
		});
	};
	render() {
		let valtext =
			"accountId: " +
			this.props.valinfo.accountId.toString().slice(0, 8) +
			"......" +
			this.props.valinfo.accountId.toString().slice(-8);
		let stakedtext =
			"Bonded: " +
			this.props.staked.toString().slice(0, 7) +
			(this.pathArray[4] === "kusama" ? " KSM" : " DOT");
		return (
			<React.Fragment>
				<Line
					points={[
						this.props.circ_x,
						this.props.circ_y,
						this.props.x - 12,
						this.props.y
					]}
					stroke="white"
					opacity={0.2}
				/>
				<Line
					points={[this.props.x, this.props.y, this.props.xline, this.props.y]}
					stroke="white"
					opacity={0.2}
				/>
				<Rect
					x={this.props.x - 12}
					y={this.props.y - 6}
					width={24}
					height={12}
					fill="purple"
					cornerRadius={10}
					onMouseOver={this.handleOnMouseOver}
					onMouseOut={this.handleOnMouseOut}
					onClick={this.handleClick}
				/>

				{this.state.showValidatorAddress && (
					<Text
						text={valtext}
						x={this.props.x - 12}
						y={this.props.y - 18}
						fill="#FFFFFF"
					/>
				)}
				{this.state.showValidatorAddress && (
					<Text
						text={stakedtext}
						x={this.props.x + 220}
						y={this.props.y - 18}
						fill="#FFFFFF"
					/>
				)}
			</React.Fragment>
		);
	}
}

export default Rectangleandlines;
