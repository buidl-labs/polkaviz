import React from "react";
import {
	Stack,
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText
} from "@chakra-ui/core";
import { ApiPromise, WsProvider } from "@polkadot/api";

class CalculatorForm extends React.Component {
	constructor() {
		super();
		this.state = {
			currentEraReward: ""
		};
		this.mounted = true;
	}

	componentDidMount() {
		console.log("sessionsPerEra" + this.state.sessionsPerEra);

		this.createApi();
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	async createApi() {
		const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
		const api = await ApiPromise.create({ provider: provider });

		// let slotStake = await api.query.staking.slotStake;
		// let sessionsPerEra = await api.consts.staking.sessionsPerEra;

		let logger = await api.query;
		console.log(logger);

		let currentEraReward = await api.query.staking.currentEraReward();
		console.log(currentEraReward);

		if (this.mounted) {
			this.setState({
				...this.state,
				currentEraReward: currentEraReward
			});
		}
	}

	render() {
		return (
			<Stack spacing={6}>
				<FormControl>
					<FormLabel htmlFor="numDots">How many DOT’s do you have?</FormLabel>
					<Input name="numDots" placeholder="No. of DOTs" />
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="validatorAddress">
						Paste validator’s address or simply click on any validator from the
						graph.
					</FormLabel>
					<Input name="validatorAddress" placeholder="Validator's Address" />
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="commission">
						Validator payment/commission(in DOT’s)
					</FormLabel>
					<Input name="commission" placeholder="Commision in DOTs (optional)" />
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="dailyEarning">Daily Earning:</FormLabel>
					<Input name="dailyEarning" placeholder="Daily Earning" disabled />
				</FormControl>
			</Stack>
		);
	}
}

export default CalculatorForm;
