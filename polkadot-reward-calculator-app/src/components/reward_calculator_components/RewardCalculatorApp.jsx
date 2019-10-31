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
	constructor(props) {
		super(props);
		this.state = {
			stake: 100
		};
	}

	handleClick = value => {
		this.setState({
			stake: value
		});
	};

	render() {
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
						<RewardChart colorMode={this.props.colorMode} />
						<ButtonGroup spacing={4} textAlign="center" w="100%">
							<Text display="inline">Stake:</Text>
							<Button onClick={() => this.handleClick(1)}>1</Button>
							<Button onClick={() => this.handleClick(10)}>10</Button>
							<Button onClick={() => this.handleClick(100)}>100</Button>
						</ButtonGroup>
					</Box>
					<Box
						p={8}
						bg={this.props.colorMode === "light" ? "gray.200" : "gray.900"}
						h="fit-content"
					>
						<Heading as="h4" size="md" pb={4}>
							Rewards Calculator
						</Heading>
						<CalculatorForm />
					</Box>
				</Flex>
			</Stack>
		);
	}
}

export default RewardCalculatorApp;
