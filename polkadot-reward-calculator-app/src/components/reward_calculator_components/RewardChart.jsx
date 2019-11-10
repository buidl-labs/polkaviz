import React from "react";
import {
    VictoryChart,
    VictoryBar,
    VictoryTooltip,
    VictoryTheme
} from "victory";

class RewardChart extends React.Component {
    render() {
        const {
            colorMode,
            validatorData,
            handleChartClick
        } = this.props;

        if (validatorData !== []) {
            return (
                <VictoryChart
                    horizontal
                    theme={VictoryTheme.material}
                    height={700}
                    width={1000}
                    padding={{ top: 80, bottom: 80, left: 100, right: 40 }}
                    domainPadding={{ x: 8, y: 8 }}
                    style={{
                        labels: {
                            fontSize: 24,
                            fill:
                                colorMode === "light"
                                    ? "#1A202C"
                                    : "rgb(236, 239, 241)",
                            padding: 15
                        }
                    }}
                    events={[
                        {
                            childName: "all",
                            target: "data",
                            eventHandlers: {
                                onClick: () => [
                                    {
                                        childName: "all",
                                        target: "data",
                                        mutation: props =>
                                            props.datum !== undefined
                                                ? handleChartClick(
                                                      props.datum
                                                          .completeAddress
                                                  )
                                                : ""
                                    }
                                ]
                            }
                        }
                    ]}
                >
                    <VictoryBar
                        style={{
                            data: {
                                fill:
                                    colorMode === "light"
                                        ? "#1A202C"
                                        : "rgb(236, 239, 241)"
                            },
                            labels: { fontSize: 12 }
                        }}
                        data={validatorData}
                        labels={({ datum }) =>
                            `Validator Address: ${datum.address}\nReward: ${datum.reward}`
                        }
                        labelComponent={<VictoryTooltip horizontal />}
                        x="address"
                        y="reward"
                    />
                </VictoryChart>
            );
        }
    }
}

export default RewardChart;
