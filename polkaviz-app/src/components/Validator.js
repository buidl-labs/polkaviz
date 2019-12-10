import React from "react";
import Rectangle from "./Rectangle";
import Tail from "./Tail";

class Validator extends React.Component {
	render() {
		let bondvalue = "";
		let nomvalue = 0;
		let commission = "";
		if (!this.props.isMainWrapper && this.props.intentions.length !== 0) {
			bondvalue = "Bonded: No Data found";
			nomvalue = "Backed by: No Data found";
			if (!this.props.isKusama) {
				let totalvalue =
					parseInt(this.props.valinfo.stakers.total) / Math.pow(10, 15);
				let ownvalue =
					parseInt(this.props.valinfo.stakers.own) / Math.pow(10, 15);
				let totalbonded = 0;
				if (this.props.intentions.includes(this.props.validatorAddress)) {
					totalvalue = parseInt(this.props.valinfo.stakingLedger.total);
					ownvalue = parseInt(this.props.valinfo.stakingLedger.total);
				}
				// console.log('totalbonded: '+ parseInt(totalbonded) + ' totalvalue: '+ parseInt(totalvalue) + ' ownvalue: ' + parseInt(ownvalue));

				totalbonded = totalvalue.toFixed(3) - ownvalue.toFixed(3);
				bondvalue =
					"Bonded: " +
					ownvalue.toString().slice(0, 5) +
					" (+ " +
					totalbonded.toString().slice(0, 5) +
					" ) DOT";
				nomvalue =
					"Backed by: " +
					this.props.valinfo.stakers.others.length +
					" nominators";
			}

			if (this.props.isKusama) {
				let totalvalue =
					parseFloat(this.props.valinfo.stakers.total) / Math.pow(10, 12);
				let ownvalue =
					parseFloat(this.props.valinfo.stakers.own) / Math.pow(10, 12);
				let totalbonded = parseFloat(
					(this.props.valinfo.stakers.total - this.props.valinfo.stakers.own) /
						Math.pow(10, 12)
				);
				totalbonded = totalbonded.toFixed(3);
				bondvalue =
					"Bonded: " +
					ownvalue.toString().slice(0, 8) +
					" (+ " +
					totalbonded.toString().slice(0, 8) +
					" ) KSM";
				nomvalue =
					"Backed by: " +
					this.props.valinfo.stakers.others.length +
					" nominators";

				if (this.props.intentions.includes(this.props.validatorAddress)) {
					totalvalue = parseFloat(
						this.props.valinfo.stakingLedger.total / Math.pow(10, 12)
					);
					bondvalue = "Bonded: " + totalvalue.toString().slice(0, 8) + " KSM";
					// console.log(value)
					let commissionvalue = this.props.valinfo.validatorPrefs.commission;
					commissionvalue = commissionvalue / Math.pow(10, 9);
					commissionvalue = commissionvalue.toFixed(3);
					commission = "commission: " + commissionvalue + "%";
				}
			}
		}
		let x1 = this.props.x;
		let y1 = this.props.y;
		let x2 = this.props.x;
		let y2 = this.props.y;
		let color = "#C31169";
		let opacity = 1;
		if (!this.props.isKusama) {
			color = "#9335A3";
		}
		if (!this.props.isMainWrapper) {
			if (this.props.intentions.includes(this.props.validatorAddress)) {
				x1 = ((x1 - window.innerWidth) / 360) * 390 + window.innerWidth;
				y1 = ((y1 - window.innerHeight) / 360) * 390 + window.innerHeight;
				color = "yellow";
				opacity = 0;
			}
		}
		return (
			<React.Fragment>
				<Tail
					x={x2 / 2}
					y={y2 / 2}
					angle={this.props.angle}
					opacity={opacity}
				/>
				<Rectangle
					x={x1 / 2}
					y={y1 / 2}
					angle={this.props.angle}
					validatorAddress={this.props.validatorAddress}
					valinfo={this.props.valinfo}
					bondvalue={bondvalue}
					nominators={nomvalue}
					commission={commission}
					nominatorinfo={this.props.nominatorinfo}
					history={this.props.history}
					totalinfo={this.props.totalinfo}
					isMainWrapper={this.props.isMainWrapper}
					isKusama={this.props.isKusama}
					intentions={this.props.intentions}
					color={color}
				/>
			</React.Fragment>
		);
	}
}

export default Validator;
