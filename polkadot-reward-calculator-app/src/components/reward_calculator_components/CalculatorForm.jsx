import React from "react";
import {
    Stack,
    Input,
    FormControl,
    FormLabel,
    Box,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    CircularProgress
} from "@chakra-ui/core";

class CalculatorForm extends React.Component {
    render() {
        const {
            stakeAmount,
            dailyEarning,
            maxReward,
            validatorAddress,
            validatorPayment,
            handleStateChange
        } = this.props;
        return (
            <Box>
                <Stat
                    mt={4}
                    p={4}
                    textAlign="center"
                    backgroundColor="tomato"
                    borderRadius={4}
                >
                    <StatLabel>Earn upto</StatLabel>
                    <StatNumber>
                        {maxReward === "" ? (
                            <CircularProgress
                                isIndeterminate
                                as="span"
                                color="white"
                                my={3}
                            ></CircularProgress>
                        ) : (
                            `${maxReward} DOTs`
                        )}
                    </StatNumber>
                    <StatHelpText>for {stakeAmount} DOT(s) stake</StatHelpText>
                </Stat>
                <Stack mt={8} spacing={6} direction="horizontal">
                    <FormControl flexGrow={1}>
                        <FormLabel htmlFor="stakeAmount">
                            Stake Amount (in DOTs)
                        </FormLabel>
                        <Input
                            name="stakeAmount"
                            placeholder="No. of DOTs"
                            value={stakeAmount}
                            onChange={handleStateChange}
                        />
                    </FormControl>
                </Stack>
                <Stack spacing={6} direction="horizontal">
                    <FormControl mr={8}>
                        <FormLabel htmlFor="validatorAddress">
                            Validator's Address
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
                </Stack>
                <Stack spacing={6}>
                    <FormControl>
                        <FormLabel htmlFor="dailyEarning">
                            Daily Earning:
                        </FormLabel>
                        <Input
                            name="dailyEarning"
                            placeholder="Daily Earning"
                            value={dailyEarning}
                            readOnly
                        />
                    </FormControl>
                </Stack>
            </Box>
        );
    }
}

export default CalculatorForm;
