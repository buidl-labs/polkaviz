import React from "react"


class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { elapsed: 0, test:"test" };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      // console.log(this.state.elapsed, this.props.counter);
      this.tick()
    }, 50);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick() {
    // console.log("here " + this.props.start)
    this.setState({elapsed: new Date() - this.props.start})
  }

  render() {
    var elapsed = Math.round(this.state.elapsed / 100);
    var seconds = (elapsed / 10).toFixed(1);
    
    return (
      <div className="counter">
        <p>last block: {seconds}</p>
      </div>
    );
  }
}

export default Counter