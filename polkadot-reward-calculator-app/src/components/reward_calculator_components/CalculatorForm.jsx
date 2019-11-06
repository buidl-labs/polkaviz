import React from "react";
import { Stack, Input, FormControl, FormLabel } from "@chakra-ui/core";

class CalculatorForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	calculateReward = (
		numDots,
		validatorPayment,
		validatorPoolReward,
		validatorPoolStake
	) => {
		const EXPECTED_NUM_OF_ERA_PER_DAY = 24;
		const expectedEraReward =
			((validatorPoolReward - validatorPayment) * numDots) /
			(numDots + validatorPoolStake);

		const dailyEarning =
			expectedEraReward <= 0 || isNaN(expectedEraReward)
				? 0
				: expectedEraReward * EXPECTED_NUM_OF_ERA_PER_DAY;

		return dailyEarning;
	};

	handleChange = e => {
		const { name, value } = e.target;
		const {
			numDots,
			validatorPayment,
			validatorPoolReward,
			validatorPoolStake
		} = this.props.state;
		this.props.handleStateChange(state => ({
			...state,
			[name]: value
		}));

		const dailyEarning = this.calculateReward(
			numDots,
			validatorPayment,
			validatorPoolReward,
			validatorPoolStake
		);
		this.props.handleStateChange(state => ({
			...state,
			dailyEarning: dailyEarning
		}));
		if (name === "validatorAddress") {
			this.createApi();
		}
	};

	render() {
		return (
			<Stack spacing={6}>
				<FormControl>
					<FormLabel htmlFor="numDots">How many DOT’s do you have?</FormLabel>
					<Input
						name="numDots"
						placeholder="No. of DOTs"
						// value={this.props.state.numDots}
						onChange={this.handleChange}
					/>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="validatorAddress">
						Paste validator’s address or simply click on any validator from the
						graph.
					</FormLabel>
					<Input
						name="validatorAddress"
						placeholder="Validator's Address"
						// value={this.props.state.validatorAddress}
						onChange={this.handleChange}
					/>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="validatorPayment">
						Validator payment/commission(in DOT’s)
					</FormLabel>
					<Input
						name="validatorPayment"
						placeholder="Commision in DOTs (optional)"
						// value={this.props.state.validatorPayment}
						onChange={this.handleChange}
					/>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="dailyEarning">Daily Earning:</FormLabel>
					<Input
						name="dailyEarning"
						placeholder="Daily Earning"
						// value={this.props.state.dailyEarning}
						readOnly
					/>
				</FormControl>
			</Stack>
		);
	}
}

export default CalculatorForm;
