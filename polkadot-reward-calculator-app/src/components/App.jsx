import React from "react";
import { useColorMode, IconButton, Flex, Heading } from "@chakra-ui/core";
import { ApiPromise, WsProvider } from "@polkadot/api";
import RewardCalculatorApp from "./reward_calculator_components/RewardCalculatorApp";
import FAQs from "./FAQs";

function App() {
	const { colorMode, toggleColorMode } = useColorMode();
	const [state, setState] = React.useState({
		validators: [],
		stakeAmount: 1,
		chartStake: 1,
		maxReward: 0,
		validatorData: [],
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
				currentStakeInfo.stakers.total.toString() / 10 ** 15;
			const currentValidatorPayment =
				(await currentStakeInfo.validatorPrefs.validatorPayment.toString()) /
				10 ** 15;
			return {
				address: validator,
				payment: currentValidatorPayment,
				totalStake: currentTotalStake,
				stakeInfo: currentStakeInfo,
				accountId: currentStakeInfo.accountId.toString(),
				stashId: currentStakeInfo.stashId.toString()
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
			return (
				(validator.address.toString() === state.validatorAddress.toString()) ||
				(validator.stashId.toString() === state.validatorAddress.toString())
			);
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

	const validatorData = React.useCallback(() => {
		const EXPECTED_NUM_OF_ERA_PER_DAY = 24;
		const validatorData = state.validators.map(validator => {
			const currentUserStakeFraction =
				parseFloat(state.stakeAmount) /
				(parseFloat(state.stakeAmount) + validator.totalStake);
			const currentExpectedReward =
				(state.validatorPoolReward - validator.payment) *
				currentUserStakeFraction;
			const currentDailyEarning =
				currentExpectedReward <= 0 || isNaN(currentExpectedReward)
					? 0
					: currentExpectedReward * EXPECTED_NUM_OF_ERA_PER_DAY;
			return {
				address:
					validator.stashId.toString().slice(0, 4) +
					"...." +
					validator.stashId.toString().slice(-5),
				reward: currentDailyEarning,
				completeAddress: validator.address.toString(),
				stashId: validator.stashId.toString()
			};
		});
		if (state.mounted) {
			setState(state => ({
				...state,
				validatorData: validatorData
			}));
		}
	}, [
		state.stakeAmount,
		state.validatorPoolReward,
		state.validators,
		state.mounted
	]);

	const calculateMaxReward = (acc, curr) => {
		if (acc > curr.reward) {
		} else {
			acc = curr.reward;
		}
		return acc;
	};

	React.useEffect(() => {
		setState(state => ({
			...state,
			mounted: true
		}));
		createApi();
		calculateReward();
		validatorData();
	}, [createApi, calculateReward, validatorData]);

	React.useEffect(() => {
		const maxReward = state.validatorData.reduce(calculateMaxReward, 0);
		if (state.mounted) {
			setState(state => ({
				...state,
				maxReward: maxReward
			}));
		}
	}, [
		state.maxReward,
		state.mounted,
		state.validators,
		state.validatorData,
		state.validatorPoolReward
	]);

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

	const handleMaxReward = reward => {
		setState(state => ({
			...state,
			maxReward: reward
		}));
	};

	return (
		<Flex
			className="App"
			maxW="960px"
			justify="center"
			direction="column"
			m="auto"
			pb={8}
		>
			<Flex justify="flex-end" p={4} pb={2}>
				<a href="mailto:contact@saumyakaran.com">
					<IconButton
						icon="email"
						size="lg"
						mr={2}
						backgroundColor={colorMode === "light" ? "#fff" : "gray.800"}
					/>
				</a>
				<IconButton
					aria-label={
						colorMode === "light"
							? "Switch to dark mode"
							: "Switch to light mode"
					}
					icon={colorMode === "light" ? "moon" : "sun"}
					size="lg"
					onClick={toggleColorMode}
					backgroundColor={colorMode === "light" ? "#fff" : "gray.800"}
				/>
			</Flex>
			<RewardCalculatorApp
				colorMode={colorMode}
				validatorAddress={state.validatorAddress}
				validatorData={state.validatorData}
				validatorPayment={state.validatorPayment}
				stakeAmount={state.stakeAmount}
				maxReward={state.maxReward}
				chartStake={state.chartStake}
				dailyEarning={state.dailyEarning}
				handleStateChange={handleStateChange}
				handleStakeChange={handleStakeChange}
				handleChartClick={handleChartClick}
				handleMaxReward={handleMaxReward}
			/>
			<Heading as="h3" size="xl" textAlign="center" mb={3}>
				FAQs
			</Heading>
			<FAQs />
		</Flex>
	);
}

export default App;
