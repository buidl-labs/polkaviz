import React from "react";
import {
    Stack,
    Heading,
    Text,
    Box,
    Alert,
    AlertIcon,
} from "@chakra-ui/core";
import RewardChart from "./RewardChart";
import CalculatorForm from "./CalculatorForm";

class RewardCalculatorApp extends React.Component {
    render() {
        const {
            validatorData,
            stakeAmount,
            dailyEarning,
            maxReward,
            validatorAddress,
            validatorPayment,
            colorMode,
            handleStateChange,
            handleChartClick,
            handleMaxReward
        } = this.props;
        return (
            <Stack p={8} pt={2}>
                <Box>
                    <Heading>Polkadot Network</Heading>
                    <Text fontSize="xl">Rewards distribution</Text>
                </Box>
                <Box>
                    <Box
                        my={8}
                        p={8}
                        bg={colorMode === "light" ? "gray.200" : "gray.900"}
                        h="fit-content"
                    >
                        <CalculatorForm
                            colorMode={colorMode}
                            stakeAmount={stakeAmount}
                            dailyEarning={dailyEarning}
                            maxReward={maxReward}
                            validatorAddress={validatorAddress}
                            validatorPayment={validatorPayment}
                            handleStateChange={handleStateChange}
                        />
                    </Box>
                    <Alert status="warning">
                        <AlertIcon />
                        The graph displays expected daily rewards for
                        nominators if equal value is staked to each validator in
                        current system (in DOTs). Actual rewards may vary.
                    </Alert>
                    <RewardChart
                        colorMode={colorMode}
                        validatorData={validatorData}
                        handleChartClick={handleChartClick}
                        handleMaxReward={handleMaxReward}
                    />
                </Box>
            </Stack>
        );
    }
}

export default RewardCalculatorApp;
