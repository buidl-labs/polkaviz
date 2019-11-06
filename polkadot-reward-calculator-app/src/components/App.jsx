import React from "react";
import { useColorMode, IconButton, Flex } from "@chakra-ui/core";
import RewardCalculatorApp from "./reward_calculator_components/RewardCalculatorApp.jsx";
import { ApiPromise, WsProvider } from "@polkadot/api";

function App() {
	const { colorMode, toggleColorMode } = useColorMode();
	const [state, setState] = React.useState({
		validators: [],
		numDots: 1,
		validatorAddress: "5CFce5AiAk1j1FL1VKq1fK4oBEuo2uo5reMgtCVWVP4c5Nxq",
		validatorPayment: "",
		validatorPoolStake: "",
		userStakeFraction: "",
		dailyEarning: "",
		mounted: false
	});

	const createApi = React.useCallback(async () => {
		const EXPECTED_NUM_OF_ERA_PER_DAY = 24;
		const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
		const api = await ApiPromise.create({ provider: provider });

		const [currentSessionReward, validators] = await Promise.all([
			api.query.staking.currentSessionReward(),
			api.query.session.validators()
		]);

		const validatorPoolReward = (currentSessionReward * 6) / 10 ** 12;
		const validatorAddressList = validators.map(async validator => {
			const currentStakeInfo = await api.derive.staking.info(validator);
			const currentTotalStake = currentStakeInfo.stakers.total.toString() / 10 ** 15;
			const currentValidatorPayment = await currentStakeInfo.validatorPrefs.validatorPayment.toString();
			const currentUserStakeFraction =
				state.numDots / (state.numDots + currentTotalStake);
			const currentExpectedReward =
				(validatorPoolReward - currentValidatorPayment) *
				currentUserStakeFraction;

			const currentDailyEarning =
				currentExpectedReward <= 0 || isNaN(currentExpectedReward)
					? 0
					: currentExpectedReward * EXPECTED_NUM_OF_ERA_PER_DAY;
			return {
				address: validator,
				reward: currentDailyEarning,
				payment: currentValidatorPayment,
				userStake: currentUserStakeFraction,
				totalStake: currentTotalStake,
				stakers: currentTotalStake
			};
		});
		const validatorList = await Promise.all(validatorAddressList);
		if (state.mounted) {
			setState(state => ({
				...state,
				validators: validatorList
			}));
		}
		console.log(validatorList);
	}, [state.numDots, state.mounted]);

	React.useEffect(() => {
		setState(state => ({
			...state,
			mounted: true
		}));
		createApi();
	}, [createApi]);

	return (
		<Flex
			className="App"
			maxW="960px"
			justify="center"
			direction="column"
			m="auto"
		>
			<Flex justify="flex-end" p={4} pb={2}>
				<IconButton
					aria-label={
						colorMode === "light"
							? "Switch to dark mode"
							: "Switch to light mode"
					}
					icon={colorMode === "light" ? "moon" : "sun"}
					onClick={toggleColorMode}
				/>
			</Flex>
			<RewardCalculatorApp
				colorMode={colorMode}
				validators={state.validators}
			/>
		</Flex>
	);
}

export default App;
