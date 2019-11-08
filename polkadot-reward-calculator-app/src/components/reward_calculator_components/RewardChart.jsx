import React from "react";
import { Chart, Tooltip, Geom, Coord } from "bizcharts";

class RewardChart extends React.Component {
	render() {
		const {
			validators,
			chartStake,
			validatorPoolReward,
			handleChartClick
		} = this.props;
		const EXPECTED_NUM_OF_ERA_PER_DAY = 24;
		const validatorData = validators.map(validator => {
			const currentUserStakeFraction =
				chartStake /
				(chartStake + validator.totalStake);
			const currentExpectedReward =
				(validatorPoolReward - validator.payment) * currentUserStakeFraction;
			const currentDailyEarning =
				currentExpectedReward <= 0 || isNaN(currentExpectedReward)
					? 0
					: currentExpectedReward * EXPECTED_NUM_OF_ERA_PER_DAY;
			return {
				address:
					validator.address.toString().slice(0, 4) +
					"...." +
					validator.address.toString().slice(-5),
				reward: currentDailyEarning,
				completeAddress: validator.address.toString()
			};
		});

		return (
			<Chart
				height={450}
				data={validatorData}
				onPlotClick={ev =>
					ev.data === undefined
						? console.error(
								"Validator's address couldn't be found: This could happen on clicking a validator with 0 expected reward or on clicking outside the visible plot"
						  )
						: handleChartClick(ev.data._origin.completeAddress)
				}
				forceFit
			>
				<Coord type="polar" innerRadius={0.2} />
				<Tooltip />
				<Geom
					type="intervalStack"
					color="address"
					position="address*reward"
					style={{
						lineWidth: 2,
						stroke: this.props.colorMode === "light" ? "#1A202C" : "#fff"
					}}
				/>
			</Chart>
		);
	}
}

export default RewardChart;
