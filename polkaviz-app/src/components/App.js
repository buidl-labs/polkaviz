import React from "react";
import Relay from "./Relay";
import { Stage, Layer } from "react-konva";
import Validator from "./Validator";
import BlockAnimation from "./BlockAnimation";
import { WsProvider, ApiPromise } from "@polkadot/api";
import Bottombar from "./Bottombar";
import { withRouter } from 'react-router-dom';
import Parachains from './Parachains'

class App extends React.Component {
  constructor() {
    super();
    this.latestBlockAuthor = undefined;
    this.state = {
      validators: [],
      lastAuthor: "",
      start: null,
    };
    this.ismounted = true
  }
  componentDidMount() {
    this.createApi();
  }
  async createApi() {
    const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
    const api = await ApiPromise.create(provider);
    await api.derive.chain.subscribeNewHead(block => {
      // console.log(`block #${block.author}`);
      const lastAuthor = block.author.toString();
      if(this.ismounted){
      this.setState({ lastAuthor });
      }
      const start = new Date();
      if(this.ismounted){
      this.setState({ start: start });
      }
    });
    await api.query.session.validators(validators => {
      // console.log(`validators ${validators}`);
      const sessionValidators = validators.map(x => x.toString());
      if(this.ismounted){
      this.setState({ validators: sessionValidators });
      }
    });
  
  }
  componentWillUnmount(){
    this.ismounted = false;
  }

  render() {
    console.log(this.props.history)
    const arr = this.state.validators;
    const arr1 = [1,2,3,4,5,6,7,8]
    return (
      <div className="container">
        {/* {console.log(this.state.validators.indexOf(this.state.lastAuthor))}  */}

        {/* {console.log(arr)}  */}
        <div className="heading">
          <h2>Polkadot Network</h2>
        </div>
        <div className="relay-circle">
          <Stage width={window.innerWidth} height={window.innerHeight}>
            {/* {console.log(window.innerWidth)} */}
            <Layer>
              {/*in  (90 - 1) "-1"  is to handle the deviation of hexagon wrt to validators */}
              {arr.map((person, index) => (
                <Validator
                  key={index}
                  validatorAddress={this.state.validators[index]}
                  angle={180 - (index * 360) / arr.length}
                  history={this.props.history}
                  x={
                    window.innerWidth +
                    360 *
                      Math.cos((90 - 1 - (index * 360) / arr.length) * 0.0174533)
                  }
                  y={
                    window.innerHeight +
                    360 *
                      Math.sin((90 - 1 - (index * 360) / arr.length) * 0.0174533)
                  }
                />
              ))}
              <BlockAnimation
                key={this.state.validators.indexOf(this.state.lastAuthor)}
                angle={
                  180 -
                  (this.state.validators.indexOf(this.state.lastAuthor) * 360) /
                    arr.length
                }
                x1={
                  window.innerWidth / 2 +
                  100 *
                    Math.cos(
                      (90 -
                        (this.state.validators.indexOf(this.state.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
                y1={
                  window.innerHeight / 2 +
                  100 *
                    Math.sin(
                      (90 -
                        (this.state.validators.indexOf(this.state.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
                x2={
                  window.innerWidth / 2 +
                  160 *
                    Math.cos(
                      (90 -
                        (this.state.validators.indexOf(this.state.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
                y2={
                  window.innerHeight / 2 +
                  160 *
                    Math.sin(
                      (90 -
                        (this.state.validators.indexOf(this.state.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
              />
              <Relay x={window.innerWidth} y={window.innerHeight} />
              <Parachains x={window.innerWidth} y={window.innerHeight} parachains={arr1}/>
            </Layer>
          </Stage>
        </div>
        <div className="bottombar">
          <Bottombar start={this.state.start} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
