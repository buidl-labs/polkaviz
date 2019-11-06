import React from "react";
import { Chart, Tooltip, Geom, Coord } from "bizcharts";

class RewardChart extends React.Component {
	render() {
		const { validators } = this.props;

		const shortAddress = validators.map(
			validator =>
				validator.address.toString().slice(0, 4) +
				"...." +
				validator.address.toString().slice(-5)
		);
		const newData = shortAddress.map((address, index) => ({
			validatorAddress: address,
			reward: validators[index].reward
		}));

		return (
			<Chart height={450} data={newData} forceFit>
				<Coord type="polar" innerRadius={0.2} />
				<Tooltip />
				<Geom
					type="interval"
					color="validatorAddress"
					position="validatorAddress*reward"
					style={{
						lineWidth: 2,
						stroke: this.props.colorMode === "light" ? "#fff" : "#1A202C"
					}}
				/>
			</Chart>
		);
	}
}

export default RewardChart;
