import React from "react";
import {
	VictoryChart,
    VictoryBar,
    VictoryAxis,
	VictoryTooltip,
	VictoryTheme,
	VictoryVoronoiContainer
} from "victory";

class RewardChart extends React.Component {
	render() {
		const { colorMode, validatorData, handleChartClick } = this.props;

		if (validatorData !== []) {
			return (
				<VictoryChart
					horizontal
					theme={VictoryTheme.material}
					height={1000}
					width={1000}
					padding={{ top: 80, bottom: 80, left: 100, right: 40 }}
					domainPadding={{ x: 8, y: 8 }}
					style={{
						labels: {
							fontSize: 24,
							fill: colorMode === "light" ? "#1A202C" : "rgb(236, 239, 241)",
							padding: 15
						}
					}}
					events={[
						{
							childName: "bar",
							target: "data",
							eventHandlers: {
								onClick: () => [
									{
										childName: "all",
										target: "data",
										mutation: props =>
											props.datum !== undefined
												? handleChartClick(props.datum.stashId)
												: ""
									},
									{
										childName: "all",
										target: "data",
										mutation: props => {
											const fill = props.style && props.style.fill;
											return fill === "tomato"
												? null
												: { style: { fill: "tomato" } };
										}
									}
								]
							}
						}
					]}
					containerComponent={
						<VictoryVoronoiContainer
							labels={({ datum }) =>
								`Validator Address: ${datum.address}\nReward: ${datum.reward}`
							}
							voronoiDimension="x"
							labelComponent={
								<VictoryTooltip horizontal constrainToVisibleArea />
							}
						/>
					}
				>
					<VictoryAxis />
                    <VictoryAxis dependentAxis />
					<VictoryBar
						name="bar"
						standalone={true}
						sortKey="y"
						style={{
							data: {
								fill: colorMode === "light" ? "#1A202C" : "rgb(236, 239, 241)",
								cursor: "pointer"
							},
							labels: { fontSize: 12 }
						}}
						data={validatorData}
						x="address"
						y="reward"
					/>
				</VictoryChart>
			);
		}
	}
}

export default RewardChart;
