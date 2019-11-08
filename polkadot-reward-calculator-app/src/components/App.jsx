import React from "react";
import { useColorMode, IconButton, Flex } from "@chakra-ui/core";
import RewardCalculatorApp from "./reward_calculator_components/RewardCalculatorApp.jsx";
import { ApiPromise, WsProvider } from "@polkadot/api";

function App() {
	const { colorMode, toggleColorMode } = useColorMode();
	const [state, setState] = React.useState({
		validators: [],
		stakeAmount: "",
		chartStake: 1,
		validatorAddress: "",
		validatorPayment: "",
		validatorPoolReward: "",
		dailyEarning: "",
		mounted: false
	});

	const createApi = React.useCallback(async () => {
		console.clear();
		const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
		const api = await ApiPromise.create({ provider: provider });

		const [currentSessionReward, validators] = await Promise.all([
			api.query.staking.currentSessionReward(),
			api.query.session.validators()
		]);

		const validatorPoolReward = (currentSessionReward * 6) / 10 ** 12;
		const validatorAddressList = validators.map(async validator => {
			const currentStakeInfo = await api.derive.staking.info(validator);
			const currentTotalStake =
				currentStakeInfo.stakers.total.toString() / 10 ** 12;
			const currentValidatorPayment = await currentStakeInfo.validatorPrefs.validatorPayment.toString() / 10 ** 12;

			return {
				address: validator,
				payment: currentValidatorPayment,
				totalStake: currentTotalStake,
				stakeInfo: currentStakeInfo
			};
		});
		const validatorList = await Promise.all(validatorAddressList);
		if (state.mounted) {
			setState(state => ({
				...state,
				validators: validatorList,
				validatorPoolReward: validatorPoolReward
			}));
		}
	}, [state.mounted]);

	const calculateReward = React.useCallback(() => {
		const EXPECTED_NUM_OF_ERA_PER_DAY = 24;

		const selectedValidator = state.validators.find(validator => {
			return validator.address.toString() === state.validatorAddress.toString();
		});
		if (selectedValidator !== undefined) {
			const currentUserStakeFraction =
				parseFloat(state.stakeAmount) /
				(parseFloat(state.stakeAmount) + selectedValidator.totalStake);
			const currentExpectedReward =
				(state.validatorPoolReward -
					(state.validatorPayment === ""
						? selectedValidator.payment
						: state.validatorPayment)) *
				currentUserStakeFraction;

			const currentDailyEarning =
				currentExpectedReward <= 0 || isNaN(currentExpectedReward)
					? 0
					: currentExpectedReward * EXPECTED_NUM_OF_ERA_PER_DAY;
			if (state.mounted) {
				setState(state => ({
					...state,
					selectedValidator: selectedValidator,
					dailyEarning: currentDailyEarning,
					validatorPayment: selectedValidator.payment
				}));
			}
		}
	}, [
		state.stakeAmount,
		state.validatorPoolReward,
		state.mounted,
		state.validatorAddress,
		state.validators,
		state.validatorPayment
	]);

	React.useEffect(() => {
		setState(state => ({
			...state,
			mounted: true
		}));
		createApi();
		calculateReward();
	}, [createApi, calculateReward]);

	const handleStateChange = e => {
		const { name, value } = e.target;
		setState(state => ({
			...state,
			[name]: value
		}));
	};

	const handleStakeChange = chartStake => {
		setState(state => ({
			...state,
			chartStake: chartStake
		}));
	};

	const handleChartClick = address => {
		setState(state => ({
			...state,
			validatorAddress: address
		}));
	};

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
				validatorAddress={state.validatorAddress}
				validatorPayment={state.validatorPayment}
				validatorPoolReward={state.validatorPoolReward}
				stakeAmount={state.stakeAmount}
				chartStake={state.chartStake}
				dailyEarning={state.dailyEarning}
				handleStateChange={handleStateChange}
				handleStakeChange={handleStakeChange}
				handleChartClick={handleChartClick}
			/>
		</Flex>
	);
}

export default App;
