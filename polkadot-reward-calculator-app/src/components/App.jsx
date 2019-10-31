import React from "react";
import { Box, useColorMode, IconButton, Flex } from "@chakra-ui/core";
import RewardCalculatorApp from "./reward_calculator_components/RewardCalculatorApp.jsx";

function App() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box className="App">
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
			<RewardCalculatorApp colorMode={colorMode} />
		</Box>
	);
}

export default App;
