import React from "react";
import {
	Stack,
	Heading,
	Text,
	Box,
	Flex,
	ButtonGroup,
	Button
} from "@chakra-ui/core";
import RewardChart from "./RewardChart";
import CalculatorForm from "./CalculatorForm";

class RewardCalculatorApp extends React.Component {
	render() {
		const {
			validators,
			stakeAmount,
			chartStake,
			validatorPoolReward,
			dailyEarning,
			validatorAddress,
			validatorPayment,
			colorMode,
			handleStateChange,
			handleStakeChange,
			handleChartClick
		} = this.props;
		return (
			<Stack p={8} pt={2}>
				<Box>
					<Heading>Polkadot Network</Heading>
					<Text fontSize="xl">Rewards distribution</Text>
				</Box>
				<Flex>
					<Box>
						<Text>
							Below graph displays possible daily rewards for nominators if
							equal value staked to each validator in current system (in DOTs).
						</Text>
						<RewardChart
							colorMode={colorMode}
							chartStake={chartStake}
							validatorPoolReward={validatorPoolReward}
							validators={validators}
							handleChartClick={handleChartClick}
						/>
						<ButtonGroup spacing={4} textAlign="center" w="100%">
							<Text display="inline">Stake:</Text>
							<Button variantColor="teal" variant={chartStake === 1 ? "solid" : "outline"} onClick={() => handleStakeChange(1)}>1</Button>
							<Button variantColor="teal" variant={chartStake === 10 ? "solid" : "outline"} onClick={() => handleStakeChange(10)}>10</Button>
							<Button variantColor="teal" variant={chartStake === 100 ? "solid" : "outline"} onClick={() => handleStakeChange(100)}>100</Button>
						</ButtonGroup>
					</Box>
					<Box
						p={8}
						bg={colorMode === "light" ? "gray.200" : "gray.900"}
						h="fit-content"
					>
						<Heading as="h4" size="md" pb={4}>
							Rewards Calculator
						</Heading>
						<CalculatorForm
							stakeAmount={stakeAmount}
							dailyEarning={dailyEarning}
							validatorAddress={validatorAddress}
							validatorPayment={validatorPayment}
							handleStateChange={handleStateChange}
						/>
					</Box>
				</Flex>
			</Stack>
		);
	}
}

export default RewardCalculatorApp;
