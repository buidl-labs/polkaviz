import React from "react";
import { Chart, Tooltip, Geom, Coord } from "bizcharts";

class RewardChart extends React.Component {
	render() {
		const data = [
			{
				validatorAddress: "5GeJHN5EcUGPoa5pUwYkXjymoDVN1DJHsBR4UGX4XRAwK1Ez",
				reward: 41.8
			},
			{
				validatorAddress: "5DPW1n4q2THUjKGj3QKkcqdh6oxY1bmLsSQ7t8FuiuNtRv4S",
				reward: 38
			},
			{
				validatorAddress: "5H4787dXL43BaA6PvTwUTyA38JBbfC9r8QyK3ay8Nozc2P5x",
				reward: 33.7
			},
			{
				validatorAddress: "5Dn8F1SUX6SoLt1BTfKEPL5VY9wMvG1A6tEJTSCHpLsinXsE",
				reward: 30.7
			},
			{
				validatorAddress: "5FZMFEsSuoxgaUskHZYumSjTtQKGeLc6WqENX5fiVVkCh3H1",
				reward: 25.8
			},
			{
				validatorAddress: "5HbNEayT7jK17PY2yusk7mkn7PHDJrt6jR5vfGkwCsGyrTv2",
				reward: 31.7
			},
			{
				validatorAddress: "5F1NY8eKat5dxtpEywCYf3e9Mf9d2PHadpivc7K3sj1sxXvH",
				reward: 33
			},
			{
				validatorAddress: "5CtRLJYD29w7CAKNMjkUTJdXKDe8SZayiVaQ6f2zqH8VqzZh",
				reward: 46
			},
			{
				validatorAddress: "5HgUrxpmBuh6swshBEA51V6yqQFQBPHv5sJrvhLQM5HXAhWu",
				reward: 38.3
			},
			{
				validatorAddress: "5CMHa3SFpmypbvr3sZtwdmevp5dLtHQPxV16GwHZKGfo3sHW",
				reward: 28
			},
			{
				validatorAddress: "5CNRyJMtfGYnqEuVWeuAbiURXKWLD5R2XCrzphcEnhDeN1wh",
				reward: 42.5
			},
			{
				validatorAddress: "5D3eDjcZGcYj3KUv2o2jc8fyntXtKBWU7GdcVyDGjfur1xoh",
				reward: 30.3
			}
		];

		const shortAddress = data.map(
			data =>
				data.validatorAddress.slice(0, 4) +
				"...." +
				data.validatorAddress.slice(-5)
		);
		const newData = shortAddress.map((address, index) => ({
			validatorAddress: address,
			reward: data[index].reward
		}));

		return (
			<Chart height={450} data={newData} forceFit>
				<Coord type="polar" innerRadius={0.2} />
				<Tooltip />
				<Geom
					type="interval"
					color="validatorAddress"
					position="validatorAddress*reward"
					style={{
						lineWidth: 2,
						stroke: this.props.colorMode === "light" ? "#fff" : "#1A202C"
					}}
				/>
			</Chart>
		);
	}
}

export default RewardChart;
