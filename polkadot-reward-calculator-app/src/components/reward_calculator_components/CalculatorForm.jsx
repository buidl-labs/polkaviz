import React from "react";
import { Stack, Input, FormControl, FormLabel } from "@chakra-ui/core";

class CalculatorForm extends React.Component {
	render() {
		const {
			stakeAmount,
			dailyEarning,
			validatorAddress,
			validatorPayment,
			handleStateChange
		} = this.props;
		return (
			<Stack spacing={6}>
				<FormControl>
					<FormLabel htmlFor="stakeAmount">
						How many DOT’s do you have?
					</FormLabel>
					<Input
						name="stakeAmount"
						placeholder="No. of DOTs"
						value={stakeAmount}
						onChange={handleStateChange}
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
						value={validatorAddress}
						onChange={handleStateChange}
					/>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="validatorPayment">
						Validator payment/commission (in DOT’s)
					</FormLabel>
					<Input
						name="validatorPayment"
						placeholder="Commision in DOTs (optional)"
						value={validatorPayment}
						onChange={handleStateChange}
					/>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="dailyEarning">Daily Earning:</FormLabel>
					<Input
						name="dailyEarning"
						placeholder="Daily Earning"
						value={dailyEarning}
						readOnly
					/>
				</FormControl>
			</Stack>
		);
	}
}

export default CalculatorForm;
