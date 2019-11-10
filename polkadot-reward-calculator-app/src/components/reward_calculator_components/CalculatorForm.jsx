import React from "react";
import {
    Box,
    Stack,
    Input,
    FormControl,
    Heading,
    FormLabel
} from "@chakra-ui/core";

class CalculatorForm extends React.Component {
    render() {
        const {
			colorMode,
            stakeAmount,
            dailyEarning,
            maxReward,
            validatorAddress,
            validatorPayment,
            handleStateChange
        } = this.props;
        return (
            <React.Fragment>
                <Box>
                    With a <b>{stakeAmount} DOT</b> stake you could be earning upto: &nbsp;
                    <Box
                        backgroundColor="tomato"
                        width="fit-content"
                        borderRadius={4}
                        px={4}
                        py={2}
                        mt={3}
                    >
                        <Heading
                            as="h3"
                            size="lg"
                            color={colorMode === "light" ? "#fff" : "gray.900"}
                        >
                            {maxReward === 0 ? "0" : maxReward} DOTs
                            daily!
                        </Heading>
                    </Box>
                </Box>
                <Stack mt={8} spacing={6} direction="horizontal">
                    <FormControl mr={8}>
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
            </React.Fragment>
        );
    }
}

export default CalculatorForm;
